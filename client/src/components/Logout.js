import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

const Logout = () => {

    const {state, dispatch} = useContext(UserContext);

    const navigate = useNavigate();

    // promises
    useEffect(() => {
        fetch('/logout',{
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((res) => {
            dispatch({type: "USER", payload:true});
            navigate('/signin', {replace: true});
            if (res.status !== 200) {
                const error = new Error(res.error);
                throw error;
            }
        }).catch((err) => {
            console.log(err);
        })
    });

    return (
        <>
        <h1 className='vh-100 d-flex justify-content-center align-item-center'>This is my logout page</h1>
        </>
    )
}

export default Logout
