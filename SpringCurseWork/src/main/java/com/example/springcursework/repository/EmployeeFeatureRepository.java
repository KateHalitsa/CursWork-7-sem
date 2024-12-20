package com.example.springcursework.repository;

import com.example.springcursework.model.EmployeeFeature;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeFeatureRepository extends JpaRepository<EmployeeFeature, Integer> {
    /*
    @Query(value = "SELECT wf.* FROM  workplace_feature wf WHERE  wf.workplace_id=?1 AND wf.featureId = ?2", nativeQuery = true)
  WorkplaceFeature  findByWorkplaceAndFeatureId(int workplaceId, int featureId);
     */
}
