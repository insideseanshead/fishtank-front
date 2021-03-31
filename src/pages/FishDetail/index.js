import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EditFishForm from "../../components/EditFishForm";
import Fish from "../../components/Fish";
import API from "../../utils/API";

const FishDetail = (props) => {
  const [fishState, setFishState] = useState({
    name: "Joe",
    width: 100,
    color: "pink",
  });
  const params = useParams();
  useEffect(() => {
    API.getOneFish(params.id).then((fishData) => {
      setFishState({
        name: fishData.name,
        width: fishData.width,
        color: fishData.color,
      });
    });
  }, []);

  const handleInputChange = event=>{
      const {name,value}=event.target;
      setFishState({
          ...fishState,
          [name]:value
      })
  }

  const handleFormSubmit = event =>{
      event.preventDefault();
      console.log('Updating...')
  }

  return (
    <div>
      <EditFishForm handleInputChange={handleInputChange} handleFormSubmit={handleFormSubmit} fish={fishState} />
      <Fish
        name={fishState.name}
        width={fishState.width}
        color={fishState.color}
      />
    </div>
  );
};

export default FishDetail;
