import React from 'react'
import {
    Routes,
    Route
} from "react-router-dom";

import DataTableComponent from "../components/employeeList";
import AddEmployeeForm from '../components/Add/AddEmployee';
//  import EditEmployeeForm from "../components/Edit/EditEmployee";

const MainRoute = () => {

  return (
    <div className="App">           
        <Routes>
            <Route
                path="/"
                element={<DataTableComponent />}
            ></Route>
            <Route
                path="/add"
                element={<AddEmployeeForm />}
            ></Route>
            <Route 
                path="/Employee/:email"
                element={<AddEmployeeForm />}
            ></Route>
        </Routes>
    </div>
  )
}

export default MainRoute;
