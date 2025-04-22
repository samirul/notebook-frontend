import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

const Login = () => {

  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', loginData);
  };
  return (
    <>
      <div className='container'>
        <div className="grid-auth-container">
          <div className='login-panel'>
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
            <a className="register-link" href="#">Register</a>
            </Form>
          </div>

        </div>

      </div>
    </>
  )
}

export default Login
