package com.paginationDay1.paginationDay1.repo;


import com.paginationDay1.paginationDay1.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmployeeRepository
        extends MongoRepository<Employee, String> {

}