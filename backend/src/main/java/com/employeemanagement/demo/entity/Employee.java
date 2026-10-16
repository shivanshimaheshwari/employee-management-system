package com.employeemanagement.demo.entity;

import java.math.BigDecimal;
import java.time.LocalDate;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(name = "name", nullable = false)
    private String name;

    @NotBlank
    @Column(name = "department", nullable = false)
    private String department;

    @NotBlank
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull(message = "joining data can't be blank")
    @Column(name = "joining_date", nullable = false)
    private LocalDate joiningDate;

    @NotNull(message = "salary can't be null")
    @DecimalMin(value = "0.00", message = "salary can't be negative")
    @Column(name = "salary", precision = 10, scale = 2)
    private BigDecimal salary;

    public Employee() {

    }

    public Long getId() {
        return id;
    }


    public String getName(){
        return name;
    }
    public void setName(String name){
        this.name = name;
    }

    public String getDepartment(){
        return department;
    }

    public void setDepartment(String department){
        this.department = department;
    }
    public String getEmail(){
        return email;
    }
    public void setEmail(String email){
        this.email = email;
    }

    public LocalDate getJoiningDate(){
        return joiningDate;
    }

    public void setJoiningDate(LocalDate date){
        this.joiningDate = date;
    }

    public BigDecimal getSalary(){
        return salary;
    }
    public void setSalary(BigDecimal salary){
        this.salary=salary;
    }

}
