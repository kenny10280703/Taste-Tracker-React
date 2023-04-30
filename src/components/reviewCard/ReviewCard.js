import React from 'react'

export default function ReviewCard(props) {
    const { username, rating, comment } = props
  return (
    <div>
        <h2>{username}</h2>
        <span style={{color: 'orange'}}>
            {String.fromCharCode(9733).repeat(Math.floor(rating))}
        </span>
        <span style={{color: 'grey'}}>
            {String.fromCharCode(9733).repeat(Math.floor(5 - rating))}
        </span>
        <p>{comment}</p>
    </div>
  )
}
