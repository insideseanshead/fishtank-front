import React from 'react'

const AddTankForm = (props) => {
    return (
        <div>
            <form onSubmit={props.handleFormSubmit}>
                <input name='name' onChange ={props.handleInputChange} value={props.tankName}/>
                <input type='hidden' value={props.profile.id} />
                <input type='submit' value = 'add tank'/>
            </form>
        </div>
    )
}

export default AddTankForm
