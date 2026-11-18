package com.paginationDay1.paginationDay1.service;

import com.paginationDay1.paginationDay1.dto.EmployeeRequestDTO;
import com.paginationDay1.paginationDay1.dto.EmployeeResponseDTO;
import com.paginationDay1.paginationDay1.entity.Employee;
import com.paginationDay1.paginationDay1.exception.InvalidRequestException;
import com.paginationDay1.paginationDay1.exception.ResourceNotFoundException;
import com.paginationDay1.paginationDay1.repo.EmployeeRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    // Only these fields are allowed for sorting
    private static final Set<String> ALLOWED_SORT_FIELDS =
            Set.of("name", "address", "department", "hobbies");

    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    // Convert request DTO into MongoDB entity
    private Employee toEntity(EmployeeRequestDTO dto) {

        Employee employee = new Employee();

        employee.setName(dto.getName());
        employee.setAddress(dto.getAddress());
        employee.setDepartment(dto.getDepartment());
        employee.setHobbies(dto.getHobbies());

        return employee;
    }

    // Convert MongoDB entity into response DTO
    private EmployeeResponseDTO toResponse(Employee employee) {

        return new EmployeeResponseDTO(
                employee.getId(),
                employee.getName(),
                employee.getAddress(),
                employee.getDepartment(),
                employee.getHobbies()
        );
    }

    @Override
    public EmployeeResponseDTO saveEmployee(EmployeeRequestDTO requestDTO) {

        Employee employee = toEntity(requestDTO);

        Employee savedEmployee = employeeRepository.save(employee);

        return toResponse(savedEmployee);
    }

    @Override
    public Page<EmployeeResponseDTO> getAllEmployees(
            int page,
            int size,
            String sortBy,
            String direction) {

        if (page < 0) {
            throw new InvalidRequestException(
                    "Page number cannot be negative");
        }

        if (size < 1 || size > 100) {
            throw new InvalidRequestException(
                    "Page size must be between 1 and 100");
        }

        if (!ALLOWED_SORT_FIELDS.contains(sortBy)) {
            throw new InvalidRequestException(
                    "Invalid sort field: " + sortBy);
        }

        Sort.Direction sortDirection;

        try {
            sortDirection = Sort.Direction.fromString(direction);
        } catch (IllegalArgumentException exception) {
            throw new InvalidRequestException(
                    "Direction must be asc or desc");
        }

        // Create pageable object with sorting
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortDirection, sortBy)
        );

        // Fetch paginated employees from MongoDB
        Page<Employee> employeePage =
                employeeRepository.findAll(pageable);

        // Convert Entity Page into DTO Page
        return employeePage.map(this::toResponse);
    }

    @Override
    public EmployeeResponseDTO getEmployeeById(String id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        return toResponse(employee);
    }

    @Override
    public EmployeeResponseDTO updateEmployee(
            String id,
            EmployeeRequestDTO requestDTO) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        employee.setName(requestDTO.getName());
        employee.setAddress(requestDTO.getAddress());
        employee.setDepartment(requestDTO.getDepartment());
        employee.setHobbies(requestDTO.getHobbies());

        Employee updatedEmployee = employeeRepository.save(employee);

        return toResponse(updatedEmployee);
    }

    @Override
    public void deleteEmployee(String id) {

        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Employee not found with id: " + id));

        employeeRepository.delete(employee);
    }
}