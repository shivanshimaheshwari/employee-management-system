import axios from 'axios';


const API = axios.create({
    baseURL:'/api/employees',
})

export const getAllEmployees = () => API.get('/findAll');


export const getEmployeeById = (id) => API.get('/${id}');

export const createEmployee = (emp) => API.post('',emp);

export const editEmployee = (id,emp) => API.put(`/updateDetails/${id}`,emp);

export const deleteEmployee = (id) => API.delete(`/deleteEmployee/${id}`);

