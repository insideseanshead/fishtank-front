import React, { useState, useEffect } from "react";
import API from "./utils/API";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import TankDetail from "./pages/TankDetail";

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
    isLoggedIn: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    API.getProfile(token).then((profileData) => {
      if (profileData) {
        setProfileState({
          name: profileData.name,
          email: profileData.email,
          tanks: profileData.Tanks,
          token:token,
          isLoggedIn: true,
        });
      } else {
        localStorage.removeItem("token");
        setProfileState({
          name: "",
          email: "",
          tanks: [],
          token:'',
          isLoggedIn: false,
        });
      }
    });
  }, []);

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

  return (
    <div className="App">
      <Router>
        <form onSubmit={formSubmit}>
          <input
            onChange={inputChange}
            value={loginFormState.email}
            type="text"
            name="email"
            placeholder="email"
          ></input>
          <input
            onChange={inputChange}
            value={loginFormState.password}
            type="password"
            name="password"
          ></input>
          <input type="submit" value="login"></input>
        </form>
      <Route exact path='/'>
        <Home profile={profileState} />
      </Route>
      <Route path='/tanks/:id'>
        <TankDetail profile={profileState} />
      </Route>
      </Router>
    </div>
  );
}

export default App;
