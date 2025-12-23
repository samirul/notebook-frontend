import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const SocialAuth = () => {
    const login = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            try {
                const response = await axios.post('http://localhost:8000/api/accounts/social/login/google/', {
                    'code': codeResponse.code
                }, { withCredentials: true });

                if (response.data && response.data.access && response.data.user.pk && response.status === 200) {
                    const redirectPath = localStorage.getItem("redirectPage") || "/";
                    window.location.replace(redirectPath);
                    localStorage.removeItem("redirectPage");
                }
            } catch (error) {
                if (error.status === 400 || error.status === 401) {
                    window.location.replace("/login");
                }
            }
        },
        flow: 'auth-code',
        onError: (error) => {
            if (error.status === 400 || error.status === 401 || error.status === 404) {
                window.location.replace("/login");
            }
        }
    });

    return (
        <>
            <button className="button-auth-submit" onClick={() => login()}>
                Login with Google
            </button>
        </>

    );
};

export default SocialAuth;