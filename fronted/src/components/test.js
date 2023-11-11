import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css'

const FileUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);


  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append('file', file);


    axios.post('/api/upload', formData, {
      onUploadProgress: (progressEvent) => {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        setUploadProgress(progress);
      },
    })
      .then((response) => {
        console.log(response.data);
        // Handle successful upload
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        // Handle upload error
      });
  }, []);

  
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*', // specify accepted file types
    multiple: false, // allow only one file to be uploaded
  });

  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop an image file here, or click to select one</p>
      </div>
      {uploadedFile && (
        <div>
          <p>File: {uploadedFile.name}</p>
          <p>Progress: {uploadProgress}%</p>
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
