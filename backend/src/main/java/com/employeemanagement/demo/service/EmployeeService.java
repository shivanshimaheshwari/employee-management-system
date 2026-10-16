package com.employeemanagement.demo.service;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.employeemanagement.demo.dto.CreateEmployeeRequest;
import com.employeemanagement.demo.dto.EmployeeResponse;
import com.employeemanagement.demo.entity.Employee;
import com.employeemanagement.demo.exception.DuplicateEmailException;
import com.employeemanagement.demo.exception.UserNotFoundException;
import com.employeemanagement.demo.repository.EmployeeRepository;

@Service
public class EmployeeService {
    
    
    private final EmployeeRepository employeeRepository;
    Sort sort;

    public EmployeeService(EmployeeRepository employeeRepository){
        this.employeeRepository = employeeRepository;
    }

    public EmployeeResponse createEmployee(CreateEmployeeRequest request){
        Employee emp = new Employee();
        emp.setName(request.name());
        emp.setEmail(request.email());
        emp.setDepartment(request.department());
        emp.setJoiningDate(request.joiningDate());
        emp.setSalary(request.salary());
        boolean res = employeeRepository.existsByEmail(request.email());

        if(res){
           throw new DuplicateEmailException("Email already exists");
        }
      
          Employee response = employeeRepository.save(emp);       
         return new EmployeeResponse(response.getId(),response.getName(),response.getEmail(),response.getDepartment(),response.getJoiningDate(),response.getSalary());

       

    }

    public EmployeeResponse findById(Long id){
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException ("Employee Not Found"));
        return new EmployeeResponse(
                employee.getId(),
                employee.getName(),
                employee.getEmail(),
                employee.getDepartment(),
                employee.getJoiningDate(),
                employee.getSalary());
    }

    public List<EmployeeResponse> findAllEmployees(){
       List<Employee> res =  employeeRepository.findAll();

       List<EmployeeResponse> result = new ArrayList<>();
       for(Employee e:res){
        result.add(new EmployeeResponse(e.getId(),e.getName(),e.getEmail(),e.getDepartment(),e.getJoiningDate(),e.getSalary()));
       }

       return result;
    }

    public boolean isEmailExists(String email){
        return employeeRepository.existsByEmail(email);
    }

    @Transactional
    public void updateEmployeeDetails(Long id, CreateEmployeeRequest request){
    Employee res = employeeRepository.findById(id).orElseThrow(()-> new UserNotFoundException("User doesn't exist."));
    String currEmail = res.getEmail();
    
    if (!currEmail.equals(request.email())){
       if(isEmailExists(request.email())){
         throw new DuplicateEmailException("Email already exists");
       }
    }
    res.setName(request.name());
    res.setEmail(request.email());
    res.setDepartment(request.department());
    res.setJoiningDate(request.joiningDate());
    res.setSalary(request.salary());

    employeeRepository.save(res);

    }

    @Transactional
    public void deleteEmployee(Long id){
        employeeRepository.findById(id).orElseThrow(()-> new UserNotFoundException("User Doesn't Exist"));
        employeeRepository.deleteById(id);
    }

    


public Page<EmployeeResponse> findEmployeesByPagination(int page, int size,String sortBy, String direction){
    if(direction.equals("descending")){
       sort=Sort.by(sortBy).descending();
    }
    else{
    sort=Sort.by(sortBy).ascending();
    }
      Pageable pageable = PageRequest.of(page,size,sort);
   
return employeeRepository.findAll(pageable)
            .map(emp -> new EmployeeResponse(
                    emp.getId(),
                    emp.getName(),
                    emp.getEmail(),
                    emp.getDepartment(),
                    emp.getJoiningDate(),
                    emp.getSalary()
            ));

    }
}