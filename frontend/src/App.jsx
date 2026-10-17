import './App.css';
import { useState } from 'react';
import EmployeeForm from './components/EmployeeForm.jsx';
function App() {

  const [employee, setEmployee] = useState([{
    id: "1",
    name: "shivanshi",
    email: "maheshwarishivanshi5@gmail.com",
    department: "engineering",
    joiningDate: "2026-07-17",
    salary: 250000
  },
  {
    id: "2",
    name: "shivanshi",
    email: "maheshwarishivanshi5@gmail.com",
    department: "engineering",
    joiningDate: "2026-07-17",
    salary: 250000
  }]);

  const [showForm, setShowForm] = useState(false);

  const handleEdit = () => {
    setShowForm(true);
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
              {employee.map((emp) => (
                <tr className="table-rows" key={emp.id}>
                  <td className="table-cells">{emp.id}</td>
                  <td className="table-cells">{emp.name}</td>
                  <td className="table-cells">{emp.email}</td>
                  <td className="table-cells">{emp.department}</td>
                  <td className="table-cells">{emp.joiningDate}</td>
                  <td className="table-cells">{emp.salary}</td>
                  <td className="table-cells"><button onClick={handleEdit}className="edit-btn">Edit</button><button className="delete-btn">Delete</button></td>
                </tr>
              ))}

            </tbody>

          </table>
        </section>
        {showForm && (
          <EmployeeForm onClose={()=>setShowForm(false)} />
        )

        }

      </div>
    </>
  )
}

export default App
