import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "./document.css";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import "./App.css";

const SupportTicketCreate = () => {
  const [userdata, setUserdata] = useState();
  const navigate = useNavigate();
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
        console.log("file", e.dataTransfer.files);
        e.dataTransfer.files.FileList?.map((item) => {
          console.log("item", item);
          mainarr.push(item.name);
        });
        setHandleFiles(mainarr);
      }
    }
  };

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    console.log("acceptedFiles", acceptedFiles);
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    console.log("formData", formData);
    formData.append("file", file);

    setHandleFiles(formData);

    axios
      .post("/api/createMoments", formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          setUploadProgress(progress);
        },
      })
      .then((response) => {
        console.log(response.data);
        // Handle successful upload
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        // Handle upload error
      });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*", // specify accepted file types
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
    console.log("target.file", e.target.files[0]);
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
    name = e.target.name;
    value = e.target.value;
    setUserdata({ ...userdata, [name]: value }); //[] dynamic data for
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { topic, assignedTo, severity_level,ticket_type,status,description } = userdata;

    let baseurl = "http://localhost:5000/api/createSupportTicket";
    const regInf = {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic, assignedTo, severity_level,ticket_type,status,description
      }),
    };
    const res = await fetch("/api/createSupportTicket", regInf);
    const result = await res.json();
    console.log("result", result);
    if (result.status === 400 || !result) {
      toast.info("Invalid user details", { autoClose: 1500 });
    } else {
      toast.success("new candidate add is successfully", { autoClose: 1500 });
      navigate('/momensits_list')
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <div
        className="main"
        style={{ backgroundColor: "#022238", width: "100%", height: "150px" }}
      >
        <div style={{ marginTop: "35px" }}>
          <img
            src="https://5d.solutions/wp-content/themes/5d/images/logo.svg" alt="not found url"
            width="100"
            height="70"
          ></img>
        </div>
      </div>
      <h1>Support Ticket Create</h1>

      <div className="container" style={{ marginTop: "10px" }}>
        <div className="mb-6 row">
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Topic
            </label>
            <input
              type="text"
              className="form-control"
              id="topic"
              onChange={handleInput}
              name="topic"
              placeholder="topic"
            />
          </div>
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Assign To
            </label>
            <select
              className="form-select"
              id="assignedTo"
              onChange={handleInput}
              name="assignedTo"
              aria-label="select example"
            >
              <option value="Select">Select</option>
              <option value="Aman">Aman</option>
              <option value="Aijaj">Aijaj</option>
              <option value="Faiyaj">Faiyaj</option>
            </select>
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Severity Level
            </label>
            <select
              className="form-select"
              id="severity_level"
              onChange={handleInput}
              name="severity_level"
              aria-label="select example"
            >
              <option selected>1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="col-6 sm-4">
            <label for="formGroupExampleInput" class="form-label">
              Ticket Type{" "}
            </label>
            <select
              className="form-select"
              id="ticket_type"
              onChange={handleInput}
              name="ticket_type"
              aria-label="select example"
            >
              <option selected>Easy</option>
              <option value="Average">Average</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Very_Hard">Very Hard</option>
            </select>
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-12 md-4">
            <label for="formGroupExampleInput" class="form-label">
              Description
            </label>
            <textarea
              type="text"
              className="form-control"
              onChange={handleInput}
              name="description"
              id="description"
              placeholder="Enter description..."
            />
          </div>
        </div>

        <div className="mb-4 row">
          <div className="col-mdm-4">
            <button
              className="btn btn-info"
              onClick={handleSubmit}
              style={{
                margin: "auto",
                width: "100px",
                borderRadius: "15px",
                height: "50px",
              }}
            >
              Submit
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SupportTicketCreate;
