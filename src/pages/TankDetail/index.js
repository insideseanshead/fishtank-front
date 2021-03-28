import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Fish from "../../components/Fish";
import API from "../../utils/API";
import "./style.css";

const TankDetail = (props) => {
  const [tank, setTank] = useState({
    name: "",
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
      <form onSubmit={handleFormSubmit}>
        <input onChange={handleInputChange} value={fishFormState.name} type='text' name='name' placeholder='name' />
        <input onChange={handleInputChange} value={fishFormState.width} type='number' name='width' placeholder='width' />
        <input onChange={handleInputChange} value={fishFormState.color} type='color' name='color' placeholder='color' />
        <input type='submit' value='add fish!' />
      </form>
      <div className="TankDetail">
        {tank.fish.map((fishObj) =><Fish name={fishObj.name} color={fishObj.color} width={fishObj.width} />)}
      </div>
      <div className = 'seaFloor'></div>
    </>
  );
};

export default TankDetail;
