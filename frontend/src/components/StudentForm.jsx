import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { addStudent } from "../api";

const StudentForm = ({ refreshStudents, onClose }) => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    age: "",
    id: "",   
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(student);
      Swal.fire("Success", "Student added!", "success");
      setStudent({ name: "", email: "", age: "", id: "" });
      refreshStudents();
      onClose();
    } catch (error) {
      Swal.fire("Error", "Failed to add student", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label >Member Name*</Form.Label>
        <Form.Control
          type="text"
          name="name"
          placeholder="Enter Member Name"
          value={student.name}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Member Email*</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter Member Email"
          value={student.email}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Member Age*</Form.Label>
        <Form.Control
          type="number"
          name="age"
          placeholder="Enter Age"
          value={student.age}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Member Parent id</Form.Label>
        <Form.Control
          type="number"
          name="id"
          placeholder="Enter Parent ID"
          value={student.id}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Button className="mt-4" variant="success" type="submit">
        Add Member
      </Button>
    </Form>
  );
};

export default StudentForm;
