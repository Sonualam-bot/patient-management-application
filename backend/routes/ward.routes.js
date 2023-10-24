const express = require("express");
const wardRouter = express.Router();

const {
  getAllWards,
  addNewWard,
  deleteWardById,
  editWardByID,
} = require("../controllers/ward.controller");

wardRouter.get("/ward", async (req, res) => {
  try {
    const allWards = await getAllWards();

    if (allWards.length === 0) {
      res.status(404).json({
        success: false,
        message: "ward not found. No ward added",
      });
    }

    res.status(200).json({
      success: true,
      message: "Succesfully fetched all wards",
      ward: allWards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch wards",
    });
  }
});

wardRouter.post("/ward/add", async (req, res) => {
  try {
    const { wardNumber, capacity, specialization } = req.body;

    if (!wardNumber || !capacity || !specialization) {
      res.status(401).json({
        success: false,
        message: "Required Fields are missing",
      });
    }

    const addNow = await addNewWard(req.body);

    if (addNow) {
      res.status(200).json({
        success: true,
        message: "Successfully added new Ward",
        ward: addNow,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to add new ward ${error.message} `,
    });
  }
});

wardRouter.delete("/ward/delete/:wardID", async (req, res) => {
  try {
    const wardID = req.params.wardID;
    const removeWard = await deleteWardById(wardID);

    if (!removeWard) {
      res.status(401).json({
        success: false,
        message: "Failed to find ward",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted ward",
      ward: removeWard,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete Ward",
    });
  }
});

wardRouter.post("/ward/edit/:wardID", async (req, res) => {
  try {
    const wardID = req.params.wardID;

    const editWardNow = await editWardByID(wardID, req.body);

    if (!editWardNow) {
      res.status(401).json({
        success: false,
        message: "Failed to find ward",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated ward",
      ward: editWardNow,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to edit ward ${error.message}`,
    });
  }
});

module.exports = wardRouter;
