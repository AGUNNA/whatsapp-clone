import { Button } from '@material-ui/core';
import React from 'react';
import { auth, provider } from './Firebase';
import "./login.css";
import { actionTypes } from './Reducer';
import { useStateValue } from './StateProvider';

function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
        .signInWithPopup(provider)
        .then((result) => {
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch(error => alert(error.message));
    };

    return (
        <div className='login'>
            <div className='login__container'>
                <img
                    src="https://en.wikipedia.org/wiki/File:WhatsApp.svg"
                    alt=""
                />
                
                <div className="login__text">
                    <h1>Sign in to WhatApp</h1>
                </div>

                <Button onClick={signIn}>Sign in with Google</Button>
            </div>
        </div>
    )
}

export default Login
