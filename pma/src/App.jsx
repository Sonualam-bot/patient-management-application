import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Header } from "./components/Header";

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { PatientView } from "./features/patient/PatientView";
import { WardView } from "./features/ward/WardView";
import { PatientDetail } from "./features/patient/PatientDetail";
import { WardDetail } from "./features/ward/WardDetail";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/patient" element={<PatientView />} />
          <Route path="/details/:patientId" element={<PatientDetail />} />
          <Route path="/details/:wardId" element={<WardDetail />} />
          <Route path="/ward" element={<WardView />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
