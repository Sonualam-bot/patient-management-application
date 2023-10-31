import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://patient-management-system-6z48.onrender.com/api/v1";

export const fetchWard = createAsyncThunk("wards/fetchWards", async () => {
  const response = await axios.get(`${BASE_URL}/ward`);
  return response.data.ward;
});

export const addWardAsync = createAsyncThunk(
  "wards/addWardAsync",
  async (newWard) => {
    const response = await axios.post(`${BASE_URL}/ward/add`, newWard);
    return response.data.ward;
  }
);

export const updateWardAsync = createAsyncThunk(
  "ward/updateWardAsync",
  async ({ id, updateWard }) => {
    const response = await axios.post(
      `${BASE_URL}/ward/edit/${id}`,
      updateWard
    );
    return response.data.ward;
  }
);

export const deleteWardAsync = createAsyncThunk(
  "wards/deleteWardAsync",
  async (id) => {
    const response = await axios.delete(`${BASE_URL}/ward/delete/${id}`);
    return response.data.ward;
  }
);

const initialState = {
  wards: [],
  status: "idle",
  wardDetails: {
    wardNumber: "",
    capacity: "",
    specialization: "",
  },
  showWardForm: false,
};

const WardSlice = createSlice({
  name: "wards",
  initialState,
  reducers: {
    setShowWardForm: (state, action) => ({
      ...state,
      showPatientForm: action.payload,
    }),
    setWardInput: (state, action) => ({
      ...state,
      wardDetails: action.payload,
    }),
    resetWardInput: (state) => ({
      ...state,
      wardDetails: initialState.wardDetails,
    }),
  },
  extraReducers: {
    [fetchWard.pending]: (state) => {
      state.status = "loading";
    },
    [fetchWard.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = action.payload;
    },
    [fetchWard.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [addWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards.push(action.payload);
    },
    [addWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },

    [updateWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [updateWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      const updatedWard = action.payload;
      const index = state.wards.findIndex((s) => s._id === updatedWard._id);
      if (index !== -1) {
        state.wards[index] = updatedWard;
      }
    },
    [updateWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deleteWardAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deleteWardAsync.fulfilled]: (state, action) => {
      state.status = "success";
      state.wards = state.wards.filter(
        (ward) => ward._id !== action.payload._id
      );
    },
    [deleteWardAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { setShowWardForm, setWardInput, resetWardInput } =
  WardSlice.actions;

export default WardSlice.reducer;
