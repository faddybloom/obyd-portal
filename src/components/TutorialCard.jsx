import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditTutorials from '../assets/pages/edit';
import { generateClient } from 'aws-amplify/data';
import { remove } from 'aws-amplify/storage';


const client = generateClient({ authMode: 'userPool' });

const TutorialCard = ({Tutoriallisting}) => {
  let navigate = useNavigate();
  const [editTutorial, setEditTutorial] = useState(false);

  const deleteStorageObject = async (key) => {
    try {
      await remove({ key: `images/${key}` });
      console.log('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };  

  const deleteTutorial = async (id) => {
    const confirm = window.confirm(
      'Are you sure you want to delete this listing?'
    );
    if (!confirm) return;
    
    try {
      // Delete the tutorial from the database
      await client.models.Tutorial.delete({ id });
      
      // Delete the associated image if it exists
      if (Tutoriallisting.imagename) {
        await deleteStorageObject(Tutoriallisting.imagename);
      }
      
      window.location.reload();
    } catch (error) {
      console.error('Error deleting tutorial:', error);
      alert('Failed to delete tutorial');
    }
  };

  return (
    <>
      <div className="box">
        { Tutoriallisting.youtubelink && <iframe width="100%" height="268" src={Tutoriallisting.youtubelink} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> }
        { Tutoriallisting.imagelink && (Tutoriallisting.storepriority ? <a href={Tutoriallisting.storelink}><img height="268" src={Tutoriallisting.imagelink}/></a> : <a href={Tutoriallisting.bloglink}><img height="268" src={Tutoriallisting.imagelink}/></a>) }
        { Tutoriallisting.storepriority ? <a href={Tutoriallisting.storelink}><h3>{Tutoriallisting.title}</h3></a> : <a href={Tutoriallisting.bloglink}><h3>{Tutoriallisting.title}</h3></a> }
        <p>{Tutoriallisting.description}</p>
        <p>id: {Tutoriallisting.id}</p>
        <button className="deleteButton" 
          onClick={() => {
            deleteTutorial(Tutoriallisting.id);
        }}>
          &#128465;
        </button>
        <button className="updateButton" onClick={() => setEditTutorial(true)}>&#9998;</button>
        {editTutorial === true && <EditTutorials Tutoriallisting={Tutoriallisting} setEditTutorial={setEditTutorial}/>}
      </div>
    </>
  )
}

export default TutorialCard