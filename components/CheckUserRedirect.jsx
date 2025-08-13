import { useEffect } from 'react'
import axios from 'axios'
import { Navigate, useLocation } from "react-router-dom";

export const CheckUserRedirect = () => {
    const location = useLocation();
    const checkUser = async () => {
        try{ 
            await axios.get('http://localhost:8000/accounts/user/', { withCredentials: true }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

        } catch(error){
            if (error.status === 401) {
            localStorage.setItem("redirectPage", location.pathname);
        }
        }

    }
    useEffect(() => {
        checkUser();
    }, [])
}