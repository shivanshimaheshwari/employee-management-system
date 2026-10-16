package com.employeemanagement.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record EmployeeResponse(
    Long id,
    String name,
    String email,
    String department,
    LocalDate joiningDate,
    BigDecimal salary
) {}