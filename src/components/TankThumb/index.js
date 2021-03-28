import React from 'react'
import FishThumbnail from '../fishThumbnail'
import "./style.css"

const TankThumbnail = (props) => {
    return (
        <div className="TankThumbnail">
            <h3>{props.name}</h3>
            {props.fish.map((fishObj)=><FishThumbnail name={fishObj.name} color={fishObj.color} width={fishObj.width} />)}
        </div>
    )
}

export default TankThumbnail
