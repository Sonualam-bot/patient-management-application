import { useDispatch, useSelector } from "react-redux";
import { PatientForm } from "./PatientForm";
import { Link } from "react-router-dom";
import {
  deletePatientAsync,
  fetchPatients,
  setPatientInput,
} from "./PatientSlice";

import "../../Css/PForm.css";
import { useEffect, useState } from "react";

export const PatientView = () => {
  const patients = useSelector((state) => state.patients.patients);
  const status = useSelector((state) => state.patients.status);
  const dispatch = useDispatch();

  const [editStatus, setEditStatus] = useState(false);

  const handleEditPatient = (patientData) => {
    dispatch(setPatientInput(patientData));
    setEditStatus(true);
  };

  const deletePatient = (id) => {
    dispatch(deletePatientAsync(id));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPatients());
    }
  }, [status, dispatch]);

  return (
    <>
      <div className="patient-Main">
        <PatientForm editStatus={editStatus} setEditStatus={setEditStatus} />

        {status === "loading" ? (
          <div className="m-lg-3 ">
            <h2>Loading....</h2>
          </div>
        ) : (
          <table className="table w-50 mt-5">
            <thead>
              <tr className="table-success">
                <th scope="col">Sn. No</th>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
                <th scope="col">Gender</th>
                <th scope="col">History</th>
                <th scope="col">Contact Info</th>
                <th scope="col">Ward</th>
                <th scope="col">Edit</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {patients?.map((patient, index) => {
                return (
                  <tr className="table-primary" key={patient._id}>
                    <th scope="row"> {index + 1} </th>
                    <td>
                      {" "}
                      <Link className="link" to={`/details/${patient?._id}`}>
                        {patient?.name}
                      </Link>{" "}
                    </td>
                    <td> {patient?.age} </td>
                    <td> {patient?.gender} </td>
                    <td> {patient?.history} </td>
                    <td> {patient?.contactInfo} </td>
                    <td> {patient?.ward} </td>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleEditPatient(patient)}
                    >
                      Edit
                    </td>
                    <td onClick={() => deletePatient(patient?._id)}>Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};
