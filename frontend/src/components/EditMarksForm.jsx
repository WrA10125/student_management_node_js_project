import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { updateMark } from "../api";

const EditMarksForm = ({ show, mark, onClose, onUpdate }) => {
  const [subject, setSubject] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    if (mark) {
      setSubject(mark.subject);
      setScore(mark.score);
    }
  }, [mark]);

  const handleUpdateMark = async () => {
    if (!subject || !score) {
      Swal.fire("Error", "Please fill all fields", "error");
      return;
    }
    try {
      await updateMark(mark.id, subject, score);
      Swal.fire("Updated", "Mark updated successfully", "success");
      onUpdate(); 
      onClose(); 
    } catch (error) {
      Swal.fire("Error", error.message || "Failed to update mark", "error");
    }
  };

  return (
    <Modal style={{opacity:"80"}} show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title
          style={{ textAlign: "center", color: "green", width: "100%" }}
        >
          Edit Mark
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Score</Form.Label>
            <Form.Control
              type="number"
              value={score}
              min="0"
              onChange={(e) => setScore(e.target.value)}
            />
          </Form.Group>
          <Button variant="success" className="mt-3" onClick={handleUpdateMark}>
            Update Mark
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditMarksForm;
