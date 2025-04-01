const marksModel = require("../models/marksModel");

exports.getMarksByStudentId = async (req, res) => {
  try {
    const marks = await marksModel.getMarksByStudentId(req.params.id);
    res.json(marks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addMark = async (req, res) => {
  try {
    const { studentId, subject, score } = req.body;
    const mark = await marksModel.addMark(studentId, subject, score);
    res.json(mark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateMark = async (req, res) => {
  try {
    const { subject, score } = req.body;
    const mark = await marksModel.updateMark(req.params.id, subject, score);
    res.json(mark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteMark = async (req, res) => {
  try {
    await marksModel.deleteMark(req.params.id);
    res.json({ message: "Mark deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

