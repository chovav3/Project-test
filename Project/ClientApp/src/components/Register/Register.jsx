import React, { useState } from 'react'
import '../Login/Login.css'
import { toast } from '../Toast/ToastManager'
import Loader from '../Loader/Loader'
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom'

const Register = () => {

    const [name, setName] = useState('')
    const [Password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [loding, setLoding] = useState(false)
    const history = useHistory();

    const register = () => {
        setLoding(true)
        fetch('api/Users/UpsertUser', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({ name, Password, email })
        }).then(async res => {
            setLoding(false)
            if (!res.ok) {
                const msg = await res.json()
                toast.show({
                    variant: "error",
                    content: msg,
                    duration: 3000
                })
            } else {
                    toast.show({
                        variant: "success",
                        content: "Registrant",
                        duration: 3000
                    })
                history.push("/login");
            }
        })
    }

    return (<div className="form-center">
        <div dir="ltr" className="login">
        <div className="title">Register</div>
        <div className="container">
            <input type="text" id="text" value={name} onChange={(e) => setName(e.target.value)} required />
            <label htmlFor="text">User Name</label>
        </div>
        <div className="container">
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <label htmlFor="email">Email</label>
        </div>
        <div className="container">
            <input type="password" minLength={6} id="password" value={Password} onChange={(e) => setPassword(e.target.value)} required />
            <label htmlFor="password">Password</label>
            </div>
            <Link to="/login" className="link">I want to login</Link>
        <button className={name && Password && email ? "button-login" : "button-login-disable"}
            onClick={register}
                disabled={name || Password || email}>Sign up</button>
        <Loader show={loding} />
    </div>
    </div>
    )
}

export default Register;