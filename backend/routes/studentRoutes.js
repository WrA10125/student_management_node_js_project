const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const marksController = require("../controllers/marksController");

router.get("/students", studentController.getAllStudents);
router.get("/students/:id", studentController.getStudentById);
router.post("/students", studentController.addStudent);
router.put("/students/:id", studentController.updateStudent);
router.delete("/students/:id", studentController.deleteStudent);

// Marks API routes
router.get('/students/:id/marks', marksController.getMarksByStudentId);
router.post('/marks', marksController.addMark);
router.put('/marks/:id', marksController.updateMark);
router.delete('/marks/:id', marksController.deleteMark);

module.exports = router;
