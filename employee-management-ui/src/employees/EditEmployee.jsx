import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EmployeeService from "../services/EmployeeService";
import EmployeeForm from "./EmployeeForm";

function EditEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        loadEmployee();

    }, [id]);

    const loadEmployee = async () => {

        try {

            const response =
                await EmployeeService.getEmployeeById(id);

            setEmployee(response.data);

        } catch (error) {

            console.error(error);

            alert("Employee not found");

            navigate("/employees");
        }
    };

    const handleUpdate = async (updatedEmployee) => {

        try {

            await EmployeeService.updateEmployee(
                id,
                updatedEmployee
            );

            alert("Employee updated successfully!");

            navigate("/employees");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to update employee"
            );
        }
    };

    if (!employee) {
        return <p>Loading employee...</p>;
    }

    return (
        <div className="form-container">

            <h2>Edit Employee</h2>

            <EmployeeForm
                initialData={employee}
                onSubmit={handleUpdate}
                buttonText="Update Employee"
            />

        </div>
    );
}

export default EditEmployee;