import React from 'react';
import { Route } from 'react-router';
import Home from './components/Home';
import  Login  from './components/Login/Login';
import Register from './components/Register/Register';
import UserProvider from '../src/context/UserContext'
import './custom.css'

const App =()=> {

    return (
        <UserProvider>
        <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Register} />
            </UserProvider>
    );
}

export default App
