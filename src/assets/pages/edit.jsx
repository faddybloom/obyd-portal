import React, { useState } from 'react';
import { generateClient } from 'aws-amplify/data';
import { uploadData, getUrl } from 'aws-amplify/storage';
import { Schema } from '../../../amplify/data/resource';

const client = generateClient();

const edittutorial = ({Tutoriallisting, setEditTutorial}) => {
  const [title, setTitle] = useState(Tutoriallisting.title);
  const [description, setDescription] = useState(Tutoriallisting.description);
  const [youtubelink, setYouTubeLink] = useState(Tutoriallisting.youtubelink);
  const [storelink, setStoreLink] = useState(Tutoriallisting.storelink);
  const [bloglink, setBlogLink] = useState(Tutoriallisting.bloglink);
  const [imagelink, setImageLink] = useState(Tutoriallisting.imagelink);
  const [storepriority, setStorePriority] = useState(Tutoriallisting.storepriority);
  const [displayorder, setDisplayOrder] = useState(Tutoriallisting.displayorder);
  const [imagename, setImageName] = useState(Tutoriallisting.imagename);
  const [file, setFile] = useState(null);

  const editDoc = async ({id}) => {
    try {
      await client.models.Tutorial.update({
        id,
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
      window.location.reload();
    } catch (error) {
      console.error('Error updating tutorial:', error);
      alert('Failed to update tutorial');
    }
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
    <div>
      <div className="inputGpCard">
        <label> Title:</label>
        <input
          placeholder={Tutoriallisting.title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
        >
        </input>
      </div>
      <div className="inputGpCard">
        <label> Description:</label>
        <textarea
          placeholder={Tutoriallisting.description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
        />
      </div>
      <div className="inputGpCard">
        <label> YouTube Link:</label>
        <input
          placeholder={Tutoriallisting.youtubelink}
          onChange={(event) => {
            setYouTubeLink(event.target.value);
          }}
        />
      </div>
      <div className="inputGpCard">
        <label> Store Link:</label>
        <input
          placeholder="http..."
          defaultValue={Tutoriallisting.storelink}
          onChange={(event) => {
            setStoreLink(event.target.value);
          }}
        />
      </div>
      <div className="inputGpCard">
        <label> Blog Link:</label>
        <input
          placeholder="http..."
          defaultValue={Tutoriallisting.bloglink}
          onChange={(event) => {
            setBlogLink(event.target.value);
          }}
        />
      </div>
      <div className="inputGpCard">
        <label> Image Link:</label>
        <input className="uploadFile" type="file" onChange={handleFileChange} />
        <button className="uploadFileButton" onClick={uploadFile}>Upload</button>
      </div>
      <div className="inputGpCard">
        <label> Should the Store Link take Priority?:</label>
        <input
          placeholder="True or Empty"
          defaultValue={Tutoriallisting.storepriority}
          onChange={(event) => {
            setStorePriority(event.target.value);
          }}
        />
      </div>
      <div className="inputGpCard">
        <label> Sequence of the Display Order:</label>
        <input required type="number"
          placeholder="1..."
          defaultValue={Tutoriallisting.displayorder}
          onChange={(event) => {
            setDisplayOrder(event.target.valueAsNumber);
          }}
        />
      </div>
      <button onClick={() => {
        editDoc({id:Tutoriallisting.id})
        setEditTutorial(false)
      }}>Update</button>
    </div>
  )
}

export default edittutorial