import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./features/patient/PatientSlice";
import wardReducer from "./features/ward/WardSlice";

const store = configureStore({
  reducer: {
    patients: patientReducer,
    wards: wardReducer,
  },
});

export default store;
