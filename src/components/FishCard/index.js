import React from 'react'

const FishCard = (props) => {
    const styles={
        backgroundColor:props.fishData.color
    }
    return (
        <div className="FishCard" style={styles}>
            <h4>{props.fishData.name}</h4>
            <h5>{props.fishData.width}px wide</h5>
            <h5>tank: {props.fishData.tankId}</h5>
        </div>
    )
}

export default FishCard
