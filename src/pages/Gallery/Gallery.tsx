import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { doc, getDoc, db, updateDoc } from "../../config/firebaseConfig"
import { AuthContext } from "../../contexts/AuthContext"
import { Row, Container, Button, Col, Alert } from "react-bootstrap"
import { GalleryImage } from "./GalleryImage"
import { GalleryImageDetail } from "./GalleryImageDetail"

export const Gallery = () => {
  const [currentGallery, setCurrentGallery] = useState<any>(null)
  const [deletingGallery, setDeletingGallery] = useState<boolean>(false)
  const [inHD, setInHD] = useState<boolean>(false)
  const [viewImageDetail, setViewImageDetail] = useState<boolean>(false)
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null)
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

  function selectPhoto(id: string) {
    const result = currentGallery.photos.filter((galleryImage: any) => galleryImage.id === id)
    setSelectedPhoto(result[0])
    setViewImageDetail(true)

  }

  function closeImageDetail() {
    setViewImageDetail(false)
  }
  
  useEffect(()=> {
    getGalleryData(galleryID)

  }, [])
  
  return (
    <div>
      { deletingGallery && 
      <Alert dismissible variant="danger" className="w-75 m-auto" onClose={()=> setDeletingGallery(false)}>
        <p className="text-center">Delete this gallery?</p>
        <div className="w-100 text-center">
          <Button variant="danger" className="me-4" onClick={() => deleteGallery(currentGallery.id)}>Yes</Button>
          <Button variant="primary" onClick={()=> setDeletingGallery(false)}>No</Button>
        </div>
      </Alert> }

      <Row id="gallery-header">
        <Col xs={6}>
          <h2 className="text-light">{currentGallery?.name}</h2>
        </Col>
        <Col xs={3}>
          <Button type="button" className="btn btn-danger" onClick={()=> setDeletingGallery(true)}>Delete Gallery</Button>
        </Col>
        <Col xs={3}>
          <Button type="button" className="btn btn-primary" onClick={()=> setInHD(!inHD)}>{inHD ? "HD Mode On" : "HD Mode Off" }</Button>
        </Col>
      </Row>

      <Container fluid>
        <Row xs={3} md={4} lg={9}>
          { currentGallery?.photos?.map((photo: any) => <GalleryImage photo={photo} inHD={inHD} selectPhoto={selectPhoto} />) }
        </Row>
      </Container>
      
      { viewImageDetail && <GalleryImageDetail photo={selectedPhoto} show={viewImageDetail} closeImageDetail={closeImageDetail} />}

    </div>
  )
}

