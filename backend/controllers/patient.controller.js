const Patient = require("../models/patient.model");

async function createNewPatientEntry(patientData) {
  try {
    const newPatient = await Patient.create(patientData);
    return newPatient;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function getAllPatient() {
  try {
    const allPatient = await Patient.find({});
    return allPatient;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function deleteSelectedPatient(id) {
  try {
    const removePatient = await Patient.findByIdAndDelete({ _id: id });
    return removePatient;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

async function editPatient(id, updatedData) {
  try {
    const edit = await Patient.findByIdAndUpdate({ _id: id }, updatedData, {
      new: true,
    });
    return edit;
  } catch (error) {
    throw new Error(`${error.message}`);
  }
}

module.exports = {
  createNewPatientEntry,
  getAllPatient,
  deleteSelectedPatient,
  editPatient,
};
