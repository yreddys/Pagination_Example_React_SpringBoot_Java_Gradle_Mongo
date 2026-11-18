import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import EmployeeService from "../services/EmployeeService";

function ViewEmployee() {

    const { id } = useParams();

    const [employee, setEmployee] = useState(null);

    useEffect(() => {

        EmployeeService.getEmployeeById(id)
            .then(response => setEmployee(response.data))
            .catch(error => console.error(error));

    }, [id]);

    if (!employee) {
        return <p>Loading employee...</p>;
    }

    return (
        <div className="details-container">

            <h2>Employee Details</h2>

            <p><strong>Name:</strong> {employee.name}</p>

            <p><strong>Address:</strong> {employee.address}</p>

            <p><strong>Department:</strong> {employee.department}</p>

            <p>
                <strong>Hobbies:</strong>
                {employee.hobbies?.join(", ")}
            </p>

            <Link to="/employees" className="btn">
                Back
            </Link>

        </div>
    );
}

export default ViewEmployee;