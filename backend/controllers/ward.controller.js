const Ward = require("../models/ward.model");

async function getAllWards() {
  try {
    const ward = await Ward.find({});
    return ward;
  } catch (error) {
    throw new Error(`${error.mesasge}`);
  }
}

async function addNewWard(wardData) {
  try {
    const addNew = await Ward.create(wardData);
    return addNew;
  } catch (error) {
    throw new Error(`${error.mesasge}`);
  }
}

async function deleteWardById(id) {
  try {
    const deleteWard = await Ward.findByIdAndDelete({ _id: id });
    return deleteWard;
  } catch (error) {
    throw new Error(`${error.mesasge}`);
  }
}

async function editWardByID(id, updatedWardData) {
  try {
    const editWard = await Ward.findByIdAndUpdate(
      { _id: id },
      updatedWardData,
      { new: true }
    );
    return editWard;
  } catch (error) {
    throw new Error(`${error.mesasge}`);
  }
}

module.exports = {
  getAllWards,
  addNewWard,
  deleteWardById,
  editWardByID,
};
