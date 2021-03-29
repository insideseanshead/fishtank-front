import React from "react";
import { Link } from "react-router-dom";
import FishThumbnail from "../fishThumbnail";
import "./style.css";

const TankThumbnail = (props) => {
  return (
    <div className="TankThumbnail">
      <Link to={`/tanks/${props.id}`}>
        <h3>{props.name}</h3>
      </Link>
      <button onClick={()=>props.delTank(props.id)}>Delete Tank</button>
      {props.fish.map((fishObj) => (
        <FishThumbnail
          name={fishObj.name}
          color={fishObj.color}
          width={fishObj.width}
        />
      ))}
    </div>
  );
};

export default TankThumbnail;
