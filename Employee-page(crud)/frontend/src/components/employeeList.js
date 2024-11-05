import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import {
  fetchEmployees,
  fetchDesignations,
  fetchHobbies,
  deleteEmployee,
} from "../services/Api";
import "../App.css";
import { useNavigate } from "react-router-dom";

const DataTableComponent = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchEmployeesWithDetails();
  }, []);

  const fetchEmployeesWithDetails = async () => {
    try {
      const employeesResponse = await fetchEmployees();
      const designationsResponse = await fetchDesignations();
      const hobbiesResponse = await fetchHobbies();
      // Combine designation and hobby data with employee data
      const employeesWithDetails = employeesResponse.data.map((employee) => ({
        ...employee,
        designation: findDesignation(
          employee.designation,
          designationsResponse.data
        ),
        hobbies: findHobbies(employee.hobbies, hobbiesResponse.data),
      }));

      employeesWithDetails.sort((a, b) => b.id - a.id);

      setEmployees(employeesWithDetails);
      setFilteredEmployees(employeesWithDetails);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const findDesignation = (designationId, designations) => {
    return designations.find((d) => d.id === designationId); 
  };

  const findHobbies = (hobbyIds, hobbies) => {
    return hobbies.filter((h) => hobbyIds.includes(h.id)); 
  };

  const handleEditbtn = (row) => {
    navigate(`/Employee/${row.email}`, {
      state: {
        defaultEmployee: row,
      },
    });
  };

  const handleDeletebtn = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (confirmed) {
      try {
        await deleteEmployee(id);
        setEmployees(employees.filter((employee) => employee.id !== id));
        setFilteredEmployees(
          filteredEmployees.filter((employee) => employee.id !== id)
        );
        alert("Employee deleted successfully!");
      } catch (error) {
        console.error("Error deleting Employee:", error);
        alert("Failed to delete employee.");
      }
    }
  };

  useEffect(() => {
    const result = employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(search.toLowerCase()) ||
        employee.email.toLowerCase().includes(search.toLowerCase()) ||
        employee.phone_number.toLowerCase().includes(search.toLowerCase())    
      );
    });
    setFilteredEmployees(result);
  }, [search, employees]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phone_number,
      sortable: true,
    },
    {
      name: "Gender",
      selector: (row) => row.gender,
      sortable: true,
    },
    {
      name: "Designation",
      selector: (row) => row.designation.title,
      sortable: true,
    },
    {
      name: "Hobbies",
      selector: (row) => row.hobbies.map((hobby) => hobby.name).join(", "),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div>
          <button id="editbtn" onClick={() => handleEditbtn(row)}>Edit</button>
          <button id="deletebtn" onClick={() => handleDeletebtn(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1>Employee Data Table</h1>
      <a href="/add">
        <button id="addbutton">Add Employee</button>
      </a>
      <div className="search">
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
      <div className="Table">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          highlightOnHover
        />
      </div>
    </div>
  );
};

export default DataTableComponent;
