const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add Student
router.post('/', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Get all Students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.send(students);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Get Student by ID
router.get('/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send({ error: 'Student not found' });
    res.send(student);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// Update Student
router.put('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).send({ error: 'Student not found' });
    res.send(student);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

// Delete Student
router.delete('/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send({ error: 'Student not found' });
    res.send({ message: 'Student deleted' });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
