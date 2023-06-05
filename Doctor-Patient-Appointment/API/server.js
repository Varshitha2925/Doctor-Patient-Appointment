const express = require("express");
const connectDb = require("./config/dBConnection");
const dotenv = require("dotenv").config();
const cors = require("cors");

const app = express();

const port = process.env.PORT;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  next();
});

app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));

connectDb();
app.use(cors());
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
