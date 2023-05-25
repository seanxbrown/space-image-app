import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Homepage } from "./pages/Homepage/Homepage"
import { Login } from "./pages/Login/Login"
import { Signup } from "./pages/Signup/Signup"
import { Search } from "./pages/Search/Search"
import { Galleries } from "./pages/Galleries/Galleries"
import { Navigation } from "./components/Navigation/Navigation"
import "./App.css"
import { useEffect, useState } from "react"
import { auth, onAuthStateChanged } from "./config/firebaseConfig"
import { AuthContext } from "./contexts/AuthContext"
import { PrivateRoute } from "./components/PrivateRoute"

function App() {
  const [user, setUser] = useState<Object | null>({})

  useEffect(()=> {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
    });
  }, [])

  return (
    <AuthContext.Provider value={user}>
      <Router>
        <div className="bg-dark min-vh-100">
          <Navigation />
            <Routes>
              <Route path="/space-image-app" element={<Homepage />} />
              <Route path="/space-image-app/login" element={<Login />} />
              <Route path="/space-image-app/signup" element={<Signup />} />
              <Route element={<PrivateRoute />}>
                <Route path="/space-image-app/search" element={<Search />} />
                <Route path="/space-image-app/galleries" element={<Galleries />} />
              </Route>
              
            </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
    
  
  )
}

export default App
