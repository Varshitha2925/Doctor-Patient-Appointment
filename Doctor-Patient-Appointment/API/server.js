const express = require("express");
const connectDb = require("./config/dBConnection");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT;

const cors = require('cors');

// Allow requests from specific origins
app.use(cors({
  origin: 'http://localhost:5173', // Add the origin of your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add allowed methods if necessary
  credentials: true, // Include cookies/auth headers if needed
}));

// OR, allow all origins (development only)
app.use(cors());

app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));

connectDb();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
