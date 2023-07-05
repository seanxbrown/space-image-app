import { useState, useEffect, useContext } from 'react'
import { db, setDoc, doc, getDoc, collection, getDocs, addDoc } from "../../config/firebaseConfig"
import { AuthContext } from '../../contexts/AuthContext'
import { Button } from "react-bootstrap"

export const Galleries = () => {
  const [userGalleries, setUserGalleries] = useState([])
  const user = useContext(AuthContext)

  async function getGalleries() {

  }

  async function createGallery() {
    //for testing only

    /* 02/07/2023 - work out how to add data to a subcollection */


  }

  useEffect(()=> {
    getGalleries()
  }, [])
  return (
    <div className="text-light">
      <h2>Galleries</h2>
      {userGalleries && userGalleries.length === 0 ? "No galleries found" : "Galleries Found"}
      <Button variant="light" onClick={createGallery}>Create New Gallery</Button>
    </div>
  )
}
