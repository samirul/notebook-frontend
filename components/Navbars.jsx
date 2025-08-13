import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toggle } from '../components/Toggle';
import { CheckUser } from './CheckUser';
import axios from 'axios';
import Cookies from 'js-cookie';

const Navbars = ({ value, handleChange }) => {
  const [user, setUser] = useState([])

  const getUser = async () => {
    try {
      const response = await CheckUser()
      if (response?.data && response?.status === 200) {
        setUser(response?.data?.user)
      }
    } catch (error) { }
  }
  useEffect(() => {
    getUser();
  }, [])
  const handleLogout = async () => {
    try {
      const response = await CheckUser()
      if (response?.data && response?.status === 200) {
        try {
          await axios.post("http://localhost:8000/api/auth/logout/", {
            headers: {
              'X-CSRFToken': Cookies.get('csrftoken'),
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }
          }, { withCredentials: true });
          window.location.replace("/login");
        } catch (error) {
          if (error.status === 401) {
            window.location.replace("/login");
          }
        }
      }
    } catch (error) {
      if (error.status === 401) {
        window.location.replace("/login");
      }
    }
  }
  return (
    <>
      <div>
        <Navbar expand="lg" className="nav-bg-color" data-bs-theme={value ? "dark" : "light"}>
          <Container>
            <Navbar.Brand className='notebook-home' href="/">MyNotebook</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="nav-bar-link me-auto justify-content-end flex-grow-1">
                <Nav.Link className='navlink-text-notes' href="/notes">Notes</Nav.Link>
                {user?.id ? <Nav.Link className='navlink-text-login' type='button' onClick={handleLogout}>Logout</Nav.Link> :
                  <Nav.Link className='navlink-text-login' href="/login">Login</Nav.Link>}
                <Toggle isChecked={value} handleChange={handleChange} />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  )
}

export default Navbars
