import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../Css/Home.css";
import { fetchPatients } from "../features/patient/PatientSlice";
import { fetchWard } from "../features/ward/WardSlice";
import { Link } from "react-router-dom";
import "../Css/PForm.css";

export const Homepage = () => {
  const dispatch = useDispatch();
  const [totalPatients, setTotalPatients] = useState(0);
  const [occupancyRate, setOccupancyRate] = useState(0);
  const [topPerformingWard, setTopPerformingWard] = useState("");

  const patients = useSelector((state) => state.patients.patients);
  const wards = useSelector((state) => state.wards.wards);

  // Function to calculate occupancy rate for a specific ward
  const calculateOccupancyRateForWard = (ward) => {
    const occupiedBeds = patients.filter((patient) => {
      return patient?.ward === ward.wardNumber;
    }).length;

    return (occupiedBeds / ward.capacity) * 100;
  };

  // Function to find the top-performing ward based on occupancy rate
  const findTopPerformingWard = () => {
    let topWard = null;
    let maxOccupancyRate = 0;

    for (const ward of wards) {
      const occupancyRate = calculateOccupancyRateForWard(ward);

      if (occupancyRate > maxOccupancyRate) {
        topWard = ward;
        maxOccupancyRate = occupancyRate;
      }
    }

    // Set specialization or default message
    setTopPerformingWard(topWard ? topWard.specialization : "No data");
  };

  // Function to calculate the overall occupancy rate
  const calculateOccupancyRate = () => {
    const occupiedBeds = patients.length;
    const totalBeds = wards.reduce((total, ward) => total + ward.capacity, 0);
    const rate = (occupiedBeds / totalBeds) * 100;
    setOccupancyRate(rate);
  };

  useEffect(() => {
    setTotalPatients(patients.length);
    calculateOccupancyRate();
    findTopPerformingWard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients, wards]);

  useEffect(() => {
    if (patients.length === 0 && wards.length === 0) {
      dispatch(fetchPatients());
      dispatch(fetchWard());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [patients, wards]);

  return (
    <>
      <div className="home-main  ">
        <div className="p-2 child-div ">
          {" "}
          <p>Total Patients</p> {totalPatients}{" "}
        </div>
        <div className="p-2 child-div ">
          {" "}
          <p>Occupancy Rate</p> {occupancyRate}{" "}
        </div>
        <div className="p-2 child-div ">
          {" "}
          <p>Top Performing</p> {topPerformingWard}{" "}
        </div>
        <div className="p-2 child-div ">
          {" "}
          <p>Github</p>{" "}
          <Link
            className="links"
            to="https://github.com/Sonualam-bot/patient-management-application"
          >
            Github
          </Link>
        </div>
      </div>
    </>
  );
};
