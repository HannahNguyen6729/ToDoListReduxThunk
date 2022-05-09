import React from 'react'

export default function Detail(props) {
    console.log(props)
  return (
    <div>
        <h1 className='text-danger'>Path: {props.match.path}</h1>
        <h2 className='text-info'> URL: {props.match.url} </h2>
        <h3 className='text-success'> ID: {props.match.params.id} </h3>
    </div>
  )
}
