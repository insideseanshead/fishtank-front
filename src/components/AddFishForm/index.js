import React from 'react'

const AddFishForm = (props) => {
    return (
        <form onSubmit={props.handleFormSubmit}>
        <input onChange={props.handleInputChange} value={props.fishFormState.name} type='text' name='name' placeholder='name' />
        <input onChange={props.handleInputChange} value={props.fishFormState.width} type='number' name='width' placeholder='width' />
        <input onChange={props.handleInputChange} value={props.fishFormState.color} type='color' name='color' placeholder='color' />
        <input type='submit' value='Submit' />
      </form>
    )
}

export default AddFishForm
