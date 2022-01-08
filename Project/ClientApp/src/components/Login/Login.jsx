import React, { useState, useContext} from 'react'
import '../Login/Login.css'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

const Login = () => {
    const [userName, setUserName] = useState('')
    const [Password, setPassword] = useState('')
    const { login } = useContext(UserContext)

    return (<div className="form-center">
        <div dir="ltr" className="login">
        <div className="title">Login</div>
        <div className="container">
            <input type="text" id="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            <label htmlFor="text">User Name</label>
        </div>

        <div className="container">
            <input type="password" id="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="password">Password</label>
        </div>
        <Link to="/register" className="link">I want to register</Link>
        <button className={userName && Password ? "button-login" : "button-login-disable"}
            onClick={() => login(userName, Password)}
            disabled={!userName || !Password}>Sign in</button>
        </div>
    </div>
    )
}

export default Login;