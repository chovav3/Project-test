import React from 'react'
import '../Loader/Loader.css'

const Loader = ({ show }) => {
    return show ? <div className="loader-center"><span className="loader"></span></div> : null
}

export default Loader