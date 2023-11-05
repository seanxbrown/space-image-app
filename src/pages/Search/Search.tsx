import { Container, Button, ButtonGroup, Spinner, Row, Col } from "react-bootstrap"
import { useState, useContext, useEffect, Suspense } from "react"
import { Photo } from "./Photo"
import { GalleryModal } from '../../components/GalleryModal';
import { db, setDoc, doc, getDoc, collection, getDocs, addDoc, updateDoc, arrayUnion, arrayRemove } from "../../config/firebaseConfig"
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../contexts/AuthContext";
import { IPhoto } from "../../types/types";

export const Search = () => {

  const [photos, setPhotos] = useState<IPhoto[] | undefined>([])
  const [addingImage, setAddingImage] = useState<boolean>(false)
  const [userGalleries, setUserGalleries] = useState<any>([])
  const [loading, setLoading] = useState<boolean>(false)
  const user = useContext(AuthContext)

  async function getRandomImage() {
    

    try {
      setLoading(true)
      const data = await fetch(`https://api.nasa.gov/planetary/apod?count=1&api_key=${import.meta.env.VITE_API_KEY}`)
      const photoData = await data.json()
      setPhotos(photoData)

    } catch(e) {
      alert(e)
    }
    setLoading(false)

  }

  async function getTodaysImage() {

    const date = new Date().toJSON().slice(0,10)

    try {
      setLoading(true)
      const data = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_API_KEY}`)
      const photoData = await data.json()
      setPhotos([photoData])

    } catch(e) {
      alert(e)
    }
    setLoading(false)
    
  }

  function openGalleryModal() {

    if(photos && photos.length < 1) {return}
    setAddingImage(true)
  }

  function closeGalleryModal() {
    setAddingImage(false)
  }

  async function addToGallery(name: string, galleryID?: string) {

    //Alert if no gallery chosen

    if(name === "" && galleryID === "none-selected") {
      alert("No gallery selected")
      return
    }

    //Alert if both fields selected

    if(name !== "" && galleryID !== "none-selected") {
      alert("Select either a new gallery or an existing gallery")
      return
    }

    //Alert if gallery name already exists

    for (let userGallery of userGalleries) {
      if(name === userGallery.name && !userGallery.isDeleted) {
        alert("Gallery with that name already exists")
        return
      }
    }


    //User has selected an existing gallery

    if(name === "" && galleryID !== "none-selected") {
      try {
        const galleryRef = doc(db, "users", user!.uid, "galleries", galleryID!)

        if(photos) {
          photos[0].id = uuidv4()
          photos[0].isDeleted = false
          await updateDoc(galleryRef, {
            photos: arrayUnion(photos[0])
          })
        }
      } catch(e){
        console.log(e)
      }
      
    }

    //User is adding photo to a new gallery
    
    else {
      try {
        const newGalleryID = uuidv4()
        photos![0].id = uuidv4()
        photos![0].isDeleted = false
        await setDoc(doc(db, `users/${user!.uid}/galleries`,newGalleryID), {
          name: name,
          id: newGalleryID,
          date: new Date(),
          photos: arrayUnion(photos![0]),
          isDeleted: false

        })
        
      } catch(e) {
        alert(e)
        console.log(e)
      }
        
      }
      closeGalleryModal()
  }

  async function getGalleries() {
    try {
      const galleriesFromDatabase = await getDocs(collection(db, "users", user!.uid, "galleries"))
      const newUserGalleries: Array<any> = [];
      galleriesFromDatabase.forEach(gallery => newUserGalleries.push(gallery.data()));
      setUserGalleries([...newUserGalleries])
    }
    catch(e) {
      console.error(e)
    }

  }

  useEffect(()=> {
    getGalleries()
  }, [])



  return (
    <Container className="pb-5">
      <Row>
        <Col> <h2 className="text-light">Search</h2> </Col>
        <Col>
        <ButtonGroup id="search-button-container" className="m-auto">
        <Button variant="light" onClick={getRandomImage}>Random Image</Button>
        <Button className=" ms-1" variant="light" onClick={getTodaysImage}>Today's Image</Button>
      </ButtonGroup>
        </Col>
      </Row>
      
      
      {addingImage ? <GalleryModal creatingGallery={addingImage} closeModal={closeGalleryModal} submitFunction={addToGallery} page="search" galleries={userGalleries} photos={photos}/> : null }

      <Container id="search-results">
        {loading ? <Spinner animation="border" role="status" variant="secondary"/> : photos && photos.map((photo: IPhoto) => {
          return <Photo imgObject={photo} />
        })}
      </Container>
      
      { photos!.length > 0  && <Button variant="light" onClick={openGalleryModal}>Add to Gallery</Button> }

    </Container>
  )
}
