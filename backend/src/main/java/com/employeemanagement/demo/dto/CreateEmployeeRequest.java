package com.employeemanagement.demo.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CreateEmployeeRequest(
    @NotBlank(message = "Name is required")
    String name,

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    String email,

    @NotBlank(message = "Department is required")
    String department,

    @NotNull(message = "Joining date is required")
    LocalDate joiningDate,

    @NotNull(message = "Salary is required")
    @DecimalMin(value = "0.00", message = "Salary cannot be negative")
    BigDecimal salary
) {}