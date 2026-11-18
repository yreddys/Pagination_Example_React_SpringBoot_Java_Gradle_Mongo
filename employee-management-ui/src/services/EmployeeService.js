import axios from "axios";

const API_URL = "http://localhost:8080/api/employees";

class EmployeeService {

    // Get employees with pagination and sorting
    getEmployees(page = 0, size = 5, sortBy = "name", direction = "asc") {
        return axios.get(API_URL, {
            params: {
                page,
                size,
                sortBy,
                direction
            }
        });
    }

    // Get employee by ID
    getEmployeeById(id) {
        return axios.get(`${API_URL}/${id}`);
    }

    // Save employee
    saveEmployee(employee) {
        return axios.post(API_URL, employee);
    }

    // Update employee
    updateEmployee(id, employee) {
        return axios.put(`${API_URL}/${id}`, employee);
    }

    // Delete employee
    deleteEmployee(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
}

export default new EmployeeService();