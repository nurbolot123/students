const express = require("express");

const studentRoutes = require("./src/student/routes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/v1/students", studentRoutes);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
