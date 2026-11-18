import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./component/Home";

import EmployeeList from "./employees/EmployeeList";
import AddEmployee from "./employees/AddEmployee";
import EditEmployee from "./employees/EditEmployee";
import ViewEmployee from "./employees/ViewEmployee";
import DeleteEmployee from "./employees/DeleteEmployee";

function App() {

    return (

        <BrowserRouter>

            <Navbar />

            <Routes>

                <Route path="/" element={<Home />} />

                <Route
                    path="/employees"
                    element={<EmployeeList />}
                />

                <Route
                    path="/add-employee"
                    element={<AddEmployee />}
                />

                <Route
                    path="/employees/:id"
                    element={<ViewEmployee />}
                />

                <Route
                    path="/edit-employee/:id"
                    element={<EditEmployee />}
                />

                <Route
                    path="/delete-employee/:id"
                    element={<DeleteEmployee />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;