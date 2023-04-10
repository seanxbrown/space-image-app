import { Navbar, Nav, Container } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { auth, signOut } from "../../config/firebaseConfig"

export const Navigation = () => {

  const user = useContext(AuthContext)

  async function signUserOut() {

    if (user !== null) {
      try {
        await signOut(auth)
        alert("Signed out successfully")
      } catch(e) {
        alert(e)
      }

    }

  }

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
                { user && <Navbar.Text onClick={signUserOut}>Log Out</Navbar.Text>}
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
