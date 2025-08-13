import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from 'react-bootstrap/Alert';

const Login = () => {

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [loginErrorMsg, setLoginErrorMsg] = useState([])
  const [showLoginErrorMsg, setShowLoginErrorMsg] = useState(false)

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/auth/login/",
        loginData,
        { withCredentials: true }, {
        headers:
        {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },

      })
      if(response.data && response.data.access && response.data.user.pk && response.status === 200){
        const redirectPath = localStorage.getItem("redirectPage") || "/";
        window.location.replace(redirectPath);
        localStorage.removeItem("redirectPage")
      }
    } catch (error) {
      if(error.status === 400){
        setLoginErrorMsg(error.response.data['non_field_errors'][0]);
        setShowLoginErrorMsg(true);
      }
    }
  };
  return (
    <>
      <div className='login-container'>
        <div className="grid-auth-container">
          <div className={showLoginErrorMsg ? 'auth-panel-alert': 'auth-panel'}>
            {showLoginErrorMsg ? <Alert variant="danger">
            <p>{loginErrorMsg}</p>
          </Alert> : ""}
            <h2>Login</h2>
            <Form onSubmit={handleSubmit} className="p-4">
              <Form.Group className="mb-3 from-size-item" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group className="mb-3 from-size-item" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  placeholder='Password'
                />
              </Form.Group>

              <div className='btn-auth-container'>
                <button className="button-auth-submit" role="button">
                  Login
                </button>
              </div>
              <p className='register-link-title'>Not Registered?</p>
              <a className="register-link" href="/register">Register</a>
            </Form>
          </div>

        </div>

      </div>
    </>
  )
}

export default Login
