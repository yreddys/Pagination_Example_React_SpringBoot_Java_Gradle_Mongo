import { useNavigate } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";
import EmployeeForm from "./EmployeeForm";

function AddEmployee() {

    const navigate = useNavigate();

    const handleAddEmployee = async (employee) => {

        try {

            await EmployeeService.saveEmployee(employee);

            alert("Employee added successfully!");

            navigate("/employees");

        } catch (error) {

            console.error(error);

            alert(
                error.response?.data?.message ||
                "Unable to add employee"
            );
        }
    };

    return (
        <div className="form-container">

            <h2>Add Employee</h2>

            <EmployeeForm
                onSubmit={handleAddEmployee}
                buttonText="Save Employee"
            />

        </div>
    );
}

export default AddEmployee;