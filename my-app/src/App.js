import Profile from "./Components/Profile/Profile";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Register from "./Components/Register/Register";
import Survey from "./Components/SurveyCreate/Survey";
import GetAllSurvey from "./Components/SurveyCreate/GetAllSurvey";
import View from "./Components/SurveyCreate/View";
import Home from "./Components/Home/Home";
import User from "./Components/User/User";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [userState, setUserState] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log('token', token);
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);


  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Home" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/Survey" element={isLoggedIn ? <Survey /> : <Navigate to="/login" />} />
          <Route path="/GetAllSurvey" element={isLoggedIn ? <GetAllSurvey /> : <Navigate to="/login" />} />
          <Route path="/View" element={isLoggedIn ? <View /> : <Navigate to="/login" />} />
          <Route path="/User" element={isLoggedIn ? <User /> : <Navigate to="/login" />} />
          <Route  
            path="/"
            element={
              isLoggedIn ? (
                <Profile setUserState={setUserState} username={userState.fname} />
              ) : (
                <Navigate to="/login" state={{ message: "Please login to access this page" }} />
              )
            }
          />
          <Route path="/login" element={<Login setUserState={setUserState} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
        {<Navbar />}
      </Router>
    </div>
  );
}

export default App;





