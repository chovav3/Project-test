import React from "react";
import  '../Popup/Popup.css'

const Popup = ({ show, closeHandler, content, title }) => {

    return (
        show?
        <div className="overlay" >
            <div className="popup">
                    <span className="close" onClick={closeHandler}> &times;</span>
                    <h2 style={{ marginTop: '-10px', marginBottom: '8px'}}> {title}</h2>
                    <hr/>
                    <div> {content} </div>
            </div>
            </div>
            : null
    );
};
export default Popup