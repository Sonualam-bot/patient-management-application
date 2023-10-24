const express = require("express");
const patientRouter = express.Router();

const {
  createNewPatientEntry,
  getAllPatient,
  deleteSelectedPatient,
  editPatient,
} = require("../controllers/patient.controller");

patientRouter.get("/patient", async (req, res) => {
  try {
    const patient = await getAllPatient();

    if (patient.length === 0) {
      res.status(400).json({
        success: false,
        message: "No Patients Added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully Fetched Patients Data",
      patient: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch patients",
    });
  }
});

patientRouter.post("/patient/add", async (req, res) => {
  try {
    const { name, age, gender, history, contactInfo, ward } = req.body;

    if (!name || !age || !gender || !history || !contactInfo || !ward) {
      res.status(401).json({
        success: false,
        message: "Required Fields are missing",
      });
    }

    const addPatient = await createNewPatientEntry(req.body);

    if (addPatient) {
      res.status(200).json({
        success: true,
        message: "Successfully create new Patient Entry",
        patient: addPatient,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add Patient",
    });
  }
});

patientRouter.delete("/patient/delete/:patientID", async (req, res) => {
  try {
    const patientID = req.params.patientID;

    const remove = await deleteSelectedPatient(patientID);

    if (!remove) {
      res.status(401).json({
        success: false,
        message: "Failed to find Patient",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted Patient",
      patient: remove,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete patient",
    });
  }
});

patientRouter.post("/patient/edit/:patientID", async (req, res) => {
  try {
    const patientID = req.params.patientID;
    const updatePatient = await editPatient(patientID, req.body);

    if (!updatePatient) {
      res.status(404).json({
        success: false,
        message: "Failed to find patient",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully Updated Patient",
      patient: updatePatient,
    });
  } catch (error) {
    res.status(500).json({
      success: true,
      message: "Failed to edit student",
    });
  }
});

module.exports = patientRouter;
