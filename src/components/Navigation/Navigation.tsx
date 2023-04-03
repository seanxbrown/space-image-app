import { Navbar, Nav, Container } from "react-bootstrap"

export const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark"  expand="lg">
        <Container fluid>
            <Navbar.Brand>Space Images</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav>
                    <Nav.Link href="/space-image-app/">Home</Nav.Link>
                    <Nav.Link href="/space-image-app/search">Search</Nav.Link>
                    <Nav.Link href="/space-image-app/galleries">Galleries</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
