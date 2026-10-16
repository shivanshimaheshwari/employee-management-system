package com.employeemanagement.demo.controller;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employeemanagement.demo.dto.CreateEmployeeRequest;
import com.employeemanagement.demo.dto.EmployeeResponse;
import com.employeemanagement.demo.service.EmployeeService;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;
    public EmployeeController(EmployeeService employeeService){
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<EmployeeResponse> createEmployee(@Valid @RequestBody CreateEmployeeRequest request){

        EmployeeResponse res = employeeService.createEmployee(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable @Positive Long id){
        EmployeeResponse response = employeeService.findById(id);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/findAll")
    public ResponseEntity<List<EmployeeResponse>> findAllEmployees(){
        List<EmployeeResponse> response = employeeService.findAllEmployees();
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    @GetMapping
    public ResponseEntity<Page<EmployeeResponse>> findAllEmployeesByPagination(@RequestParam @PositiveOrZero int page, @RequestParam @Positive int size, @RequestParam(defaultValue = "salary") String sortBy, @RequestParam(defaultValue = "ascending") String direction){
        Page<EmployeeResponse> response = employeeService.findEmployeesByPagination(page, size, sortBy, direction);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateDetails/{id}")
    public ResponseEntity<String> updateDetails(@PathVariable Long id, @Valid @RequestBody CreateEmployeeRequest request){
          employeeService.updateEmployeeDetails(id,request);
        return ResponseEntity.status(HttpStatus.OK).body("Details updated successfully");
    }

    @DeleteMapping("/deleteEmployee/{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable Long id){
        employeeService.deleteEmployee(id);
        return ResponseEntity.status(HttpStatus.OK).body("Entry Deleted Successfully");
    }

    
}
