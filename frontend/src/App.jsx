import './App.css';
import { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm.jsx';
import { getAllEmployees, deleteEmployee } from './services/employeeService.js';
function App() {


  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectDepartment, setSelectDepartment] = useState("ALL Departments");

  useEffect(() => {
    getAllEmployees()
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error('Failed to load employees:', error));
  }, []);

  const refreshData = () => {
    getAllEmployees()
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error('Failed to refresh employees:', error));;
  }
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (emp) => {
    setShowForm(true);
    setSelectedEmployee(emp);
  }

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      refreshData();
    }
    catch (error) {
      console.error('Failed to delete employee:', error);
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e);
  }
  const[sortBy, setSortBy]=useState('name');
  const [sortDirection, setSortDirection] = useState("asc");


  const filteredEmployees = employee.filter((emp) => {
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      emp.name.toLowerCase().includes(search) ||
      emp.email.toLowerCase().includes(search);
    const matchesDepartment =
      !selectDepartment ||
      selectDepartment === 'ALL Departments' ||
      emp.department.includes(selectDepartment);
    return matchesSearch && matchesDepartment;
  });

  const sortedEmployees = [...filteredEmployees].sort((a,b)=>{
    let comparison = 0;
    if(sortBy === "name"){
      comparison = a.name.localeCompare(b.name);
    }
    else if(sortBy === 'salary'){
       comparison = a.salary - b.salary;
    }
    else if(sortBy === 'joiningDate'){
       comparison= a.joiningDate.localeCompare(b.joiningDate);
    }

    if(sortDirection === 'desc'){
      comparison=comparison*-1;
    }
    return comparison;
  })

  const handleChange = (e) =>{
    setSelectDepartment(e.target.value);
  }


  return (
    <>
      <div className="page">
        <section className="app-header">
          <h2>
            Employee Management System
          </h2>
        </section>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input className="search" type='search' placeholder="Search..." name="search" value={searchTerm} onChange={(e) => handleSearch(e.target.value)}>
          </input>
          <select className="department" name="department" type="text" value={selectDepartment} onChange={handleChange}>
            <option value="">ALL Departments</option>
            <option value="engineering">Engineering</option>
            <option value="humanResources">Human Resources</option>
            <option value="research">Reseach</option>
          </select>
          <select className="department" value={sortBy} onChange={(e)=>setSortBy(e.target.value)}>
            <option value="salary">Salary</option>
            <option value="name"> Name </option>
            <option value="joiningDate">Joining Date</option>
          </select>
            <select className="department" value={sortDirection} onChange={(e)=>setSortDirection(e.target.value)}>
            <option value ="asc">Ascending</option>
            <option value="desc"> Descending </option>
          </select>
          <button
            className="add-btn"
            type="button"
            onClick={() => (setShowForm(true))}
          >
            Add Employee
          </button>
        </div>

        <section className="employee-section">
          <h2>Employees</h2>
          <table className="employee-table">
            <thead className="table-headers">
              <tr className="table-rows">
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Joining Date</th>
                <th>Salary</th>
                <th>
                  Actions
                </th>

              </tr>

            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                sortedEmployees.map((emp) => (
                  <tr className="table-rows" key={emp.id}>
                    <td className="table-cells">{emp.id}</td>
                    <td className="table-cells">{emp.name}</td>
                    <td className="table-cells">{emp.email}</td>
                    <td className="table-cells">{emp.department}</td>
                    <td className="table-cells">{emp.joiningDate}</td>
                    <td className="table-cells">{emp.salary}</td>
                    <td className="table-cells">
                      <button
                        onClick={() => handleEdit(emp)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(emp.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No employees found.
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </section>
        {showForm && (
          <EmployeeForm onClose={() => { setShowForm(false); setSelectedEmployee(null); }} setEmployee={setEmployee} selectedEmployee={selectedEmployee} />
        )

        }

      </div>
    </>
  )
}

export default App
