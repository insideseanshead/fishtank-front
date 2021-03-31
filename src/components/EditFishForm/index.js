import React from 'react'

const EditFishForm = (props) => {
    return (
        <form onSubmit={props.handleFormSubmit}>
        <input onChange={props.handleInputChange} value={props.fish.name} type='text' name='name' placeholder='name' />
        <input onChange={props.handleInputChange} value={props.fish.width} type='number' name='width' placeholder='width' />
        <input onChange={props.handleInputChange} value={props.fish.color} type='color' name='color' placeholder='color' />
        <input type='submit' value='Submit' />
      </form>
    )
}

export default EditFishForm
