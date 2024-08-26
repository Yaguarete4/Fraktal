import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom";

export const ProtectedPages = ({children}) => {
    const { handleAccessToken, accessToken, isLoggedIn, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    //Evita que el useEffect onMount se ejecute 2 veces dado al StricMode
    const hasFetched = useRef(false);

    useEffect(() => {
        if(hasFetched.current) return;

        const fetchData = async () => {
            try {
                const response = await fetch('https://fraktalapi.vercel.app/auth/authenticate', {
                    headers: {
                        "Authorization" : `Bearer ${accessToken}`
                    },
                    method: 'GET'
                });

                if(response.ok) login();
                else getAccessToken();
            } catch (err) {
                console.error('Error:', err);
            }
        }

        const getAccessToken = async () => {
            try {
                const response = await fetch('https://fraktalapi.vercel.app/auth/token', {
                    method: 'GET',
                    credentials: 'include'
                })
                
                if(!response.ok) return navigate('/login');
    
                const data = await response.json();
                handleAccessToken(data);
                login();
    
            } catch (err) {
                console.error('Error:', err);
            }
        }

        fetchData();
        hasFetched.current = true;
    }, [])

    return isLoggedIn && children
}