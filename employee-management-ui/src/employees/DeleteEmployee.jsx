import { useNavigate, useParams } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function DeleteEmployee() {

    const { id } = useParams();

    const navigate = useNavigate();

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this employee?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await EmployeeService.deleteEmployee(id);

            alert("Employee deleted successfully!");

            navigate("/employees");

        } catch (error) {

            console.error(error);

            alert("Unable to delete employee");
        }
    };

    return (
        <div className="form-container">

            <h2>Delete Employee</h2>

            <p>Do you want to delete employee ID: {id}?</p>

            <button className="btn danger" onClick={handleDelete}>
                Confirm Delete
            </button>

            <button
                className="btn"
                onClick={() => navigate("/employees")}
            >
                Cancel
            </button>

        </div>
    );
}

export default DeleteEmployee;