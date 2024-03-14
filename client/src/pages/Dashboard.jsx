import React, { useEffect, useState } from 'react'
import "../styles/Dashboard.css";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


const Dashboard = () => {
  const [ token, setToken ] = useState(JSON.parse(localStorage.getItem("auth")) || "");
  const [ data, setData ] = useState({});
  const navigate = useNavigate();
  

  const [dataa, setDataa] = useState([]);

  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/v1/delete-student/${item._id}`);
      fetchStudents()
    } catch (error) {
      console.log({error});
    }
    // setData(data.filter(item => item.id !== id));
  };

  const handleUpdate = (item) => {
    console.log(item)
    navigate('/studentForm',{state:item})
  };

  const fetchStudents = async () => {

    try {
      const response = await axios.get("http://localhost:3000/api/v1/get-students");
      setDataa(response.data.studentDetails)
      // setData({ msg: response.data.msg, luckyNumber: response.data.secret });
    } catch (error) {
      toast.error(error.message);
    }
  }


  
  useEffect(() => {
    fetchStudents();
    if(token === ""){
      navigate("/login");
      toast.warn("Please login first to access studentlist");
    }
  }, [token]);

  return (
    <div>

    <div className="table-container">
        <Link style={{marginBlock:"20px"}} to="/studentForm">Create Student</Link>
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Grade</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dataa && dataa.length > 0 ?dataa.map((item,index) => (
          <tr key={item.id}>
            <td>{index +1}</td>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.grade}</td>
            <td>
              <button className="update-btn" onClick={() => handleUpdate(item)}>Update</button>
              <button className="delete-btn" onClick={() => handleDelete(item)}>Delete</button>
            </td>
          </tr>
        )):""}
      </tbody>
    </table>
  </div>
  <div style={{marginTop:"50px", marginInline:"auto"}}>
  <Link to="/logout" className="logout-button">Logout</Link>
  </div>
    </div>
  
  )
}

export default Dashboard