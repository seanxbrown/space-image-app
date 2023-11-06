import { Container, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { auth, signInWithEmailAndPassword } from "../../config/firebaseConfig"
import { useRef, useContext, FormEvent } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export const Login = () => {

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const user = useContext(AuthContext)
  async function logUserIn(e: FormEvent) {
    e.preventDefault()
    if (user !== null) {
      alert("Error: are you already logged in?")
      return
    } else if (user === null) {
      try {
        await signInWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value)
        alert("Log in successful")
      } catch(e) {
        alert(e)
      }
    }
  }
  return (
    <Container fluid className="py-5 text-light bg-dark">
          <h2 className="text-center">Log In</h2>
          <Form className="w-75 mx-auto" onSubmit={logUserIn}>
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required type="email" placeholder="example@address.com" id="loginEmail" ref={emailRef}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" id="loginPassword" ref={passwordRef}></Form.Control>
              </Form.Group>
              <Button type="submit" disabled={user === null ? false : true} className="w-100 mt-5 rounded-pill">Log in</Button>
          </Form>
          <div className="d-flex flex-column">
            <p className="text-center text-muted">Don't have an account? <Link to="/space-image-app/signup">Sign up</Link></p>
            <p className="text-center align-self-center" id="passwordChange">Click here to reset your password</p>
          </div>
      </Container>
  )
}
