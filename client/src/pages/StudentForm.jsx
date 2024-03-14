import React, { useState } from 'react';
import "../styles/Dashboard.css";
import axios from "axios";
import { useNavigate , useLocation } from "react-router-dom";


const StudentForm = ({ isOpen, onClose }) => {
    const navigate = useNavigate()
    const location = useLocation()
    const studentData = location.state
    console.log("studentDatastudentData",studentData)
    const [formData, setFormData] = useState({
        name: studentData ? studentData.name : "",
        age:  studentData ? studentData.age : "",
        grade: studentData ? studentData.age : "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = async (e) => {
        try{

            e.preventDefault();
            if(studentData){
                const response = await axios.put(
                    `http://localhost:3000/api/v1/update-student/${studentData._id}`,
                    formData
                  );
                console.log(formData); 
                navigate("/dashboard")
            }else{
                const response = await axios.post(
                    "http://localhost:3000/api/v1/create-student",
                    formData
                  );
                console.log(formData); 
                navigate("/dashboard")
            }
        } catch(error){
            console.log(error)
        }
      };
  return (
    <div className="form-container form-size" style={{width:"fit-content", marginInline:"auto"}}>
    <h2>Student Details Form</h2>
    <form className="student-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="grade">Grade:</label>
        <input
          type="text"
          id="grade"
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group ">
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>
      <button style={{marginTop:"20px"}} type="submit">{studentData ? "Update" :"Submit"}</button>
    </form>
  </div>
  );
};

export default StudentForm;