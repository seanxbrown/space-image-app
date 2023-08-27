import { useParams } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { doc, getDoc, db } from "../../config/firebaseConfig"
import { AuthContext } from "../../contexts/AuthContext"
import { Row, Container } from "react-bootstrap"
import { GalleryImage } from "./GalleryImage"

export const Gallery = () => {
  const [currentGallery, setCurrentGallery] = useState<any>(null)
  const { galleryID } = useParams()
  const user = useContext(AuthContext)

  async function getGalleryData(id: any) {
    const docRef = doc(db, `users/${user!.uid}/galleries/${id}`)
    const docSnap = await getDoc(docRef)
    setCurrentGallery(docSnap.data())
  }
  
  useEffect(()=> {
    getGalleryData(galleryID)

  }, [])
  
  return (
    <div>
      <h2 className="text-light">{currentGallery?.name}</h2>
      <Container fluid>
        <Row xs={3} md={4} lg={9}>
          { currentGallery?.photos?.map((photo: any) => <GalleryImage photo={photo} />) }
        </Row>
      </Container>      
    </div>
  )
}

