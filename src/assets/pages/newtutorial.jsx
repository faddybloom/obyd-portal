import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { generateClient } from 'aws-amplify/data';
import { uploadData, getUrl } from 'aws-amplify/storage';

const client = generateClient({ authMode: 'userPool' });

const newtutorial = ({isAuth}) => {
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [youtubelink, setYouTubeLink] = useState("");
  const [storelink, setStoreLink] = useState("");
  const [bloglink, setBlogLink] = useState("");
  const [imagelink, setImageLink] = useState("");
  const [storepriority, setStorePriority] = useState("");
  const [displayorder, setDisplayOrder] = useState("");
  const [imagename, setImageName] = useState("");
  const [file, setFile] = useState(null);
  
  let navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const createTutorial = async () => {
    try {
      await client.models.Tutorial.create({
        title,
        description,
        youtubelink,
        storelink,
        bloglink,
        imagelink,
        storepriority,
        displayorder,
        imagename
      });
      navigate("/amend");
    } catch (error) {
      console.error("Error creating tutorial:", error);
      alert("Failed to create tutorial");
    }
  };

  const cancel = () => {
    navigate("/amend");
  };

  // Function to upload file to Amplify Storage
  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    try {
      // Upload file to Amplify Storage
      const result = await uploadData({
        key: `images/${file.name}`,
        data: file,
        options: {
          contentType: file.type,
        }
      }).result;

      // Get the URL for the uploaded file
      const { url } = await getUrl({
        key: `images/${file.name}`,
      });

      setImageLink(url);
      setImageName(file.name);
      alert("File uploaded successfully.");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file");
    }
  };

  // Function to handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
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
          <input className="uploadFile" type="file" onChange={handleFileChange} />
          <button className="uploadFileButton" onClick={uploadFile}>Upload</button>
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

export default newtutorial