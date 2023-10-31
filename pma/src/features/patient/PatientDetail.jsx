import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../Css/PForm.css";

export const PatientDetail = () => {
  const { patientId } = useParams();
  const patients = useSelector((state) => state.patients.patients);
  console.log(patients);
  console.log(patientId);

  const selectedPatient = patients?.find(
    (patient) => patient._id === patientId
  );
  console.log({ selectedPatient });

  const { name, age, gender, history, contactInfo, ward } = selectedPatient;

  return (
    <>
      <div className="card">
        <div className="card-header">{name}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> Age: {age} </li>
          <li className="list-group-item"> Gender: {gender}</li>
          <li className="list-group-item"> History: {history}</li>
          <li className="list-group-item"> Contact Info: {contactInfo}</li>
          <li className="list-group-item"> Ward No.: {ward}</li>
        </ul>
      </div>
    </>
  );
};
