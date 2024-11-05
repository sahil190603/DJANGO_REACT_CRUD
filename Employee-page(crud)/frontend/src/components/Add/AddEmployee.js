import React, { useState, useEffect } from 'react';
import { fetchDesignations, fetchHobbies, fetchEmployees, createEmployee, updateEmployee } from '../../services/Api';
import { useLocation, useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { defaultEmployee } = location.state || {};
  const [designations, setDesignations] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  const [employees, setEmployees] = useState([]);


  const [form, setForm] = useState({
    name: defaultEmployee?.name || '',
    email: defaultEmployee?.email || '',
    phone_number: defaultEmployee?.phone_number || '',
    designation: defaultEmployee?.designation?.id || '',
    hobbies: defaultEmployee?.hobbies.map(hobby => hobby.id) || [],
    gender: defaultEmployee?.gender || '',
  });

  useEffect(() => {
    fetchDesignations().then(res => setDesignations(res.data));
    fetchHobbies().then(res => setHobbies(res.data));
    fetchEmployees().then(res => setEmployees(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const hobbyId = parseInt(value);
    setForm((prevForm) => {
      if (checked) {
        return { ...prevForm, hobbies: [...prevForm.hobbies, hobbyId] };
      } else {
        return { ...prevForm, hobbies: prevForm.hobbies.filter((hobby) => hobby !== hobbyId) };
      }
    });
  };

  const handleChangeGender = (e) => {
    const { value } = e.target;
    setForm({ ...form, gender: value });
  };

  const checkEmployeeExists = (name, email, phone_number) => {
    var OriginalCase = name;
    var lowercasename = OriginalCase.toLowerCase();
    let nameAndNumberExists = false;
    let nameAndEmailExists = false;
    let EmailAndNumberExists = false;
    let allExists = false;

    for (const employee of employees) {
      if (employee.name === lowercasename && employee.phone_number === phone_number) {
        nameAndNumberExists = true;
      }
      if (employee.name === lowercasename && employee.email === email) {
        nameAndEmailExists = true;
      }
      if (employee.name === lowercasename && employee.email === email && employee.phone_number === phone_number) {
        allExists = true;
      }
      if (employee.email === email && employee.phone_number === phone_number){
        EmailAndNumberExists = true;
      }
    }

    if (allExists) {
      alert('Employee with this name, email, and phone number already exists!');
      return true;
    }
    if (nameAndNumberExists) {
      alert('Employee with this name and phone number already exists!');
      return true;
    }
    if (nameAndEmailExists) {
      alert('Employee with this name and email already exists!');
      return true;
    }
    if (EmailAndNumberExists){
      alert('This Email and Number is already Connected with Another Employee!');
      return true;
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!defaultEmployee) {
      if (checkEmployeeExists(form.name, form.email, form.phone_number)) {
        return;
      }
    }

    try {
      if (defaultEmployee) {
        await updateEmployee(defaultEmployee.id, form);
        alert('Employee updated successfully!');
      } else {
        await createEmployee(form);
        alert('Employee added successfully!');
      }
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };
  const handlecanclebtn = () =>{
  navigate('/')
  }

  return (
    <div className="EmployeeForm">
      <form onSubmit={handleSubmit}>
        <h1>{defaultEmployee ? 'Edit Employee' : 'Add Employee'}</h1>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            pattern='[0-9]{10}'
            required
          />
        </div>
        <div>
          <label>Designation:</label>
          <select
            name="designation"
            value={form.designation}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            {designations.map((designation) => (
              <option key={designation.id} value={designation.id}>
                {designation.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Hobbies:</label>
          {hobbies.map((hobby) => (
            <div key={hobby.id}>
              <input
                type="checkbox"
                name="hobbies"
                value={hobby.id}
                checked={form.hobbies.includes(hobby.id)}
                onChange={handleCheckboxChange}
              />
              {hobby.name}
            </div>
          ))}
        </div>
        <div>
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={form.gender === 'male'}
                onChange={handleChangeGender}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={form.gender === 'female'}
                onChange={handleChangeGender}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={form.gender === 'other'}
                onChange={handleChangeGender}
              />
              Other
            </label>
          </div>
        </div>
        <button type="submit">{defaultEmployee ? 'Edit' : 'Add'}</button>
        <button id="canclebtn" onClick={() => handlecanclebtn()}>cancel</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
