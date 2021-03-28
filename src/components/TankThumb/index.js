import React from 'react'
import "./style.css"

const TankThumbnail = (props) => {
    return (
        <div className="TankThumbnail">
            <h3>{props.name}</h3>
            {props.fish.map((fishObj)=><p>{fishObj.name}</p>)}
        </div>
    )
}

export default TankThumbnail
