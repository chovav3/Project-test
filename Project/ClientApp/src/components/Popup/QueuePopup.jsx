import React from 'react'

const QueuePopup = ({ popupContent}) => {


    return (<div>
        <div>name: <span>{popupContent.name}</span></div>
        <div>dog name:<span>{popupContent.dogName}</span></div>
        <div>date: <span>{popupContent.date.slice(0, 10)} | {popupContent.date.slice(-8, -3)}</span></div>
        <div>date created: <span>{popupContent.dateCreated.slice(0, 10)} | {popupContent.dateCreated.slice(-8, -3)}</span></div>
    </div>
        )
}

export default QueuePopup