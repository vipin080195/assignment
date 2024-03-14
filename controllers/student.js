const jwt = require("jsonwebtoken");
const Student = require("../models/Student");

const createStudent = async (req,res)=>{
    try{
     let {name,age,grade} = req.body
     const student = new Student({
        name: name,
        age: age,
        grade: grade,
      });
      await person.save();
      return res.status(201).json({ student });

    } catch(error){
        console.log(error)
    }
}


module.exports = {
    createStudent
  };