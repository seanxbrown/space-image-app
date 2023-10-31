import { Navbar, Nav, Container } from "react-bootstrap"
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { auth, signOut } from "../../config/firebaseConfig"
import { Link } from "react-router-dom"

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
    <Navbar variant="dark" expand="lg" id="navbar">
        <Container fluid>
            <Navbar.Brand>Space Images</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav">
                <Nav>
                    <Link className="nav-link" to="/space-image-app/">Home</Link>
                    <Link className="nav-link" to="/space-image-app/search">Search</Link>
                    <Link className="nav-link" to="/space-image-app/galleries">Galleries</Link>
                </Nav>
                { user && <Navbar.Text onClick={signUserOut}>Log Out</Navbar.Text>}
            </Navbar.Collapse>
        </Container>
    </Navbar>
  )
}
