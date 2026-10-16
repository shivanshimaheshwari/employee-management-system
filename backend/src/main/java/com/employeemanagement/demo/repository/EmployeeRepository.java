package com.employeemanagement.demo.repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.employeemanagement.demo.dto.CreateEmployeeRequest;
import com.employeemanagement.demo.entity.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long>{
    
   boolean existsByEmail(String email);


}