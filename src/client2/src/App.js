import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navigation/navbar.navigation.js";
import { Route, Routes } from "react-router-dom";
import Instructor from "./Navigation/instructure.navigation";
import StudentInfo from "./Navigation/studentInfo.navigation.js";
import Membership from "./Navigation/Memberships.js";
import Workout from "./Navigation/workoutInfo.navigation.js";
import RegularMembers from "./Navigation/regularMembers.navigation.js";
import SessionInformation from "./Navigation/sessionInfo.navagation.js";
import StudentOfferings from "./Navigation/studentOffering.navigation.js";

//<Route path="/getStudents/" element={<StudentOfferings />}/>

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
            <Route path="/instructure" element={<Instructor/>} />
            <Route path="/memberInfo" element={<StudentInfo />} />
            <Route path="/memberships" element={<Membership/>}/>
            <Route path="/workouts" element={<Workout />}/>
            <Route path="/workout/daily" element={<RegularMembers />}/>
            
            <Route path="/classInfo/" element={<SessionInformation />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
