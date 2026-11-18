import { useState } from "react";

function EmployeeForm({ initialData, onSubmit, buttonText }) {

    const [employee, setEmployee] = useState({
        name: initialData?.name || "",
        address: initialData?.address || "",
        department: initialData?.department || "",
        hobbies: initialData?.hobbies?.join(", ") || ""
    });

    const handleChange = (event) => {

        const { name, value } = event.target;

        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleSubmit = (event) => {

        event.preventDefault();

        // Convert comma-separated hobbies into an array
        const employeeData = {
            ...employee,
            hobbies: employee.hobbies
                .split(",")
                .map(hobby => hobby.trim())
                .filter(hobby => hobby.length > 0)
        };

        onSubmit(employeeData);
    };

    return (
        <form onSubmit={handleSubmit} className="employee-form">

            <label>Name</label>
            <input
                type="text"
                name="name"
                value={employee.name}
                onChange={handleChange}
                placeholder="Enter employee name"
                required
            />

            <label>Address</label>
            <input
                type="text"
                name="address"
                value={employee.address}
                onChange={handleChange}
                placeholder="Enter address"
                required
            />

            <label>Department</label>
            <select
                name="department"
                value={employee.department}
                onChange={handleChange}
                required
            >
                <option value="">Select Department</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="Operations">Operations</option>
            </select>

            <label>Hobbies</label>
            <input
                type="text"
                name="hobbies"
                value={employee.hobbies}
                onChange={handleChange}
                placeholder="Reading, Cricket, Music"
                required
            />

            <button type="submit" className="btn">
                {buttonText}
            </button>

        </form>
    );
}

export default EmployeeForm;