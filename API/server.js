const express = require("express");
const connectDb = require("./config/dBConnection");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/doctor", require("./routes/doctorRoutes"));

connectDb();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
