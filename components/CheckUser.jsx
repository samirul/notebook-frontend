import axios from "axios"

export const CheckUser = async () => {
    return await axios.get('http://localhost:8000/accounts/user/', { withCredentials: true }, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        }
    })
}