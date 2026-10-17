
export default function EmployeeForm({onClose}){

    return(
        <div className="modal-backdrop">
        <section role="dialog" aria-modal="true" aria-labelledby="form-title">
        <h2 id="form-title">Add Employee</h2>
            <form>
            <label htmlFor="name">Name</label>
            <input id="name" name="name" required type="text"/>

            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="text" required></input>

            <label htmlFor="department">Department</label>
            <select id="department" name="department" type="text" required>
                <option value="">Select Department</option>
                <option value="engineering">Engineering</option>
                <option value="humanResources">Human Resources</option>
                <option value="research">"Reseach</option>
            </select>

            <label htmlFor="joiningDate">Joining Date</label>
            <input id="joiningDate" name="JoiningDate" type="date" required></input>

            <label htmlFor="salary">Salary</label>
            <input id="salary" name="salary" type="number" min="0" required/>

            <button className="save-btn" type="submit">Save Employee</button>
            <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>
            </form>
            </section>
        </div>
    )
}