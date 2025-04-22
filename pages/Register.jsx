import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';

const Register = () => {
  const [loginData, setLoginData] = useState({ username: '', email: '', password: '', confirm_password: '' });

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
          <div className='auth-panel'>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit} className="p-4">
              <Form.Group className="mb-3 from-size-item" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  value={loginData.username}
                  onChange={handleChange}
                  placeholder="Username"
                />
              </Form.Group>
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
              <Form.Group className="mb-3 from-size-item" controlId="formConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirm_password"
                  value={loginData.confirm_password}
                  onChange={handleChange}
                  placeholder='Confirm Password'
                />
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
