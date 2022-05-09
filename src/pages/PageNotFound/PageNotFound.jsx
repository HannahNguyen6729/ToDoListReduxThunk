import React from 'react'

export default function PageNotFound(props) {
  return (
    <h2 className="text-danger">Can't found the page with link: {props.match.url} </h2>
  )
}
