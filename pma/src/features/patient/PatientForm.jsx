import { useDispatch, useSelector } from "react-redux";
import "../../Css/PForm.css";
import {
  addPatientAsync,
  resetPatientInput,
  setPatientInput,
  updatePatientAsync,
  // updatePatientAsync,
} from "./PatientSlice";

export const PatientForm = ({ editStatus, setEditStatus }) => {
  const dispatch = useDispatch();
  const patientDetails = useSelector((state) => state.patients.patientDetails);

  const handlePatientFormInput = (e) => {
    const { name, value } = e.target;
    console.log({ ...patientDetails, [name]: value });
    dispatch(setPatientInput({ ...patientDetails, [name]: value }));
  };

  const handleAddNewPatient = (e) => {
    e.preventDefault();

    if (editStatus) {
      dispatch(
        updatePatientAsync({
          id: patientDetails._id,
          updatedPatient: patientDetails,
        })
      );
      setEditStatus(false);
      dispatch(resetPatientInput());
    } else {
      dispatch(addPatientAsync(patientDetails));
      setEditStatus(false);
      dispatch(dispatch(resetPatientInput()));
    }
  };

  const handlePatientFormClose = () => {
    dispatch(
      setPatientInput({
        name: "",
        age: "",
        gender: "",
        history: "",
        contactInfo: "",
        ward: "",
      })
    );
  };

  return (
    <>
      <button
        type="button"
        className="btn bg-success text-white"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
      >
        Add Patient
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
                Patient Entry Form
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handlePatientFormClose}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={patientDetails?.name}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your name here"
                    onChange={handlePatientFormInput}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={patientDetails?.age}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your age here"
                    onChange={handlePatientFormInput}
                  />
                </div>

                <select
                  className="form-select "
                  name="gender"
                  value={patientDetails?.gender}
                  aria-label="Default select example"
                  onChange={handlePatientFormInput}
                >
                  <option selected>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlTextarea1"
                    className="form-label"
                  >
                    History
                  </label>
                  <textarea
                    className="form-control "
                    name="history"
                    value={patientDetails?.history}
                    id="exampleFormControlTextarea1"
                    rows="3"
                    placeholder="Enter history here"
                    onChange={handlePatientFormInput}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    name="contactInfo"
                    value={patientDetails?.contactInfo}
                    className="form-control  "
                    id="exampleFormControlInput1"
                    placeholder="name@example.com"
                    onChange={handlePatientFormInput}
                  />
                </div>

                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Ward
                  </label>
                  <input
                    type="number"
                    name="ward"
                    value={patientDetails?.ward}
                    className="form-control "
                    id="exampleFormControlInput1"
                    placeholder="Enter your Ward number here"
                    onChange={handlePatientFormInput}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary "
                data-bs-dismiss="modal"
                onClick={handlePatientFormClose}
              >
                Close
              </button>
              <button
                type="submit"
                className="btn bg-success text-white"
                onClick={handleAddNewPatient}
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
