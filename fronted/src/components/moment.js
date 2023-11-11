import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import './document.css';
import axios from "axios"
import { useDropzone } from 'react-dropzone';
import './App.css'


const Mmoments = () => {
  const [userdata, setUserdata] = useState();
  const navigate = useNavigate()
  const inputRef = useRef(null);
  const [handleFiles, setHandleFiles] = useState();
  const [dragActive, setDragActive] = useState(false);
  const uploadRef = useRef();
  const statusRef = useRef();
  const loadTotalRef = useRef();
  const progressRef = useRef();

  let name, value;
  function handleFile(files) {
    alert("Number of files: " + files.length);
  }

  // Handle file drop event
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      let mainarr = [];
      // at least one file has been dropped so do something
      if (e.dataTransfer.files) {
        console.log("file", e.dataTransfer.files)
        e.dataTransfer.files.FileList?.map((item) => {
          console.log("item", item)
          mainarr.push(item.name)
        });
        setHandleFiles(mainarr);
      }

    }
  };


  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);


  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles", acceptedFiles)
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    console.log("formData", formData)
    formData.append('file', file);

    setHandleFiles(formData)
    
    axios.post('/api/createMoments', formData, {
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

  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    console.log("target.file", e.target.files[0])
    if (e.target.files && e.target.files.length > 0) {

      // at least one file has been selected so do something
      setHandleFiles(e.target.files);
    } else {
      setHandleFiles([]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleInput = (e) => {
    name = e.target.name
    value = e.target.value
    console.log("candidate", userdata)
    setUserdata({ ...userdata, [name]: value })  //[] dynamic data for
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      comments,
      tags
    } = userdata;

    let baseurl = "http://localhost:5000/api/createMoments"
    const regInf = {
      method: "Post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        file: uploadedFile,
        comments,
        tags
      })
    }
    const res = await fetch("/api/createMoments", regInf);
    const result = await res.json()
    console.log("result", result)
    if (result.status === 400 || !result) {
      toast.info('Invalid user details', { autoClose: 1500 })
    }
    else {
      toast.success('new candidate add is successfully', { autoClose: 1500 })
    }
  }


  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {console.log("handleFiles", handleFiles)}
      <div className="main" style={{ backgroundColor: "#022238", width: "100%", height: "150px" }}>
        <div style={{ marginTop: "35px" }}>
          <img src="https://5d.solutions/wp-content/themes/5d/images/logo.svg" width="100" height="70"></img>
        </div>
      </div>
      <h1>Add new Moments</h1>

      <div className="container" style={{ marginTop: "10px" }}>
        <div className="mb-4 row">
          <div className="col-5 sm-4">
            <label for="formGroupExampleInput" class="form-label">Tittle </label>
            <input type="text"
              className="form-control"
              id="inputName"
              onChange={handleInput}
              name='title'
              placeholder="title" />
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-5 sm-4">
            <label for="formGroupExampleInput" class="form-label">Comments </label>
            <input type="text"
              className="form-control"
              id="inputName"
              onChange={handleInput}
              name='comments'
              placeholder="comments" />
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-5 sm-4">
            <label for="formGroupExampleInput" class="form-label">Tags</label>
            <input
              type="text"
              className="form-control"
              onChange={handleInput}
              name='tags'
              id="tags"
              placeholder="Enter tag..."
            />
          </div>
        </div>

        {/* <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <input ref={inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange} />
          <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : ""}>
            <div>
              <p>Drag and drop your file here</p>
              <h4>Or</h4>
              <button type="file" onChange={handleChange} className="btn btn-info" onClick={onButtonClick}>Upload a file</button>
            </div>
          </label>

          <p ref={statusRef}></p>
          <p ref={loadTotalRef}></p>

          {dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div>}
        </form> */}

        <div>
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} type="file" name="file"/>
            <p>Drag & drop an image file here, or click to select one</p>
          </div>
          {uploadedFile && (
            <div>
              <p>File: {uploadedFile.name}</p>
              <p>Progress: {uploadProgress}%</p>
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
            </div>
          )}
        </div><br/>

        <div className="mb-4 row">
          <div className="col-mdm-4">
            <button className="btn btn-info" onClick={handleSubmit} style={{ margin: "auto", width: "200px", borderRadius: "25px", height: "50px" }}>Submit</button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Mmoments;


