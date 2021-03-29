import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddFishForm from "../../components/AddFishForm";
import Fish from "../../components/Fish";
import API from "../../utils/API";
import "./style.css";

const TankDetail = (props) => {
  const [tank, setTank] = useState({
    name: "",
    userId:"",
    fish: [],
  });

  const[fishFormState,setFishFormState]= useState({
    name:'',
    color:'#bada55',
    width:0
  })

  const { id } = useParams();

  useEffect(() => {
    API.getOneTank(id).then((tankData) => {
      if (tankData) {
        setTank({
          name: tankData.name,
          fish: tankData.Fishes,
          userId: tankData.UserId
        });
      }
    });
  }, []);

  const handleInputChange = event=>{
    const {name,value} = event.target;
    setFishFormState({
      ...fishFormState,
      [name]:value
    })
  }

  const handleFormSubmit=e=>{
    e.preventDefault();
    API.createFish(props.profile.token,{
      ...fishFormState,
      tankId:id
    }).then(data=>{
      API.getOneTank(id).then((tankData) => {
        if (tankData) {
          setTank({
            name: tankData.name,
            fish: tankData.Fishes,
          });
        }
      });
      setFishFormState({
        name:'',
        color:'#bada55',
        width:0
      })
    })
  }

  return (
    <>
      <h1>{tank.name}</h1>
      {props.profile.id===tank.userId?<AddFishForm handleFormSubmit={handleFormSubmit} handleInputChange={handleInputChange} fishFormState={fishFormState} />:<h1>You cant add fish here</h1>}
      <div className="TankDetail">
        {tank.fish.map((fishObj) =><Fish name={fishObj.name} color={fishObj.color} width={fishObj.width} />)}
      </div>
      <div className = 'seaFloor'></div>
    </>
  );
};

export default TankDetail;
