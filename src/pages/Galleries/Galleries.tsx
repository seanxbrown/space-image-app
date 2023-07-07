import { useState, useEffect, useContext } from 'react'
import { db, setDoc, doc, getDoc, collection, getDocs, addDoc } from "../../config/firebaseConfig"
import { AuthContext } from '../../contexts/AuthContext'
import { Button, Row, Col } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';

export const Galleries = () => {
  const [userGalleries, setUserGalleries] = useState<any>([])
  const user = useContext(AuthContext)

  async function getGalleries() {
    try {
      const galleriesFromDatabase = await getDocs(collection(db, "users", user!.uid, "galleries"))
      const newUserGalleries: Array<any> = [];
      galleriesFromDatabase.forEach(gallery => newUserGalleries.push(gallery.data()));
      console.log(newUserGalleries)
      setUserGalleries([...newUserGalleries])
    }
    catch(e) {
      console.error(e)
    }

  }

  async function createGallery() {
    const galleryRef = collection(db, "users", user!.uid, "galleries")

    await addDoc(galleryRef, {
      name: "Test Gallery Doc",
      id: uuidv4()
    })


  }

  useEffect(()=> {
    getGalleries()
  }, [])
  return (
    <div className="text-light">
      <Row>
        <Col>
          <h2>Galleries</h2>
        </Col>
        <Col>
          <Button variant="light" className="w-50" onClick={createGallery}>Create New Gallery</Button>
        </Col>
        
      </Row>
      
      {userGalleries && userGalleries.length === 0 ? "No galleries found" : "Galleries Found"}
    </div>
  )
}
