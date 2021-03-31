import React, { useState, useEffect } from "react";
import API from "../../utils/API";
import TankThumbnail from "../../components/TankThumb";
import "./style.css";

const Home = () => {
  const [tanks, setTanks] = useState([]);
  
  useEffect(() => {
    API.getAllTanks().then((tanksData) => {
        setTanks(tanksData);
      });
  }, []);

  return (
    <div className="TanksWrapper">
      <h1>Look at all these fishes</h1>
      {tanks.map((tankObj) => (
        <TankThumbnail
          key={tankObj.id}
          id={tankObj.id}
          name={tankObj.name}
          fish={tankObj.Fishes}
        />
      ))}
    </div>
  );
};

export default Home;
