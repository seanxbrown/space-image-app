import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc, db } from "../../config/firebaseConfig"
import { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { Container, Image, Button, Modal } from "react-bootstrap"
import { formatDate } from "../../utils/utils"

export const GalleryImagePage = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<any>({})
    const [isHD, setIsHD] = useState<boolean>(false)
    const { galleryID, imageID } = useParams()
    const user = useContext(AuthContext)
    const navigate = useNavigate()

    async function getImageData() {
        const docRef = doc(db, `users/${user!.uid}/galleries/${galleryID}`)
        const docSnap = await getDoc(docRef)
        
        setSelectedPhoto(docSnap.data()?.photos.filter((photo: any)=> photo.id === imageID)[0])
        
    }


useEffect(() => {
    getImageData()

}, [])

// 11th september: next step: create modals and functionality to delete individual images
    

  return (
    <Container fluid>
        <h2 className="text-light text-center">
            {`${selectedPhoto?.title}: ${formatDate(selectedPhoto?.date)} `}
        </h2>
        <Button variant="primary" type="button" onClick={()=> setIsHD(!isHD)}>Toggle HD</Button>
        <Container>
            <Image src={isHD ? selectedPhoto?.hdurl : selectedPhoto?.url} className="w-100"/>
        </Container>
        <Container>
            <p className="text-light p-4">
                {selectedPhoto?.explanation}
            </p>
        </Container>
        <Container>
            <Button variant="info" type="button" onClick={()=> {navigate(`/space-image-app/galleries/${galleryID}`)}}>Return to gallery</Button>
            <Button variant="danger" type="button">Delete image</Button>
        </Container>
    </Container>
  )
}
