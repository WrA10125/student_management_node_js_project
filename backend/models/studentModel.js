const pool = require("./db");

const getStudents = async (limit, offset) => {
  const result = await pool.query(
    "SELECT id, name, email, age FROM students ORDER BY id LIMIT $1 OFFSET $2",
    [limit, offset]
  );
  return result.rows;
};


const getStudentById = async (id) => {
  const result = await pool.query(
    "SELECT s.*, m.subject, m.score FROM students s LEFT JOIN marks m ON s.id = m.student_id WHERE s.id = $1",
    [id]
  );
  return result.rows;
};

const addStudent = async ( name,email,age) => {
  const result = await pool.query(
    "INSERT INTO students (name, email,age) VALUES ($1, $2, $3) RETURNING *",
    [ name, email, age]
  );
  return result.rows[0];
};

const updateStudent = async (id, name, email, age) => {
  const result = await pool.query(
    "UPDATE students SET name=$2, email=$3, age=$4 WHERE id=$1 RETURNING*",
    [id, name, email,age]
  );
  return result.rows[0];
};

const deleteStudent = async (id) => {
  await pool.query("DELETE FROM students WHERE id=$1", [id]);
};

const getTotalStudentCount = async () => {
  const result = await pool.query("SELECT COUNT(*) AS count FROM students");
  return { count: parseInt(result.rows[0].count, 10) }; 
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  getTotalStudentCount,
};
