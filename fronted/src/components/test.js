import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './App.css'

const FileUpload = async() => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState({started: false, pc:0});
  const [userdata, setUserdata]= useState(null);
  const [msg, setMsg]= useState(null);



  const handleUpload= async()=>{
    if(!uploadedFile){
      console.log("not selected uploadedFile")
      return;
    }
  }

    const formData = new FormData();
    formData.append('file', uploadedFile);

    // const {
    //   title,
    //   comments,
    //   tags
    // } = userdata;

    setMsg("document uploading....")
    setUploadProgress(prevState=>{
      return {...prevState, started: true}
    })

    // const regInf = {
    //     title,
    //     file: formData,
    //     comments,
    //     tags
    //   }
      const result=await axios.post("/api/createMoments", formData, {
        onUploadProgress: (progressEvent)=> {setUploadProgress(prevState=>  {
          return {...prevState, pc: progressEvent.progress *100}})},
        headers: {
          "Customer-Header": "value", 
        }
      })

    // const res = await fetch("/api/createMoments", regInf);
    // const result = await res.json()
    console.log("result", result)
    setMsg("document uploaded Successfully....")


  return (
    <div>
      <div  className="app">
        <input type='file' onChange={(e)=>{setUploadedFile(e.target.files[0])}}/>
        <p>Drag & drop an image file here, or click to select one</p>
      </div>
      <button onClick={handleUpload}>Upload</button>

      {uploadProgress.started && < progress max="100" value={uploadProgress.pc}></progress>}
      {msg && <span>{msg}</span>}

      {/* {uploadedFile && (
        <div>
          <p>File: {uploadedFile.name}</p>
          <p>Progress: {uploadProgress}%</p>
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
        </div>
      )}  */}
    </div>
  );
};

export default FileUpload;
