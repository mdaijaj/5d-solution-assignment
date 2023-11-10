import { useState } from "react";
import {useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const AddUser = () => {
    const [userdata, setUserdata] = useState();
    const navigate = useNavigate()
    let name, value;


    const handleInput = (e) => {
        name = e.target.name
        value = e.target.value
        setUserdata({ ...userdata, [name]: value })  //[] dynamic data for
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {
            first_name,
            last_name,
            email,
            mobile,
            password,
            city,
            country
        } = userdata;

        let baseurl = "http://localhost:5000/api/createuserdetails"
        const regInf = {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                mobile,
                password,
                city,
                country
            })
        }
        const res = await fetch(baseurl, regInf);
        const result = await res.json()
        console.log("result", result)
        if (result.status === 400 || !result) {
            toast.info('Invalid user details', { autoClose: 1500 })
        }
        else {
            toast.success('new candidate add is successfully', { autoClose: 1500 })
            navigate('/signin')
        }
    }


    return (
        <div style={{display: "flex", flexDirection: "column", width: "100%"}}>
            <div className="main" style={{backgroundColor: "#022238", width: "100%", height: "150px"}}>
            <div style={{marginTop: "35px"}}>
            <img src="https://5d.solutions/wp-content/themes/5d/images/logo.svg" width="100" height="70"></img>
            </div>
            </div>
            <h1>Signup</h1>
           {/* <Navbar/> */}
            
            <div className="container" style={{ marginTop: "10px" }}>
                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">First Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='first_name'
                            placeholder="first_name" />
                    </div>
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Last Name</label>
                        <input type="text"
                            className="form-control"
                            id="inputName"
                            onChange={handleInput}
                            name='last_name'
                            placeholder="last_name" />
                    </div>
                </div>

                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Email</label>

                        <input
                            type="text"
                            className="form-control"
                            onChange={handleInput}
                            name='email'
                            id="email"
                            placeholder="Enter email..."
                        />
                    </div>
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Mobile Number</label>

                        <input type="number"
                            className="form-control"
                            id="mobile"
                            onChange={handleInput}
                            name='mobile'
                            placeholder="Mobile*" />
                    </div>
                </div>
                <div className="mb-4 row">
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">City</label>

                        <select className="form-control" id="inputGroupSelect01" onChange={handleInput} name="city" aria-label="select example">
                            <option selected>City</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Pune">Pune</option>
                            <option value="Banglore">Banglore</option>
                        </select>
                    </div>
                    <div className="col-5 sm-4">
                    <label for="formGroupExampleInput" class="form-label">Password</label>

                        <input type="password"
                            className="form-control"
                            name="password"
                            onChange={handleInput}
                            id="password"
                            placeholder="password" />
                    </div>

                </div>

                <div className="mb-2 row">
                    <div className="col-mdm-2">
                        <button className="btn btn-info" onClick={handleSubmit} style={{ margin: "auto", width: "200px", borderRadius: "25px", height: "50px"}}>Submit</button>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    )
}

export default AddUser;


