import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "../../Css/PForm.css";

export const WardDetail = () => {
  const { wardId } = useParams();
  const ward = useSelector((state) => state.wards.wards);
  console.log(ward);
  console.log(wardId);

  const selectedWard = ward?.find((ward) => ward._id === wardId);
  console.log({ selectedWard });

  const { wardNumber, capacity, specialization } = selectedWard;

  return (
    <>
      <div className="card">
        <div className="card-header"> Ward Number : {wardNumber}</div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> Capacity: {capacity} </li>
          <li className="list-group-item"> Specialization: {specialization}</li>
        </ul>
      </div>
    </>
  );
};
