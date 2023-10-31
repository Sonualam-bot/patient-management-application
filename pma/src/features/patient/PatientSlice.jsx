import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://patient-management-system-6z48.onrender.com/api/v1";

export const fetchPatients = createAsyncThunk(
  "patients/fetchPatients",
  async () => {
    const response = await axios.get(`${BASE_URL}/patient`);
    return response.data.patient;
  }
);

export const addPatientAsync = createAsyncThunk(
  "patients/addPatientAsync",
  async (newPatient) => {
    const response = await axios.post(`${BASE_URL}/patient/add`, newPatient);
    return response.data.patient;
  }
);

export const updatePatientAsync = createAsyncThunk(
  "patients/updatePatientAsync",
  async ({ id, updatedPatient }) => {
    const response = await axios.post(
      `${BASE_URL}/patient/edit/${id}`,
      updatedPatient
    );
    return response.data.patient;
  }
);

export const deletePatientAsync = createAsyncThunk(
  "patients/deletePatientAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/patient/delete/${id}`);
    return response.data.patient;
  }
);

const initialState = {
  patients: [],
  status: "idle",
  patientDetails: {
    name: "",
    age: "",
    gender: "",
    history: "",
    contactInfo: "",
    ward: "",
  },
  showPatientForm: false,
};

const PatientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setShowPatientForm: (state, action) => ({
      ...state,
      showPatientForm: action.payload,
    }),
    setPatientInput: (state, action) => ({
      ...state,
      patientDetails: action.payload,
    }),
    resetPatientInput: (state) => ({
      ...state,
      patientDetails: initialState.patientDetails,
    }),
  },
  extraReducers: {
    [fetchPatients.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPatients.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = action.payload;
    },
    [fetchPatients.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addPatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addPatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients.push(action.payload);
    },
    [addPatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [updatePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updatePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedPatient = action.payload;
      const index = state.patients.findIndex(
        (s) => s._id === updatedPatient._id
      );
      if (index !== -1) {
        state.patients[index] = updatedPatient;
      }
    },
    [updatePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePatientAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePatientAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.patients = state.patients.filter(
        (patient) => patient._id !== action.payload._id
      );
    },
    [deletePatientAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowPatientForm, setPatientInput, resetPatientInput } =
  PatientSlice.actions;

export default PatientSlice.reducer;
