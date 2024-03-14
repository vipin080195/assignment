const jwt = require("jsonwebtoken");
const User = require("../models/User");
const mongoose = require('mongoose');
const Student = require("../models/Student");
const ObjectId = mongoose.Types.ObjectId;


const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "Bad request. Please add email and password in the request body",
    });
  }

  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    const isMatch = await foundUser.comparePassword(password);

    if (isMatch) {
      const token = jwt.sign(
        { id: foundUser._id, name: foundUser.name },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );

      return res.status(200).json({ msg: "user logged in", token });
    } else {
      return res.status(400).json({ msg: "Bad password" });
    }
  } else {
    return res.status(400).json({ msg: "Bad credentails" });
  }
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);

  res.status(200).json({
    msg: `Hello, ${req.user.name}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

const getAllUsers = async (req, res) => {
  let users = await User.find({});

  return res.status(200).json({ users });
};

const register = async (req, res) => {
  let foundUser = await User.findOne({ email: req.body.email });
  if (foundUser === null) {
    let { username, email, password } = req.body;
    if (username.length && email.length && password.length) {
      const person = new User({
        name: username,
        email: email,
        password: password,
      });
      await person.save();
      return res.status(201).json({ person });
    }else{
        return res.status(400).json({msg: "Please add all values in the request body"});
    }
  } else {
    return res.status(400).json({ msg: "Email already in use" });
  }
};

const createStudent = async (req,res)=>{
  try{
   let {name,age,grade} = req.body
   const student = new Student({
      name: name,
      age: Number(age),
      grade: grade,
    });
    await student.save();
    return res.status(201).json({ student });

  } catch(error){
      console.log(error)
    return res.status(400).json({ msg: "something went wrong please try again" });

  }
}
const getStudentList = async (req,res)=>{
  try{
   
   const studentDetails = await Student.find({},).lean()
    return res.status(201).json({ studentDetails });

  } catch(error){
      console.log(error)
    return res.status(400).json({ msg: "something went wrong please try again" });

  }
}
const updateStudent = async (req,res)=>{
  try{
   let {studentId} = req.params
   let updateData = req.body
   const studentDetails = await Student.findByIdAndUpdate({_id:studentId},updateData,{ new: true })
   if(studentDetails){
    return res.status(201).json({ studentDetails });
    
   }else{
    res.status(404).json({ message: 'Student not found' });
   }
  } catch(error){
      console.log(error)
    return res.status(400).json({ msg: "something went wrong please try again" });

  }
}
const deleteStudent = async (req,res)=>{
  try{
   let {studentId} = req.params
   const studentDetails = await Student.findByIdAndDelete({_id:studentId})
    return res.status(201).json({ studentDetails });
  } catch(error){
      console.log(error)
    return res.status(400).json({ msg: "something went wrong please try again" });

  }
}

module.exports = {
  login,
  register,
  dashboard,
  getAllUsers,
  createStudent,
  getStudentList,
  updateStudent,
  deleteStudent,
  deleteStudent
};
