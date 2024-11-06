import React from 'react'

const Square = (props) => {
  return (
    <div onClick={props.onClick} style={{
        border:"1px solid",
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:"0.375rem", // rounded-md
        }} className='square text-4xl'>
      <h1>{props.value}</h1>
    </div>
  )
}

export default Square
