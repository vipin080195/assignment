const express = require("express");
const router = express.Router();

const { login, register, dashboard, getAllUsers ,createStudent, getStudentList,updateStudent,deleteStudent} = require("../controllers/user");
const authMiddleware = require('../middleware/auth')

router.route("/login").post(login);
router.route("/register").post(register);
router.route("/dashboard").get(authMiddleware, dashboard);
router.route("/users").get(getAllUsers);
router.route("/create-student").post(createStudent);
router.route("/create-student").post(createStudent);
router.route("/get-students").get(getStudentList);
router.route("/update-student/:studentId").put(updateStudent);
router.route("/delete-student/:studentId").delete(deleteStudent);


module.exports = router;