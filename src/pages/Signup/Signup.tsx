import { Container, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { auth, createUserWithEmailAndPassword, db, collection, addDoc } from "../../config/firebaseConfig"
import { FormEvent, useRef, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"

export const Signup = () => {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const user = useContext(AuthContext)
    
    async function createUserAccount(e: FormEvent) {
        e.preventDefault()

        if (passwordRef.current!.value !== passwordConRef.current!.value) {
            alert("Password details do not match")

        } else {
            try {
                await createUserWithEmailAndPassword(auth, emailRef.current!.value, passwordRef.current!.value)
                await addUserToDB()
                alert("Account created successfully");
                
                emailRef.current!.value = "";
                passwordRef.current!.value = "";
                passwordConRef.current!.value = "";
                usernameRef.current!.value = "";
              
            } catch(e){
                alert(e)
            }
    
        }
        
    }

    async function addUserToDB() {
        try {
            await addDoc(collection(db, `users/${name}`), {
                    name: usernameRef.current!.value,
                    email: emailRef.current!.value,
                }) 

        } catch(e) {
            alert(e)
        }
    }
  return (
    <Container fluid className="py-5 text-light bg-dark" id="signupContainer">
          <h2 className="text-center">Sign Up</h2>
          <Form className="w-75 mx-auto" onSubmit={createUserAccount}>
            <Form.Group>
                  <Form.Label>Username</Form.Label>
                  <Form.Control required type="text" placeholder="AwesomeUser" maxLength="20" id="signupName" ref={usernameRef}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control required type="email" placeholder="example@address.com" id="signupEmail" ref={emailRef}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control required type="password" id="signupPassword" ref={passwordRef}></Form.Control>
              </Form.Group>
              <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control required type="password" id="signupPasswordConf" ref={passwordConRef}></Form.Control>
              </Form.Group>
              <Button disabled={user ? true : false} type="submit" className="w-100 mt-5 rounded-pill">Create Account</Button>
          </Form>
          <p className="text-center text-muted">Already have an account? <Link to="/space-image-app/login">Log in</Link></p>
      </Container>
  )
}
