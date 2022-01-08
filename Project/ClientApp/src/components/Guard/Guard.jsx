import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Redirect } from 'react-router-dom'

const Guard = ({ children }) => {
    const { user } = useContext(UserContext)

    return user ? <>{children}</> : <Redirect to={`/login`} />
}

export default Guard