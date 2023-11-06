import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, db, updateDoc, arrayRemove, arrayUnion } from "../../config/firebaseConfig"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Container, Image, Button, Alert, Row, Col } from "react-bootstrap"
import { formatDate } from "../../utils/utils"
import { IPhoto } from "../../types/types"

export const GalleryImagePage = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<IPhoto | null>(null)
    const [isHD, setIsHD] = useState<boolean>(false)
    const [deleting, setDeleting] = useState<boolean>(false)
    const { galleryID, imageID } = useParams()
    const user = useContext(AuthContext)
    const navigate = useNavigate()
    

    async function deletePhoto() {
        try {
            const docRef = doc(db, `users/${user!.uid}/galleries/${galleryID}`)
            const newPhoto = {...selectedPhoto}
            newPhoto.isDeleted = true
            await updateDoc(docRef, {
                photos: arrayRemove(selectedPhoto)
            })
            await updateDoc(docRef, {
                photos: arrayUnion(newPhoto)
            })
            navigate(`/space-image-app/galleries/${galleryID}`)
        } catch(e) {
            console.log(e)
        }
    }

    async function getImageData() {
        const docRef = doc(db, `users/${user!.uid}/galleries/${galleryID}`)
        const docSnap = await getDoc(docRef)
        setSelectedPhoto(docSnap.data()?.photos.filter((photo: IPhoto)=> photo.id === imageID)[0])
    }

useEffect(() => {
    getImageData()
}, [])
   
  return (
    <Container fluid className="pb-5">
        { deleting && 
            <Alert variant="danger" dismissible onClose={()=> setDeleting(false)}>
                <p>Delete this photo?</p>
                <Button variant="primary" type="button" onClick={deletePhoto}>Yes</Button>
                <Button variant="primary" type="button" onClick={()=> setDeleting(false)}>No</Button>
            </Alert>
        }
        <Row>
            <Col>
                <h2 className="text-light text-center">
                    {`${selectedPhoto?.title}: ${formatDate(selectedPhoto?.date)} `}
                </h2>
            </Col>
            <Col>
                <Button variant="light" type="button" onClick={()=> setIsHD(!isHD)}>{isHD ? "HD On" : "HD Off"} </Button>
            </Col>
        </Row>
        <Container>
            <Image src={isHD ? selectedPhoto?.hdurl : selectedPhoto?.url} className="w-100"/>
        </Container>
        <Container>
            <p className="text-light p-4">
                {selectedPhoto?.explanation}
            </p>
        </Container>
        <Container>
            <Button variant="light" type="button" onClick={()=> {navigate(`/space-image-app/galleries/${galleryID}`)}}>Return to gallery</Button>
            <Button variant="danger" type="button" onClick={()=> setDeleting(true)}>Delete image</Button>
        </Container>
    </Container>
  )
}
