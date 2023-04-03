import { Navbar, Nav, Container } from "react-bootstrap"

export const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg">
        <Container fluid>
            <Navbar.Brand className="text-light">Space Images</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav>
                    <Nav.Link className="text-light" href="/space-image-app/">Home</Nav.Link>
                    <Nav.Link className="text-light" href="/space-image-app/search">Search</Nav.Link>
                    <Nav.Link className="text-light" href="/space-image-app/galleries">Galleries</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
