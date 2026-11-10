
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userroutes");
const reportRoutes = require("./routes/reportRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes.js");
const publicStatsRoutes = require("./routes/publicStatsRoutes");
const publicLawyerRoutes = require("./routes/publicLawyerRoutes");
const publicNgoRoutes = require("./routes/publicNgoRoutes");
const lawyerRoutes = require("./routes/lawyerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminLawyerRoutes = require("./routes/adminLawyerRoutes");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const aiRoutes = require("./routes/airoutes");
require("dotenv").config();
// Check whether the Groq key was loaded.
// Boolean() converts the key into true/false without printing the secret.
console.log("Groq key loaded:", Boolean(process.env.GROQ_API_KEY));
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

// Lets the server read JSON sent in req.body
app.use(express.json());

app.use("/api/admin/lawyers", adminLawyerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/lawyer", lawyerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/public", publicStatsRoutes);
app.use("/api/lawyers", publicLawyerRoutes);
app.use("/api/public/ngos", publicNgoRoutes);
app.use("/api/admin/lawyers", adminLawyerRoutes);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:");
        console.log(error);
    });

app.get("/", (req, res) => {
    res.send("Justiva Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});