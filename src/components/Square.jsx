import React from 'react'

const Square = (props) => {
  return (
    <div onClick={props.onClick} style={{
        border:"1px solid",
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
        }} className='square text-2xl'>
      <h1>{props.value}</h1>
    </div>
  )
}

export default Square
