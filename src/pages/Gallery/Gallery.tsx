import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { doc, getDoc, db, updateDoc } from "../../config/firebaseConfig"
import { AuthContext } from "../../contexts/AuthContext"
import { Row, Container, Button, Col, Alert, ButtonGroup } from "react-bootstrap"
import { GalleryImage } from "./GalleryImage"

export const Gallery = () => {
  const [currentGallery, setCurrentGallery] = useState<any>(null)
  const [deletingGallery, setDeletingGallery] = useState<boolean>(false)
  const { galleryID } = useParams()
  const user = useContext(AuthContext)
  const navigate = useNavigate()

  async function getGalleryData(id: any) {
    const docRef = doc(db, `users/${user!.uid}/galleries/${id}`)
    const docSnap = await getDoc(docRef)
    setCurrentGallery(docSnap.data())
  }

  async function deleteGallery(galleryID: string) {
    try {
      const docRef = doc(db, `users/${user!.uid}/galleries/${galleryID}`)
      await updateDoc(docRef, {
        isDeleted: true
      })

    } catch(e) {
      alert(e)
    }
    setDeletingGallery(false)
    navigate("/space-image-app/galleries")
  }
  
  useEffect(()=> {
    getGalleryData(galleryID)

  }, [])
  
  return (
    <div>
      {deletingGallery && 
      <Alert dismissible variant="danger" className="w-75 m-auto" onClose={()=> setDeletingGallery(false)}>
        <p className="text-center">Delete this gallery?</p>
        <div className="w-100 text-center">
          <Button variant="danger" className="me-4" onClick={() => deleteGallery(currentGallery.id)}>Yes</Button>
          <Button variant="primary" onClick={()=> setDeletingGallery(false)}>No</Button>
        </div>
      </Alert> }
      <Row id="gallery-header">
        <Col xs={8}>
          <h2 className="text-light">{currentGallery?.name}</h2>
        </Col>
        <Col xs={4}>
          <Button type="button" className="btn btn-danger" onClick={()=> setDeletingGallery(true)}>Delete Gallery</Button>
        </Col>
      </Row>
      <Container fluid>
        <Row xs={3} md={4} lg={9}>
          { currentGallery?.photos?.map((photo: any) => <GalleryImage photo={photo} />) }
        </Row>
      </Container>      
    </div>
  )
}

