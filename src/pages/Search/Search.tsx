import { Container, Button, ButtonGroup } from "react-bootstrap"
import { useState, useContext, useEffect } from "react"
import { Photo } from "./Photo"
import { GalleryModal } from '../../components/GalleryModal';
import { db, setDoc, doc, getDoc, collection, getDocs, addDoc, updateDoc, arrayUnion, arrayRemove } from "../../config/firebaseConfig"
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from "../../contexts/AuthContext";

export const Search = () => {

  const [photos, setPhotos] = useState<unknown[] | undefined>([])
  const [addingImage, setAddingImage] = useState<boolean>(false)
  const [userGalleries, setUserGalleries] = useState<any>([])
  const user = useContext(AuthContext)

  async function getRandomImage() {

    try {

      const data = await fetch(`https://api.nasa.gov/planetary/apod?count=1&api_key=${import.meta.env.VITE_API_KEY}`)

      const photoData = await data.json()

      setPhotos(photoData)

    } catch(e) {
      alert(e)
    }

  }

  async function getTodaysImage() {

    const date = new Date().toJSON().slice(0,10)

    try {
      const data = await fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${import.meta.env.VITE_API_KEY}`)
      const photoData = await data.json()

      setPhotos([photoData])
    } catch(e) {
      alert(e)
    }
    
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
        console.log("First function triggered")
        const galleryRef = doc(db, "users", user!.uid, "galleries", galleryID!)

        if(photos) {
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
    <Container>
      <h2 className="text-light">Search</h2>
      <ButtonGroup id="search-button-container" className="m-auto">
        <Button className="btn btn-primary" role="button" onClick={getRandomImage}>Random Image</Button>
        <Button className="btn btn-primary ms-1" role="button" onClick={getTodaysImage}>Today's Image</Button>
      </ButtonGroup>
      {addingImage ? <GalleryModal creatingGallery={addingImage} closeModal={closeGalleryModal} submitFunction={addToGallery} page="search" galleries={userGalleries} photos={photos}/> : null }

      <Container id="search-results">
        {photos && photos.map((photo: any) => {
          return <Photo imgObject={photo} />
        })}
      </Container>
      { photos!.length > 0  && <Button type="button" className="btn btn-primary" onClick={openGalleryModal}>Add to Gallery</Button> }

    </Container>
  )
}
