import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/Logo";

function Navigation() {
  return (
    <Navbar expand="sm" className="navigation">
      <Container>
        <Navbar.Brand href="#home">
          <Logo />
          Hsl city bicycles
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="navigation__items">
            <Nav.Link href="/journey">Journeys</Nav.Link>
            <Nav.Link href="/station">Stations</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
