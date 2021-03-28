import React, { useState, useEffect } from "react";
import TankThumbnail from "./components/TankThumb";
import API from "./utils/API";
import "./App.css"

function App() {
  const [loginFormState, setloginFormState] = useState({
    email: "",
    password: "",
  });

  const [profileState, setProfileState] = useState({
    name: "",
    email: "",
    tanks: [],
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
          isLoggedIn: true,
        });
      } else {
        localStorage.removeItem("token");
        setProfileState({
          name: "",
          email: "",
          tanks: [],
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
      <div className='TanksWrapper'>
        {profileState.isLoggedIn ? (
          profileState.tanks.map((tankObj) => (
            <TankThumbnail
              key={tankObj.id}
              name={tankObj.name}
              fish={tankObj.Fishes}
            />
          ))
        ) : (
          <h1>Log in to see your tanks</h1>
        )}
      </div>
    </div>
  );
}

export default App;
