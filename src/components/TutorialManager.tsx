import { list, uploadData, remove } from '@aws-amplify/storage';
import { useEffect, useState, ChangeEvent } from 'react';

interface StorageFile {
  key: string;
}

export default function TutorialManager() {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const listFiles = async () => {
    try {
      const result = await list({});
      setFiles(result.items);
    } catch (error) {
      console.error('Error listing files:', error);
    }
  };

  const handleUpload = async () => {
    if (!uploadFile) return;
    try {
      await uploadData({
        key: uploadFile.name,
        data: uploadFile,
        options: {
          contentType: uploadFile.type,
        },
      }).result;
      setUploadFile(null);
      listFiles();
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleDelete = async (key: string) => {
    try {
      await remove({ key });
      listFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    listFiles();
  }, []);

  return (
    <div>
      <h2>Upload New Tutorial</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!uploadFile}>
        Upload
      </button>

      <h3>Your Uploads</h3>
      <ul>
        {files.map((file) => (
          <li key={file.key}>
            {file.key}
            <button onClick={() => handleDelete(file.key)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
