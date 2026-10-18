import './App.css';
import { useEffect, useState } from 'react';
import EmployeeForm from './components/EmployeeForm.jsx';
import {getAllEmployees, deleteEmployee} from './services/employeeService.js';
function App() {


  const [employee, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectDepartment, setSelectDepartment]=useState('ALL');

  useEffect(() => {
    getAllEmployees()
      .then((response) => setEmployee(response.data))
      .catch((error) => console.error('Failed to load employees:', error));
  }, []);

  const refreshData=()=>{
    getAllEmployees()
    .then((response)=>setEmployee(response.data))
    .catch((error) => console.error('Failed to refresh employees:', error));;
  }
  const [showForm, setShowForm] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleEdit = (emp) => {
    setShowForm(true);
    setSelectedEmployee(emp);
  }

  const handleDelete = async (id) => {
    try{
      await deleteEmployee(id);
      refreshData();
    }
    catch(error){
      console.error('Failed to delete employee:', error);
    }    
  }

  const handleSearch = (e) =>{
    setSearchTerm(e);
  }
  const filteredEmployees = employee.filter((emp) => {
    const search = searchTerm.toLowerCase();

    return (
        emp.name.toLowerCase().includes(search) ||
        emp.email.toLowerCase().includes(search)
    );
});

  return (
    <>
      <div className="page">
        <section className="app-header">
          <h2>
            Employee Management System
          </h2>
        </section>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <input className ="search" type='search' placeholder="Search..." name="search"value={searchTerm} onChange={(e) => handleSearch(e.target.value)}>
          </input>
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
        filteredEmployees.map((emp) => (
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
