package com.milkdairy.version1.milkentry;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

public interface MilkEntryRepository extends JpaRepository<MilkEntry,Long>{
    Page<MilkEntry> findByFarmerId(Long farmerId,Pageable pageable);

    List<MilkEntry> findByEntryDateTimeGreaterThanEqualAndEntryDateTimeLessThan(LocalDateTime startDateTime, LocalDateTime endDateTime);

    List<MilkEntry> findByEntryDateTime(LocalDateTime entryDateTime);
    List<MilkEntry> findByFarmerIdAndEntryDateTime(Long farmerId,LocalDateTime date);
    List<MilkEntry> findByFarmerIdAndEntryDateTimeGreaterThanEqualAndEntryDateTimeLessThan(Long farmerId, LocalDateTime startDateTime,LocalDateTime endDateTime);
    
}
