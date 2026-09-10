package com.milkdairy.version1.farmer;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;


public interface FarmerRepository extends JpaRepository<Farmers,Long> {
    List<Farmers> findByIsActiveTrue();
    
    Optional<Farmers> findByFarmerCode(String farmerCode);

    Optional<Farmers> findByFarmerId(Long farmerId);

    boolean existsByUserId(Long userId);

    Optional<Farmers> findByUserId(Long userId);

    //User findByFarmerId(long farmerId);

@Modifying
@Transactional
@Query(value = """
    UPDATE farmer f
    SET is_active = false
    WHERE is_active = true
    AND NOT EXISTS (
        SELECT 1
        FROM milk_entry m
        WHERE m.farmer_id = f.farmer_id
        AND m.entry_date >= :cutoffDate
    )
    """, nativeQuery = true)
int deactivateFarmersWithoutMilk(
        @Param("cutoffDate") LocalDate cutoffDate);
}
