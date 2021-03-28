import React from "react";
import TankThumbnail from "../../components/TankThumb";

const Home = (props) => {
  return (
    <div className="Home">
      <div className="TanksWrapper">
        {props.profile.isLoggedIn ? (
          props.profile.tanks.map((tankObj) => (
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
};

export default Home;
