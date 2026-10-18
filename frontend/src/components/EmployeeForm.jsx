import { useState } from 'react';
import { createEmployee, editEmployee, getAllEmployees } from '../services/employeeService.js';

export default function EmployeeForm({ onClose, setEmployee, selectedEmployee }) {
    const [form, setForm] = useState(selectedEmployee ?? {
        name: '',
        email: '',
        department: '',
        joiningDate: '',
        salary: ''
    });
    const refreshData = () => {
        getAllEmployees()
            .then((response) => setEmployee(response.data))
            .catch((error) => console.error("Failed to fetch data",error));
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((currentForm) => ({
            ...currentForm,
            [name]: value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedEmployee) {
            try {
                await editEmployee(selectedEmployee.id, form);
                onClose();
                await refreshData();
            }
            catch (error) {
                console.error("Failed to edit employee", error);
            }

        }
        else {
            try {
                await createEmployee(form);
                onClose();
                await refreshData();
            }
            catch (error) {
                console.error("Failed to create new employee", error);
            }
        }
    }
    return (
        <div className="modal-backdrop">
            <section role="dialog" aria-modal="true" aria-labelledby="form-title">
                <h2 className="form-title"> {selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" value={form.name} required type="text" onChange={(e) => handleChange(e)} />

                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" required value={form.email} onChange={handleChange}></input>

                    <label htmlFor="department">Department</label>
                    <select id="department" name="department" type="text" required value={form.department} onChange={handleChange}>
                        <option value="">Select Department</option>
                        <option value="engineering">Engineering</option>
                        <option value="humanResources">Human Resources</option>
                        <option value="research">Reseach</option>
                    </select>

                    <label htmlFor="joiningDate">Joining Date</label>
                    <input id="joiningDate" name="joiningDate" type="date" required value={form.joiningDate} onChange={handleChange}></input>

                    <label htmlFor="salary">Salary</label>
                    <input id="salary" name="salary" type="number" min="0" required value={form.salary} onChange={handleChange} />

                    <div className="form-actions">
                        <button className="save-btn" type="submit">
                            Save Employee
                        </button>

                        <button className="cancel-btn" type="button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </section>
        </div>
    )
}