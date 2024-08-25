import { useContext, useEffect } from "react"
import { AuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom";

export const ProtectedPages = ({children}) => {
    const { accessToken, isLoggedIn, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://fraktalapi.vercel.app/auth/authenticate', {
                    headers: {
                        "Authorization" : `Bearer ${accessToken}`
                    },
                    method: 'GET'
                });

                if(response.ok) login()
                else logout()
            } catch (err) {
                console.error('Error:', err);
            }
        }

        const getAccessToken = async () => {
            try {
                const response = await fetch('https://fraktalapi.vercel.app/auth/token', {
                    method: 'GET',
                    credentials: true
                })
                
            } catch (err) {
                console.error('Error:', err);
            }
        }

        fetchData();
    }, [])

    useEffect(() => {
        if(!isLoggedIn) navigate('/login');
    }, [isLoggedIn])

    return children
}