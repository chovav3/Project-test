import React, { createContext, useState } from 'react'
import { toast } from '../components/Toast/ToastManager'
import { useHistory } from "react-router-dom";
import Loader from '../components/Loader/Loader'
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loding, setLoding] = useState(false)
    const history = useHistory();
    const login = (name, Password) => {
        setLoding(true)
        fetch('api/Users/Login', {
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({name, Password })
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
                const resJson = await res.json()
                setUser(resJson)
                if (resJson.length > 0) {
                    toast.show({
                        variant: "success",
                        content: "Login",
                        duration: 3000
                    })
                    history.push("/");
                } else {
                    toast.show({
                        variant: "error",
                        content: "Feild, name or password incorrect",
                        duration: 3000
                    })
                }
            }
        })
        
    }

    return (
        <UserContext.Provider value={{ login, user, setUser}}>
            {children}

            <Loader show={loding}></Loader>
        </UserContext.Provider>
        )
    }
    export default UserProvider