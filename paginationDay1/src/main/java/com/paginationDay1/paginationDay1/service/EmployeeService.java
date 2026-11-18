package com.paginationDay1.paginationDay1.service;


import com.paginationDay1.paginationDay1.dto.EmployeeRequestDTO;
import com.paginationDay1.paginationDay1.dto.EmployeeResponseDTO;
import org.springframework.data.domain.Page;

public interface EmployeeService {

    EmployeeResponseDTO saveEmployee(EmployeeRequestDTO requestDTO);

    Page<EmployeeResponseDTO> getAllEmployees(
            int page,
            int size,
            String sortBy,
            String direction
    );

    EmployeeResponseDTO getEmployeeById(String id);

    EmployeeResponseDTO updateEmployee(
            String id,
            EmployeeRequestDTO requestDTO
    );

    void deleteEmployee(String id);
}