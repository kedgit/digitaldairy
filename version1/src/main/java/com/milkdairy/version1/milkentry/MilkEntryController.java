package com.milkdairy.version1.milkentry;

import org.springframework.web.bind.annotation.RestController;

import com.milkdairy.version1.ApiResponse.CentralApiResponse;

import org.springframework.format.annotation.DateTimeFormat;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
@RestController
@RequestMapping("/api/v1/milkentries")
public class MilkEntryController{

    private final MilkEntryService milkEntryService;

    public MilkEntryController(MilkEntryService milkEntryService){
        this.milkEntryService=milkEntryService;
    }

    // all entries
    @GetMapping("/milkentries")
    public ResponseEntity<CentralApiResponse<List<MilkEntryResponse>>> getAllMilkEntries() {

        List<MilkEntryResponse> entries = milkEntryService.getAllMilkEntries();

        String message=entries.isEmpty() ? "No Milk Entries Found..." : "Milk Entry Fetched Successfuly...";

        CentralApiResponse<List<MilkEntryResponse>> response = new CentralApiResponse<>(200, message, entries);

        return ResponseEntity.ok(response);
    }

    // taoday all milk entries
    @GetMapping("/operator/today")
    public List<MilkEntryResponse> getTodayEntries(
        @RequestParam LocalDate date) {

    return milkEntryService.getEntriesByDate(date);
}

    // get entries by farmer
//    @GetMapping("/{farmerId}")
//     public Page<MilkEntryResponse> getMilkEntriesByFarmerId(
//         @PathVariable Long farmerId,
//         @RequestParam(defaultValue = "0") int page,
//         @RequestParam(defaultValue = "10") int size) {

//         Pageable pageable= PageRequest.of(page,size);
//     return milkEntryService.getMilkEntriesByFarmerId(farmerId,pageable);

    
// }

    @GetMapping("/{farmerId}")
public ResponseEntity<CentralApiResponse<Page<MilkEntryResponse>>> getMilkEntriesByFarmerId(
        @PathVariable Long farmerId,
        @RequestParam int pageNumber,
        @RequestParam(defaultValue = "10") int size) {

    Pageable pageable = PageRequest.of(pageNumber, size);

    Page<MilkEntryResponse> entries =
            milkEntryService.getMilkEntriesByFarmerId(farmerId, pageable);

    String message = entries.isEmpty()
            ? "No Milk Entries Found..."
            : "Milk Entries Fetched Successfully...";

    CentralApiResponse<Page<MilkEntryResponse>> response =
            new CentralApiResponse<>(
                    200,
                    message,
                    entries
            );

    return ResponseEntity.ok(response);
}

    // add milkentry
    @PostMapping("/operator/add")
    public ResponseEntity<MilkEntry> addMilkEntry(@RequestBody MilkEntryRequest request){
        MilkEntry entry=milkEntryService.addMilkEntry(request);
        return ResponseEntity.ok(entry);
    }

    // fetch for specific date

    @GetMapping("/milkentries/date/{date}")
    public ResponseEntity<List<MilkEntry>> getMilkEntriesByDate( @PathVariable LocalDateTime dateTime) {

        List<MilkEntry> entries = milkEntryService.getMilkEntriesByDate(dateTime);

        return ResponseEntity.ok(entries);
}

    // specific farmer for any date
    @GetMapping("/{farmerId}/milkentries/date/{date}")
    public ResponseEntity<List<MilkEntryResponse>> getMilkEntriesByFarmerIdAndDate(@PathVariable Long farmerId,@PathVariable LocalDateTime dateTime){
        List<MilkEntryResponse> entries = milkEntryService.getMilkEntriesByFarmerIdAndEntryDate(farmerId,dateTime);
        return ResponseEntity.ok(entries);
    }

    // date range entries
    @GetMapping("/{farmerId}/filter")
    public ResponseEntity<?> getMilkEntriesByDateRange(
            @PathVariable Long farmerId,
            @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate startDate,
            @RequestParam @DateTimeFormat(pattern = "dd-MM-yyyy") LocalDate endDate) {

                System.out.println("FILTER ENDPOINT CALLED");

                // invalid date range
                if (startDate.isAfter(endDate)) {
    
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                            .body("Invalid date range: startDate is after endDate");
                }
        List<MilkEntryResponse> entries =
                milkEntryService.getMilkEntriesByFarmerIdAndDateRange(
                        farmerId,
                        startDate,
                        endDate
                );

        if (entries.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No milk entries found for this farmer in the given date range")
                    ;
        }

        return ResponseEntity.ok(entries);
    }
}
