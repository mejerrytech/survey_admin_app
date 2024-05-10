import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Survey from "./Components/SurveyCreate/Survey"
import GetAllSurvey from "./Components/SurveyCreate/GetAllSurvey"
import View from "./Components/SurveyCreate/View"
import Home from "./Components/Home/Home"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [userstate, setUserState] = useState({});
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Home" element={<Home />}></Route>
          <Route path="/Survey" element={<Survey />}></Route>
          <Route path="/GetAllSurvey" element={< GetAllSurvey />}></Route>
          <Route path="/View" element={<View />}></Route>
          <Route
            path="/"
            element={
              userstate && userstate._id ? (
                <Profile
                  setUserState={setUserState}
                  username={userstate.fname}
                />
              ) : (
                <Login setUserState={setUserState} />
              )
            }
          ></Route>
          <Route
            path="/login"
            element={<Login setUserState={setUserState} />}
          ></Route>
          <Route path="/signup" element={<Register />}></Route>
        </Routes>
        {<Navbar />}

      </Router>
    </div>
  );
}

export default App;



