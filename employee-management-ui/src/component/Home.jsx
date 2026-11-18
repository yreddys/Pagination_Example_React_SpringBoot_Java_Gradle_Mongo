import { Link } from "react-router-dom";

function Home() {
    return (
        <div className="home-container">
            <h1>Employee Management System</h1>

            <p>
                Manage employees using React, Spring Boot,
                Java 17 and MongoDB.
            </p>

            <div className="home-actions">
                <Link to="/employees" className="btn">
                    View Employees
                </Link>

                <Link to="/add-employee" className="btn">
                    Add Employee
                </Link>
            </div>
        </div>
    );
}

export default Home;