package com.milkdairy.version1.fatrate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;

import org.springframework.stereotype.Service;

import com.milkdairy.version1.exception.FatRateNotFoundException;

//import com.milkdairy.version1.fatrate.FatRateRepository;
//import com.milkdairy.version1.fatrate.FatRate;

@Service
public class FatRateService {

    private final FatRateRepository fatRateRepository;

    public FatRateService(FatRateRepository fatRateRepository) {
        this.fatRateRepository = fatRateRepository;
    }

    public List<FatRate> getActiveRates() {
        return fatRateRepository.findByIsActiveTrue();
    }

    @Cacheable(value = "fatRates", key = "#fat + '_' + #date")
    public FatRate getApplicableRate(
            BigDecimal fat,
            LocalDateTime date) {

        System.out.println("DB Called !");
        return fatRateRepository
                .findFirstByFatAndEffectiveFromLessThanEqualAndIsActiveTrueOrderByEffectiveFromDesc(
                        fat, date)
                .orElseThrow(() ->
                        new FatRateNotFoundException(
                                "No applicable fat rate found"));
    }

    // create new fat rate
    @CacheEvict(value="FatRates", allEntries = true)
    public List<FatRate> createNewRate(List<FatRate> fatRates) {

        for (FatRate fatRate : fatRates) {
            Optional<FatRate> oldRate =
                    fatRateRepository.findByFatAndIsActive(
                            fatRate.getFat(),true
                    );

         if (oldRate.isPresent()) {
            FatRate existingRate = oldRate.get();
            existingRate.setIsActive(false);

            fatRateRepository.save(existingRate);
        }

        }
        return fatRateRepository.saveAll(fatRates);
    }
}