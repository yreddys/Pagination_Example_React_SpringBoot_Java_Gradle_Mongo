package com.paginationDay1.paginationDay1.controller;


import com.paginationDay1.paginationDay1.dto.EmployeeRequestDTO;
import com.paginationDay1.paginationDay1.dto.EmployeeResponseDTO;
import com.paginationDay1.paginationDay1.service.EmployeeService;
import jakarta.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    // CREATE employee
    @PostMapping
    public ResponseEntity<EmployeeResponseDTO> saveEmployee(
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        EmployeeResponseDTO response =
                employeeService.saveEmployee(requestDTO);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    // GET all employees with pagination and sorting
    @GetMapping
    public ResponseEntity<Page<EmployeeResponseDTO>> getAllEmployees(

            @RequestParam(defaultValue = "0") int page,

            @RequestParam(defaultValue = "5") int size,

            @RequestParam(defaultValue = "name") String sortBy,

            @RequestParam(defaultValue = "asc") String direction) {

        Page<EmployeeResponseDTO> employees =
                employeeService.getAllEmployees(
                        page, size, sortBy, direction);

        return ResponseEntity.ok(employees);
    }

    // GET employee by ID
    @GetMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> getEmployeeById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                employeeService.getEmployeeById(id));
    }

    // UPDATE employee
    @PutMapping("/{id}")
    public ResponseEntity<EmployeeResponseDTO> updateEmployee(
            @PathVariable String id,
            @Valid @RequestBody EmployeeRequestDTO requestDTO) {

        return ResponseEntity.ok(
                employeeService.updateEmployee(id, requestDTO));
    }

    // DELETE employee
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable String id) {

        employeeService.deleteEmployee(id);

        return ResponseEntity.noContent().build();
    }
}