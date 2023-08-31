import { useState, useEffect, useContext } from 'react'
import { db, setDoc, doc, getDoc, collection, getDocs, addDoc } from "../../config/firebaseConfig"
import { AuthContext } from '../../contexts/AuthContext'
import { Button, Row, Col, ListGroup } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import { GalleryModal } from '../../components/GalleryModal';
import { Link } from "react-router-dom"

export const Galleries = () => {
  const [userGalleries, setUserGalleries] = useState<any>([])
  const [creatingGallery, setCreatingGallery] = useState<boolean>(false)
  const user = useContext(AuthContext)

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

  function openGalleryModal() {
    setCreatingGallery(true)
  }

  function closeGalleryModal() {
    setCreatingGallery(false)
  }

  async function createGallery(name: string) {

    if (name === "") {
      alert("Enter a gallery name")
       return
      } 
    
      for (let existingGallery of userGalleries) {
        if (existingGallery.name === name && !existingGallery.isDeleted) {
          alert("Gallery with that name already exists")
          return
        }
      }
      
      const galleryID = uuidv4()
      await setDoc(doc(db, `users/${user!.uid}/galleries`, galleryID), {
        name: name,
        id: galleryID,
        photos: [],
        isDeleted: false

      })
  
    closeGalleryModal()
      getGalleries()
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
          <Button variant="light" className="w-50" onClick={openGalleryModal}>Create New Gallery</Button>
        </Col>
      </Row>
      {creatingGallery ? <GalleryModal creatingGallery={creatingGallery} closeModal={closeGalleryModal} submitFunction={createGallery} page="gallery" galleries={userGalleries} /> : null }
      <ListGroup variant="flush" >
        {userGalleries && userGalleries.length === 0 ? "No galleries found" : userGalleries.sort((a: any, b: any) => a.date < b.date)
        .map(
          (gallery: any) => {
            if(!gallery.isDeleted) {
              return <ListGroup.Item action variant="light"><Link to={`${gallery.id}`}>{gallery.name}</Link> </ListGroup.Item>
            }
          }
        )}
      </ListGroup>
      
    </div>
  )
}
