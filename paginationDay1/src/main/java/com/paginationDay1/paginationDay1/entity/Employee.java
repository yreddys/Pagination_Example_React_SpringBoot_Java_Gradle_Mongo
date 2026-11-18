package com.paginationDay1.paginationDay1.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "employees")
public class Employee {

    @Id
    private String id;

    private String name;

    private String address;

    private String department;

    private List<String> hobbies;

    public Employee() {
    }

    public Employee(String id, String name, String address,
                    String department, List<String> hobbies) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.department = department;
        this.hobbies = hobbies;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public List<String> getHobbies() {
        return hobbies;
    }

    public void setHobbies(List<String> hobbies) {
        this.hobbies = hobbies;
    }
}