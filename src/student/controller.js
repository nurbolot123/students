const pool = require("../../db");
const queries = require("./queries");

const getStudents = async (req, res) => {
  try {
    const students = await pool.query(queries.getStudents);

    res.status(200).json(students.rows);
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "Students not found" });
  }
};

const getStudentById = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await pool.query(queries.getStudentById, [id]);

    res.status(200).json(student.rows[0]);
  } catch (err) {
    console.warn(err);
    res.status(500).send({ message: "Student not found" });
  }
};

const addStudent = async (req, res) => {
  try {
    const { name, email, age, dob } = req.body;
    const emailExists = await pool.query(queries.checkEmailExists, [email]);

    if (emailExists.rows.length) {
      return res.json({ message: "Email already exists!" });
    }

    await pool.query(queries.addStudent, [name, email, age, dob]);

    res.status(200).json({ message: "Student created Successfully!" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "Failed to add a student" });
  }
};

const removeStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const student = await pool.query(queries.getStudentById, [id]);

    if (!student.rows.length) {
      return res.json({ message: "Student does not exist in the database" });
    }

    await pool.query(queries.removeStudent, [id]);

    res.status(200).json({ message: "Student deleted Successfully!" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "Failed to delete a student" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const student = await pool.query(queries.getStudentById, [id]);
    if (!student.rows.length) {
      return res.json({ message: "Student does not exist in the database" });
    }

    await pool.query(queries.updateStudent, [name, id]);

    res.status(200).json({ message: "Student updated Successfully!" });
  } catch (err) {
    console.warn(err);
    res.status(500).json({ message: "Failed to update a student" });
  }
};

module.exports = {
  getStudents,
  getStudentById,
  addStudent,
  removeStudent,
  updateStudent,
};
