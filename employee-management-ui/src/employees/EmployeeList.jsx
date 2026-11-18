import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EmployeeService from "../services/EmployeeService";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);

    const [sortBy, setSortBy] = useState("name");
    const [direction, setDirection] = useState("asc");

    const [totalPages, setTotalPages] = useState(0);
    const [totalElements, setTotalElements] = useState(0);

    const [loading, setLoading] = useState(false);

    // Fetch data whenever pagination or sorting changes
    useEffect(() => {
        loadEmployees();
    }, [page, size, sortBy, direction]);

    const loadEmployees = async () => {

        try {
            setLoading(true);

            const response =
                await EmployeeService.getEmployees(
                    page,
                    size,
                    sortBy,
                    direction
                );

            // Spring Data Page response
            setEmployees(response.data.content);
            setTotalPages(response.data.totalPages);
            setTotalElements(response.data.totalElements);

        } catch (error) {
            console.error("Error loading employees", error);
            alert("Unable to load employees");
        } finally {
            setLoading(false);
        }
    };

    const handleSortChange = (event) => {
        setSortBy(event.target.value);
        setPage(0);
    };

    const handleDirectionChange = (event) => {
        setDirection(event.target.value);
        setPage(0);
    };

    const handleSizeChange = (event) => {
        setSize(Number(event.target.value));
        setPage(0);
    };

    return (
        <div className="container">

            <div className="page-heading">
                <h2>Employee List</h2>

                <Link to="/add-employee" className="btn">
                    Add Employee
                </Link>
            </div>

            {/* Sorting and pagination controls */}
            <div className="toolbar">

                <label>
                    Sort By

                    <select value={sortBy} onChange={handleSortChange}>
                        <option value="name">Name</option>
                        <option value="address">Address</option>
                        <option value="department">Department</option>
                        <option value="hobbies">Hobbies</option>
                    </select>
                </label>

                <label>
                    Direction

                    <select
                        value={direction}
                        onChange={handleDirectionChange}
                    >
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </label>

                <label>
                    Records Per Page

                    <select value={size} onChange={handleSizeChange}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </label>

            </div>

            {loading && <p>Loading employees...</p>}

            {/* Employee table */}
            <table>

                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Department</th>
                        <th>Hobbies</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {!loading && employees.map(employee => (

                        <tr key={employee.id}>

                            <td>{employee.name}</td>

                            <td>{employee.address}</td>

                            <td>{employee.department}</td>

                            <td>
                                {employee.hobbies?.join(", ")}
                            </td>

                            <td className="actions">

                                <Link to={`/employees/${employee.id}`}>
                                    View
                                </Link>

                                <Link to={`/edit-employee/${employee.id}`}>
                                    Edit
                                </Link>

                                <Link to={`/delete-employee/${employee.id}`}>
                                    Delete
                                </Link>

                            </td>

                        </tr>
                    ))}

                    {!loading && employees.length === 0 && (
                        <tr>
                            <td colSpan="5">No employees found</td>
                        </tr>
                    )}

                </tbody>

            </table>

            {/* Pagination controls */}
            <div className="pagination">

                <button
                    disabled={page === 0 || loading}
                    onClick={() => setPage(page - 1)}
                >
                    Previous
                </button>

                <span>
                    Page {totalPages === 0 ? 0 : page + 1}
                    {" of "}
                    {totalPages}
                </span>

                <button
                    disabled={page >= totalPages - 1 || loading}
                    onClick={() => setPage(page + 1)}
                >
                    Next
                </button>

            </div>

            <p>Total Employees: {totalElements}</p>

        </div>
    );
}

export default EmployeeList;