import { useDispatch, useSelector } from "react-redux";
import "../../Css/PForm.css";
import {
  addWardAsync,
  resetWardInput,
  setWardInput,
  updateWardAsync,
} from "./WardSlice";

export const WardForm = ({ editWardStatus, setEditWardStatus }) => {
  const dispatch = useDispatch();
  const wardDetails = useSelector((state) => state.wards.wardDetails);

  const handleWardFormInput = (e) => {
    const { name, value } = e.target;
    console.log({ ...wardDetails, [name]: value });
    dispatch(setWardInput({ ...wardDetails, [name]: value }));
  };

  const handleAddNewWard = (e) => {
    e.preventDefault();

    if (editWardStatus) {
      dispatch(
        updateWardAsync({
          id: wardDetails._id,
          updateWard: wardDetails,
        })
      );
      setEditWardStatus(false);
      dispatch(resetWardInput());
    } else {
      dispatch(addWardAsync(wardDetails));
      setEditWardStatus(false);
      dispatch(dispatch(resetWardInput()));
    }
  };

  const handleWardFormClose = () => {
    dispatch(dispatch(resetWardInput()));
  };

  const specialists = [
    "Cardiology",
    "Oncology",
    "Neurology",
    "Orthopedic",
    "Pediatric",
    "Burn Unit",
    "ENT",
  ];

  return (
    <>
      <button
        type="button"
        className="btn bg-success text-white"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add ward
      </button>

      <div
        className="modal bg-transparent  "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Ward Entry Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleWardFormClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Ward Number
                  </label>
                  <input
                    type="text"
                    name="wardNumber"
                    value={wardDetails?.wardNumber}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your name here"
                    onChange={handleWardFormInput}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={wardDetails?.capacity}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your age here"
                    onChange={handleWardFormInput}
                  />
                </div>

                <select
                  className="form-select "
                  name="specialization"
                  value={wardDetails?.specialization}
                  aria-label="Default select example"
                  onChange={handleWardFormInput}
                >
                  <option selected>Select specialists</option>
                  {specialists?.map((specialist, index) => {
                    return (
                      <option key={index} value={specialist}>
                        {" "}
                        {specialist}{" "}
                      </option>
                    );
                  })}
                </select>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
                onClick={handleWardFormClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn bg-success text-white"
                onClick={handleAddNewWard}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
