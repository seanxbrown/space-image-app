import { Container, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Login = () => {
  return (
    <Container fluid className="py-5 text-light bg-dark">
          <h2 className="text-center">Log In</h2>
          <Form className="w-75 mx-auto">
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required type="email" placeholder="example@address.com" id="loginEmail"></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" id="loginPassword"></Form.Control>
              </Form.Group>
              <Button type="submit" className="w-100 mt-5 rounded-pill">Log in</Button>
          </Form>
          <div className="d-flex flex-column">
            <p className="text-center text-muted">Don't have an account? <Link to="/space-image-app/signup">Sign up</Link></p>
            <p className="text-center align-self-center" id="passwordChange">Click here to reset your password</p>
          </div>
      </Container>
  )
}
