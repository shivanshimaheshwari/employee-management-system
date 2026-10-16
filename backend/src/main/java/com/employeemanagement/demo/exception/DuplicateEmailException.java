package com.employeemanagement.demo.exception;

public class DuplicateEmailException extends RuntimeException {
    
   public DuplicateEmailException(String message){
        super(message);
    }
}
