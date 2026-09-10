package com.milkdairy.version1.milkentry;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.LocalDate;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.milkdairy.version1.exception.FarmerNotFoundException;
import com.milkdairy.version1.exception.FatRateNotFoundException;
import com.milkdairy.version1.farmer.FarmerRepository;
import com.milkdairy.version1.fatrate.FatRateRepository;
import com.milkdairy.version1.payment.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.milkdairy.version1.farmer.Farmers;
import com.milkdairy.version1.fatrate.FatRate;
import java.util.stream.Collectors;
//import java.util.LocalDate;

import java.util.List;
@Service
public class MilkEntryService {

    private final MilkEntryRepository milkEntryRepository;
    private final FarmerRepository farmerRepository;
    private final FatRateRepository fatRetRepository;
    private final PaymentAccountService paymentAccountService;

    public MilkEntryService(
            MilkEntryRepository milkEntryRepository,
            FarmerRepository farmerRepository,
            FatRateRepository fatRetRepository,
            PaymentAccountService paymentAccountService) {

        this.milkEntryRepository = milkEntryRepository;
        this.farmerRepository = farmerRepository;
        this.fatRetRepository = fatRetRepository;
        this.paymentAccountService=paymentAccountService;
    }

    // add milkentry
    // @Transactional --> for complete both add entry and paymentaaccount insert else rollback
    @Transactional
    public MilkEntry addMilkEntry(MilkEntryRequest request) {

        if (request.getFarmerId() == null) {
            throw new FarmerNotFoundException("Farmer ID is required");
}
        Farmers farmer = farmerRepository
                .findByFarmerId(request.getFarmerId())
                .orElseThrow(() ->
                        new FarmerNotFoundException("Farmer Not Found..."));

        if (!farmer.isActive()) {
            farmer.setActive(true);
            farmerRepository.save(farmer);
        }   
        FatRate fatRate = fatRetRepository
                .findFirstByFatAndEffectiveFromLessThanEqualAndIsActiveTrueOrderByEffectiveFromDesc(request.getFat(), LocalDateTime.now())
                .orElseThrow(() ->
                        new FatRateNotFoundException("Fat Rate Not Found..."));

        BigDecimal ratePerLiter = fatRate.getRatePerLiter();
        BigDecimal quantity=request.getQuantityLiter();
        BigDecimal amount = quantity.multiply(ratePerLiter);

        MilkEntry milkEntry = new MilkEntry();

        milkEntry.setFarmerId(farmer.getFarmerId());
        milkEntry.setSession(request.getSession());
        milkEntry.setFat(request.getFat());
        milkEntry.setQuantityLiter(quantity);
        milkEntry.setRatePerLiter(ratePerLiter);
        milkEntry.setAmount(amount);

        LocalDateTime entryDateTime = LocalDateTime.now().withNano(0);
        milkEntry.setEntryDateTime(entryDateTime);
       // for first time farmer
        if (!paymentAccountService.existsByFarmerId(farmer.getFarmerId())) {

            paymentAccountService.createAccount( farmer.getFarmerId(), entryDateTime);
        }

        return milkEntryRepository.save(milkEntry);
    }

    // get all entries
    public List<MilkEntryResponse> getAllMilkEntries() {

        return milkEntryRepository.findAll().stream().map(milkEntry -> {

            MilkEntryResponse response = new MilkEntryResponse();
            response.setDate(milkEntry.getEntryDateTime());
            response.setSession(milkEntry.getSession());
            response.setQuantity(milkEntry.getQuantityLiter());
            response.setFatContent(milkEntry.getFat());
            response.setRate(milkEntry.getRatePerLiter());
            response.setAmount(milkEntry.getAmount());
            return response;
        }).collect(Collectors.toList());
    }

    // get todays milk entries
    public List<MilkEntryResponse> getEntriesByDate(LocalDate date) {

    LocalDateTime start = date.atStartOfDay();
    LocalDateTime end = date.plusDays(1).atStartOfDay();

    return milkEntryRepository
            .findByEntryDateTimeGreaterThanEqualAndEntryDateTimeLessThan(start, end)
            .stream()
            .map(milkEntry -> {
            MilkEntryResponse response = new MilkEntryResponse();
            response.setDate(milkEntry.getEntryDateTime());
            response.setSession(milkEntry.getSession());
            response.setQuantity(milkEntry.getQuantityLiter());
            response.setFatContent(milkEntry.getFat());
            response.setRate(milkEntry.getRatePerLiter());
            response.setAmount(milkEntry.getAmount());
            return response;
        }).collect(Collectors.toList());
}


    // get milk entries by farmer id
    public Page<MilkEntryResponse> getMilkEntriesByFarmerId(Long farmerId,Pageable pageable) {
        farmerRepository.findByFarmerId(farmerId).orElseThrow(() -> new FarmerNotFoundException("Farmer Not Found..."));
        return milkEntryRepository.findByFarmerId(farmerId,pageable).map(milkEntry -> {
            MilkEntryResponse response = new MilkEntryResponse();
            response.setDate(milkEntry.getEntryDateTime());
            response.setSession(milkEntry.getSession());
            response.setQuantity(milkEntry.getQuantityLiter());
            response.setFatContent(milkEntry.getFat());
            response.setRate(milkEntry.getRatePerLiter());
            response.setAmount(milkEntry.getAmount());
            return response;
        });
    }
    // fetch specific date 
    public List<MilkEntry> getMilkEntriesByDate(LocalDateTime date) {

        return milkEntryRepository.findByEntryDateTime(date);
    }

    // fetch by farmerid and date
     public List<MilkEntryResponse> getMilkEntriesByFarmerIdAndEntryDate(Long farmerId,LocalDateTime date){
        return milkEntryRepository.findByFarmerIdAndEntryDateTime(farmerId,date).stream().map(milkEntry -> {
            MilkEntryResponse response = new MilkEntryResponse();
            response.setDate(milkEntry.getEntryDateTime());
            response.setSession(milkEntry.getSession());
            response.setQuantity(milkEntry.getQuantityLiter());
            response.setFatContent(milkEntry.getFat());
            response.setRate(milkEntry.getRatePerLiter());
            response.setAmount(milkEntry.getAmount());
            return response;
        }).collect(Collectors.toList()) ;
     }

     // date range entries

     public List<MilkEntryResponse> getMilkEntriesByFarmerIdAndDateRange(
            Long farmerId,
            LocalDate startDate,
            LocalDate endDate) {

                LocalDateTime startDateTime = startDate.atStartOfDay();
                LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);
                System.out.println("MAPPING TO RESPONSE DTO");                                  
        return milkEntryRepository
                .findByFarmerIdAndEntryDateTimeGreaterThanEqualAndEntryDateTimeLessThan(
                        farmerId,
                        startDateTime,
                        endDateTime
                ).stream().map(milkEntry -> {
                    MilkEntryResponse response = new MilkEntryResponse();
                    response.setDate(milkEntry.getEntryDateTime());
                    response.setSession(milkEntry.getSession());
                    response.setQuantity(milkEntry.getQuantityLiter());
                    response.setFatContent(milkEntry.getFat());
                    response.setRate(milkEntry.getRatePerLiter());
                    response.setAmount(milkEntry.getAmount());
                    return response;
                }).collect(Collectors.toList());
    }

}