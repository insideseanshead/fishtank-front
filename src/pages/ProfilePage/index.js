import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddTankForm from "../../components/AddTankForm";
import FishCard from "../../components/FishCard";
import TankThumbnail from "../../components/TankThumb";
import API from "../../utils/API";
import "./style.css";

const ProfilePage = (props) => {
  const [tankFormState, setTankFormState] = useState({
    name: "",
    userId: props.profile.id,
  });

  const handleInputChange = (event) => {
    setTankFormState({
      name: event.target.value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    API.createTank(props.profile.token, tankFormState).then((data) => {
      setTankFormState({
        name: "",
      });
      props.fetchData();
    });
  };

  return (
    <div className="Home">
      <div className="TanksWrapper">
        {props.profile.isLoggedIn ? (
          <AddTankForm
            profile={props.profile}
            handleInputChange={handleInputChange}
            handleFormSubmit={handleFormSubmit}
            tankName={tankFormState.name}
          />
        ) : (
          <p>Login to add a tank.</p>
        )}
        {props.profile.isLoggedIn ? (
          props.profile.tanks.map((tankObj) => (
            <TankThumbnail
              key={tankObj.id}
              id={tankObj.id}
              name={tankObj.name}
              fish={tankObj.Fishes}
              delTank={props.delTank}
            />
          ))
        ) : (
          <h1>Log in to see your tanks</h1>
        )}
      </div>
      <div className="FishWrapper">
        {props.profile.isLoggedIn
          ? props.profile.fish.map((fishObj) => (
              <FishCard
                key={fishObj.id}
                fishData={fishObj}
                delFish={props.delFish}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default ProfilePage;
