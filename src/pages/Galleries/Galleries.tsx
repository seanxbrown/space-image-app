import { useState, useEffect, useContext } from 'react'
import { db, setDoc, doc, getDoc, collection, getDocs, addDoc } from "../../config/firebaseConfig"
import { AuthContext } from '../../contexts/AuthContext'
import { Button, Row, Col } from "react-bootstrap"
import { v4 as uuidv4 } from 'uuid';
import { GalleryModal } from '../../components/GalleryModal';

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
    const galleryRef = collection(db, "users", user!.uid, "galleries")

    if (name === null || name === undefined) {
       return 
      } else {
        const galleryID = uuidv4()
        await setDoc(doc(db, `users/${user!.uid}/galleries`, galleryID), {
          name: name,
          id: galleryID,
          photos: []

        })
      }
      console.log(galleryRef.id)
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
      {userGalleries && userGalleries.length === 0 ? "No galleries found" : userGalleries.sort((a: any, b: any) => a.date < b.date)
      .map(
        (gallery: any) => <p>{gallery.name}</p>
      )}
    </div>
  )
}
