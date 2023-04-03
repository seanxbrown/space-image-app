import { Link } from "react-router-dom"
import { Container, Row, Col } from "react-bootstrap"

export const Homepage = () => {
  return (
    <Container fluid className="text-light vh-100 d-flex justify-content-center align-items-center flex-column" id="homepage-hero">
      <h1 className="text-uppercase">Space Image Application</h1>
      <Row id="authOptions" className="text-center" xs={1}>
        <Col md={6}><Link to="/space-image-app/login" className="h5 text-decoration-none text-uppercase text-light">Log In</Link></Col>
        <Col md={6}><Link to="/space-image-app/signup" className="h5 text-decoration-none text-uppercase text-light">Sign Up</Link></Col>
        <Col md={12}><Link to="#" className="h5 text-decoration-none text-uppercase text-light">Continue as Guest</Link></Col>
      </Row>
      <p>Photo by Paul Volkmer on Unsplash</p>

        
    </Container>
  )
}
