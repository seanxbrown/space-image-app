import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Homepage } from "./pages/Homepage/Homepage"
import { Login } from "./pages/Login/Login"
import { Signup } from "./pages/Signup/Signup"
import { Search } from "./pages/Search/Search"
import { Galleries } from "./pages/Galleries/Galleries"
import { Navigation } from "./components/Navigation/Navigation"

function App() {

  return (
    <Router>
        <div className="bg-info">
          <Navigation />
          <Routes>
            <Route path="/space-image-app" element={<Homepage />} />
            <Route path="/space-image-app/login" element={<Login />} />
            <Route path="/space-image-app/signup" element={<Signup />} />
            <Route path="/space-image-app/search" element={<Search />} />
            <Route path="/space-image-app/galleries" element={<Galleries />} />

          </Routes>
          

        </div>
      
    </Router>
  
  )
}

export default App
