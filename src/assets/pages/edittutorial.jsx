import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";

const edittutorial = ({isAuth}) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [youtubelink, setYouTubeLink] = useState("");
    const [storelink, setStoreLink] = useState("");
    const [bloglink, setBlogLink] = useState("");
    const [imagelink, setImageLink] = useState("");
    const [storepriority, setStorePriority] = useState("");
    const [displayorder, setDisplayOrder] = useState("");
  
    const tutorialsCollectionRef = collection(db, "tutorials");
    let navigate = useNavigate();

    const createTutorial = async () => {
        await addDoc(tutorialsCollectionRef, {
          title,
          description,
          youtubelink,
          storelink,
          bloglink,
          imagelink,
          storepriority,
          displayorder
        });
        navigate("/amend");
      };

    useEffect(() => {
    if (!isAuth) {
        navigate("/");
    }
    }, []);

    const cancel = () => {
      navigate("/amend");
    };

  return (
    <div className="container">
      <div className="cpContainer">
        <h1>Create A Tutorial Listing...</h1>
        <div className="inputGp">
          <label> Title:</label>
          <input
            placeholder="Title..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Description:</label>
          <textarea
            placeholder="Description..."
            onChange={(event) => {
              setDescription(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> YouTube Link:</label>
          <input
            placeholder="http..."
            onChange={(event) => {
              setYouTubeLink(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Store Link:</label>
          <input
            placeholder="http..."
            onChange={(event) => {
              setStoreLink(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Blog Link:</label>
          <input
            placeholder="http..."
            onChange={(event) => {
              setBlogLink(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Image Link:</label>
          <input
            placeholder="http..."
            onChange={(event) => {
              setImageLink(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Should the Store Link take Priority?:</label>
          <input
            placeholder="True or Empty"
            onChange={(event) => {
              setStorePriority(event.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label> Sequence of the Display Order:</label>
          <input required type="number"
            placeholder="1..."
            onChange={(event) => {
              setDisplayOrder(event.target.valueAsNumber);
            }}
          />
        </div>
        <button onClick={createTutorial}> Submit Post</button>
        <button onClick={cancel}>Cancel</button>
      </div>
    </div>
  )
}

export default edittutorial