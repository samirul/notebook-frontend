import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Toggle} from '../components/Toggle';

const Navbars = ({value, handleChange}) => {
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
                <Nav.Link className='navlink-text-login' href="/login">Login</Nav.Link>
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
