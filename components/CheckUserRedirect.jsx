import { useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { CheckUser as user } from './CheckUser';

export const CheckUserRedirect = () => {
    const location = useLocation();
    const checkUser = async () => {
        try {
            await user();

        } catch (error) {
            if (error.status === 401) {
                localStorage.setItem("redirectPage", location.pathname);
            }
        }

    }
    useEffect(() => {
        checkUser();
    }, [])
}