import axios from 'axios';

const API_URL = "http://localhost:8000/api/";

export const fetchDesignations = () => axios.get(`${API_URL}designations/`);
export const fetchHobbies = () => axios.get(`${API_URL}hobbies/`);
export const fetchEmployees = () => axios.get(`${API_URL}employees/`);

export const updateEmployee = (id, employeeData) => axios.put(`${API_URL}employees/${id}/`, employeeData);
export const createEmployee = (employeeData) => axios.post(`${API_URL}employees/`, employeeData);
export const deleteEmployee = (id) => axios.delete(`${API_URL}employees/${id}/`);
