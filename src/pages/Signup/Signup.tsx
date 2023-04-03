import { Container, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"

export const Signup = () => {
  return (
    <Container fluid className="py-5 text-light bg-dark" id="signupContainer">
          <h2 className="text-center">Sign Up</h2>
          <Form className="w-75 mx-auto">
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required type="email" placeholder="example@address.com" id="signupEmail"></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" id="signupPassword"></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control required type="password" id="signupPasswordConf"></Form.Control>
              </Form.Group>
              <Button type="submit" className="w-100 mt-5 rounded-pill">Create Account</Button>
          </Form>
          <p className="text-center text-muted">Already have an account? <Link to="/space-image-app/login">Log in</Link></p>
      </Container>
  )
}
