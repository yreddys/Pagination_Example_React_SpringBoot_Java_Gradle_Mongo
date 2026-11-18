import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar">
            <h2>Employee Management</h2>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/employees">Employees</Link>
                <Link to="/add-employee">Add Employee</Link>
            </div>
        </nav>
    );
}

export default Navbar;