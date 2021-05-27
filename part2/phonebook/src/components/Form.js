import React from 'react'
import Input from './Input'

const Form = (props) => {
    return (
      <form onSubmit={props.onSubmit}>
        <Input text={"name:"} value={props.nameInput} onChange={props.nameChange}/>
        <Input text={"number:"} value={props.numberInput} onChange={props.numberChange}/>
        <button type='submit'>add</button>
      </form>
    )
}

export default Form