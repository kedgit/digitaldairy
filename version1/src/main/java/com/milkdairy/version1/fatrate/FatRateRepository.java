package com.milkdairy.version1.fatrate;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

//import com.milkdairy.version1.fatrate.FatRate;

public interface FatRateRepository extends JpaRepository<FatRate,Long> {

        // Find current active rate for a particular fat
        // find by fat 
        Optional<FatRate> findByFatAndIsActive(
                BigDecimal fat,
                Boolean isActive
        );

        // Get all currently active rates
        List<FatRate> findByIsActiveTrue();

    // Find applicable rate for a milk entry date
        Optional<FatRate> findFirstByFatAndEffectiveFromLessThanEqualAndIsActiveTrueOrderByEffectiveFromDesc(
        BigDecimal fat,
        LocalDateTime date
);
}
