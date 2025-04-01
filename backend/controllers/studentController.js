const studentModel = require("../models/studentModel");
exports.getAllStudents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const students = await studentModel.getStudents(limit, offset);

    const totalCountResult = await studentModel.getTotalStudentCount();
    const totalEntries = totalCountResult.count;

    const totalPages = Math.ceil(totalEntries / limit);

    res.json({
      students,
      page: Number(page),
      limit: Number(limit),
      totalPages,
      totalEntries,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStudentById = async (req, res) => {
  try {
    const student = await studentModel.getStudentById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    console.log(req.body);
    const student = await studentModel.addStudent(name, email, age);
    res.json(student);
    console.log(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateStudent = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const student = await studentModel.updateStudent(
      req.params.id,
      name,
      email,
      age
    );
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    await studentModel.deleteStudent(req.params.id);
    res.json({ message: "Student deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
