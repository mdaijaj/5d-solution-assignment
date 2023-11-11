import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import "../App.css"


const Navbar = (props) => {
    const navigate = useNavigate()
    const cardata = localStorage.getItem("itemscart")
    console.log("cardata", cardata)


    const handleLogout = () => {
        localStorage.removeItem('user')
        navigate('/login')
    }


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="#">
                        <img src="https://5d.solutions/wp-content/themes/5d/images/logo.svg" width="100" height="70" className="d-inline-block align-top" alt="image path not found" />
                    </NavLink>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/user_list">User List</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/moments_list">Moments List </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to="/moments">Add Moments</NavLink>
                            </li>
                        </ul>
                        {!localStorage.getItem('user') ?

                            <form className='d-flex'>
                                <Link className='btn btn-dark mx-2' to="/signup" role="button">Signup</Link>
                                <Link className='btn btn-dark mx-2' to="/signin" role="button">Login</Link>
                            </form>
                            :
                            <>
                                <button onClick={handleLogout} className='btn btn-dark'>Logout</button>
                                <h4 style={{ padding: "40px" }}>{JSON.parse(localStorage.getItem('user')).first_name}</h4>
                                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4qV8A3FNxEQwtXcSJ4laIf9JsNt0A1dcMMqBCe4J8pbIB0Tn_Kzo5oeUxfD_aQjJHVY&usqp=CAU' style={{width: "80px", height: "80px", borderRadius: "50%"}}></img>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}



export default Navbar;
