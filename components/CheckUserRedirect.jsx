import { useEffect} from 'react'
import { useLocation } from "react-router-dom";
import axios from 'axios';

export const CheckUserRedirect = () => {
    const location = useLocation();
    const checkLoggedInUser = async () => {
        try {
            const response = await axios.get('http://localhost:8000/accounts/api/logged/status/', { withCredentials: true }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })

            if (response.data.item.logged_in === 'no') {
                localStorage.setItem("redirectPage", location.pathname);
            }

        } catch (error) { }

    }
    useEffect(() => {
        checkLoggedInUser();
    }, [])
}