// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// ================== Serve Frontend ==================
app.use(express.static(path.join(__dirname, "../frontend")));

// ================== DATABASE CONNECT ==================
mongoose.connect("mongodb://127.0.0.1:27017/skillliftDB")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

// ================== SCHEMAS ==================

// USER SCHEMA
const UserSchema = new mongoose.Schema({
  email: String,
  password: String
});
const User = mongoose.model("User", UserSchema);

// RESUME SCHEMA
const ResumeSchema = new mongoose.Schema({
  name: String,
  contact: String,
  objective: String,
  education: String,
  skills: String,
  projects: String,
  certifications: String,
  userEmail: String
});
const Resume = mongoose.model("Resume", ResumeSchema);

// APPLICATION SCHEMA
const ApplicationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: String,
  reason: String,
  jobRole: String,
  userEmail: String
});
const Application = mongoose.model("Application", ApplicationSchema);

// BOOKING SCHEMA
const BookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  type: String,       // HR, Technical, Managerial
  datetime: String,   // Combined date + time
  skills: String,
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model("Booking", BookingSchema);

// CONTACT SCHEMA
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});
const Contact = mongoose.model("Contact", ContactSchema);

// ================== ROUTES ==================

// LOGIN / REGISTER
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, password });
      await user.save();
      return res.json({ message: "✅ User registered & logged in!" });
    }
    res.json({ message: "✅ Login successful!" });
  } catch (error) {
    res.json({ message: "❌ Error in login" });
  }
});

// SAVE RESUME
app.post("/resume", async (req, res) => {
  try {
    const resume = new Resume(req.body);
    await resume.save();
    res.json({ message: "✅ Resume saved successfully!" });
  } catch (error) {
    console.error(error);
    res.json({ message: "❌ Error saving resume" });
  }
});

// GET USER RESUMES
app.get("/resumes/:email", async (req, res) => {
  try {
    const data = await Resume.find({ userEmail: req.params.email });
    res.json(data);
  } catch (error) {
    res.json([]);
  }
});

// APPLY JOB
app.post("/apply", async (req, res) => {
  try {
    const appData = new Application(req.body);
    await appData.save();
    res.json({ message: "✅ Application submitted!" });
  } catch (error) {
    res.json({ message: "❌ Error submitting application" });
  }
});

// GET USER APPLICATIONS
app.get("/applications/:email", async (req, res) => {
  try {
    const data = await Application.find({ userEmail: req.params.email });
    res.json(data);
  } catch (error) {
    res.json([]);
  }
});

// BOOK MOCK INTERVIEW
app.post("/book", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.json({ message: "✅ Mock interview booked successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error booking interview" });
  }
});

// GET USER BOOKINGS
app.get("/bookings/:email", async (req, res) => {
  try {
    const data = await Booking.find({ email: req.params.email });
    res.json(data);
  } catch (error) {
    res.json([]);
  }
});

// POST contact message
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: "✅ Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "❌ Error saving message" });
  }
});

// GET all contact messages
app.get("/contacts", async (req, res) => {
  try {
    const messages = await Contact.find();
    res.json(messages);
  } catch (error) {
    res.json([]);
  }
});

// ================== FRONTEND ROUTES ==================

// Dashboard
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

// Interview page (mock)
app.get("/mock", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/interview.html"));
});

// Booking page
app.get("/booking", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/booking.html"));
});

// ================== SERVER ==================
app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});