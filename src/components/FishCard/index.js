import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

const FishCard = (props) => {
  const styles = {
    backgroundColor: props.fishData.color,
  };
  return (
    <div className="FishCard" style={styles}>
      <h4>{props.fishData.name}</h4>
      <h5>{props.fishData.width}px wide</h5>
      <h5>tank: {props.fishData.TankId}</h5>
      <button onClick={() => props.delFish(props.fishData.id)}>delete</button>
      
      <Link to={`/fish/${props.fishData.id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default FishCard;
