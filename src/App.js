import React, { useState, useEffect } from "react";
import API from "./utils/API";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import TankDetail from "./pages/TankDetail";
import NavBar from "./components/NavBar";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [loginFormState, setloginFormState] = useState({
    email: "",
    password: "",
  });

  const [profileState, setProfileState] = useState({
    name: "",
    email: "",
    tanks: [],
    token: '',
    id:'',
    isLoggedIn: false,
  });

  useEffect(fetchUserData,[]);

  function fetchUserData(){
    const token = localStorage.getItem("token");
    API.getProfile(token).then((profileData) => {
      if (profileData) {
        setProfileState({
          name: profileData.name,
          email: profileData.email,
          tanks: profileData.Tanks,
          token:token,
          id:profileData.id,
          isLoggedIn: true,
        });
      } else {
        localStorage.removeItem("token");
        setProfileState({
          name: "",
          email: "",
          tanks: [],
          token:'',
          id:'',
          isLoggedIn: false,
        });
      }
    });
  }

  const inputChange = (event) => {
    const { name, value } = event.target;
    setloginFormState({
      ...loginFormState,
      [name]: value,
    });
  };

  const formSubmit = (event) => {
    event.preventDefault();
    API.login(loginFormState).then((newToken) => {
      localStorage.setItem("token", newToken.token);
      API.getProfile(newToken.token).then((profileData) => {
        setProfileState({
          name: profileData.name,
          email: profileData.email,
          tanks: profileData.Tanks,
          isLoggedIn: true,
        });
      });
    });
  };

  const deleteTank = id=>{
    API.deleteTank(profileState.token,id).then(data=>{
      fetchUserData();
    })
  }

  return (
    <div className="App">
      <Router>
        <NavBar profile={profileState} inputChange={inputChange} loginFormState={loginFormState} formSubmit={formSubmit} />
      <Route exact path='/'>
        <Home />
      </Route>
      <Route exact path='/profile'>
        <ProfilePage profile={profileState} fetchData={fetchUserData} delTank = {deleteTank} />
      </Route>
      <Route path='/tanks/:id'>
        <TankDetail profile={profileState} />
      </Route>
      </Router>
    </div>
  );
}

export default App;
