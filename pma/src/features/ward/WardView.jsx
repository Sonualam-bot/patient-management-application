import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import "../../Css/PForm.css";
import { useEffect, useState } from "react";
import { WardForm } from "./WardFrom";
import { deleteWardAsync, fetchWard, setWardInput } from "./WardSlice";

export const WardView = () => {
  const wards = useSelector((state) => state.wards.wards);
  const status = useSelector((state) => state.wards.status);
  const dispatch = useDispatch();

  const [editWardStatus, setEditWardStatus] = useState(false);

  const handleEditWard = (wardData) => {
    dispatch(setWardInput(wardData));
    setEditWardStatus(true);
  };

  const deleteWard = (id) => {
    dispatch(deleteWardAsync(id));
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchWard());
    }
  }, [status, dispatch]);

  return (
    <>
      <div className="patient-Main">
        <WardForm
          editWardStatus={editWardStatus}
          setEditWardStatus={setEditWardStatus}
        />

        {status === "loading" ? (
          <div className="m-lg-3 ">
            <h2>Loading....</h2>
          </div>
        ) : (
          <table className="table w-50 mt-5">
            <thead>
              <tr className="table-success">
                <th scope="col">Sn. No</th>
                <th scope="col">Ward Number</th>
                <th scope="col">Capacity</th>
                <th scope="col">Specialization</th>
                <th scope="col">Edit</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {wards?.map((ward, index) => {
                return (
                  <tr className="table-primary" key={ward._id}>
                    <th scope="row"> {index + 1} </th>
                    <td>
                      {" "}
                      <Link className="link" to={`/details/${ward?._id}`}>
                        {ward?.wardNumber}
                      </Link>{" "}
                    </td>
                    <td> {ward?.capacity} </td>
                    <td> {ward?.specialization} </td>
                    <td
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      onClick={() => handleEditWard(ward)}
                    >
                      Edit
                    </td>
                    <td onClick={() => deleteWard(ward?._id)}>Delete</td>
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
