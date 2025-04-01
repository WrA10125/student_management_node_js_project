const pool = require("./db");

const getMarksByStudentId = async (studentId) => {
  const result = await pool.query("SELECT * FROM marks WHERE student_id = $1", [
    studentId,
  ]);
  return result.rows;
};

const addMark = async (studentId, subject, score) => {
  const result = await pool.query(
    "INSERT INTO marks (student_id, subject, score) VALUES ($1, $2, $3) RETURNING *",
    [studentId, subject, score]
  );
  return result.rows[0];
};

const updateMark = async (id, subject, score) => {
  const result = await pool.query(
    "UPDATE marks SET subject=$1, score=$2 WHERE id=$3 RETURNING *",
    [subject, score, id]
  );
  return result.rows[0];
};

const deleteMark = async (id) => {
  await pool.query("DELETE FROM marks WHERE id=$1", [id]);
};

module.exports = { getMarksByStudentId, addMark, updateMark, deleteMark };
