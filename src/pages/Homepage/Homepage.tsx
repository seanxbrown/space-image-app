import { Link } from "react-router-dom"

export const Homepage = () => {
  return (
    <div>Homepage
        <Link to="/space-image-app/login">Login</Link>
        <Link to="/space-image-app/signup">Sign Up</Link>
        <Link to="/space-image-app/search">Search</Link>
        <Link to="/space-image-app/galleries">Galleries</Link>

    </div>
  )
}
