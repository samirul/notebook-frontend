import { useState } from 'react'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Cookies from 'js-cookie';
import Alert from 'react-bootstrap/Alert';


const Register = () => {
  const [registerData, setRegisterData] = useState({ username: '', email: '', password1: '', password2: '' });
  const [registerErrorUser, setRegisterErrorUser] = useState('');
  const [registerErrorEmail, setRegisterErrorEmail] = useState('');
  const [registerErrorPassword1, setRegisterErrorMsgPassword1] = useState('');
  const [registerErrorPassword2, setRegisterErrorMsgPassword2] = useState('');
  const [registerErrorNonField, setRegisterErrorMsgNonField] = useState('');
  const [registerSuccess, setRegisterSuccess] = useState('');
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);


  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegisterErrorUser('');
    setRegisterErrorEmail('');
    setRegisterErrorMsgPassword1('');
    setRegisterErrorMsgPassword2('');
    setRegisterErrorMsgNonField('');
    try {
      const response = await axios.post("http://localhost:8000/api/auth/registration/",
        registerData,
        { withCredentials: true }, {
        headers:
        {
          'X-CSRFToken': Cookies.get('csrftoken'),
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },

      })
      if (response.status === 201) {
        setRegisterSuccess(response.data.detail);
        setIsRegisterSuccess(true)
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        if (error.response.data?.username?.[0]) {
          setRegisterErrorUser(error.response.data.username[0]);
        } if (error.response.data?.email?.[0]) {
          setRegisterErrorEmail(error.response.data.email[0]);
        } if (error.response.data?.password1?.[0]) {
          setRegisterErrorMsgPassword1(error.response.data.password1[0]);
        } if (error.response.data?.password2?.[0]) {
          setRegisterErrorMsgPassword2(error.response.data.password2[0]);
        } if (error.response.data?.non_field_errors?.[0]) {
          setRegisterErrorMsgNonField(error.response.data.non_field_errors[0]);
        }
      }
      if(error.response && error.response.status === 500){
        setRegisterErrorEmail("Email has already been taken.")
      }
    }
  };
  return (
    <>
      <div className='register-container'>
        <div className="grid-auth-container">
          <div className={isRegisterSuccess ? 'auth-panel-alert' : "auth-panel"}>
            {registerSuccess ? <Alert variant="success">
              <p>{registerSuccess}</p>
            </Alert> : ""}
            <h2>Register</h2>
            <Form onSubmit={handleSubmit} className="p-4">
              <Form.Group className="mb-3 from-size-item" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={registerData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
                {registerErrorUser && <p className="error-msg">{registerErrorUser}</p>}
              </Form.Group>
              <Form.Group className="mb-3 from-size-item" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                {registerErrorEmail && <p className='error-msg'>{registerErrorEmail}</p>}
              </Form.Group>
              <Form.Group className="mb-3 from-size-item" controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password1"
                  value={registerData.password1}
                  onChange={handleChange}
                  placeholder='Password'
                />
                {(registerErrorPassword1 || registerErrorNonField) && (
                  <p className="error-msg">{registerErrorPassword1 || registerErrorNonField}</p>
                )}

              </Form.Group>
              <Form.Group className="mb-3 from-size-item" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password2"
                  value={registerData.password2}
                  onChange={handleChange}
                  placeholder='Confirm Password'
                />
                {(registerErrorPassword2 || registerErrorNonField) && (
                  <p className="error-msg">{registerErrorPassword2 || registerErrorNonField}</p>)}
              </Form.Group>

              <div className='btn-auth-container'>
                <button className="button-auth-submit" role="button">
                  Register
                </button>
              </div>
              <p className='register-link-title'>Already Registered?</p>
              <a className="register-link" href="/login">Login</a>
            </Form>
          </div>

        </div>

      </div>
    </>
  )
}

export default Register
