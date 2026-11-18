package com.paginationDay1.paginationDay1.dto;
import java.util.List;

public class EmployeeResponseDTO {

    private String id;
    private String name;
    private String address;
    private String department;
    private List<String> hobbies;

    public EmployeeResponseDTO() {
    }

    public EmployeeResponseDTO(String id, String name,
                               String address, String department,
                               List<String> hobbies) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.department = department;
        this.hobbies = hobbies;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getDepartment() {
        return department;
    }

    public List<String> getHobbies() {
        return hobbies;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }
}