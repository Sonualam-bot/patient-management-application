const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

const patient = require("./routes/patient.routes");
const ward = require("./routes/ward.routes");

app.get("/", (req, res) => {
  res.send("Patient Management Application");
});

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use("/api/v1", patient);
app.use("/api/v1", ward);

module.exports = app;
