import Errorpage from './error';
import {Route, Routes} from 'react-router-dom';
import HomePage from './home'
import TableData from './table';
import AddUser from './add_users'
import UpdateUser from './edit_user';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './login';
import Moments from './moment';
import FileUploadWithProgress from './test'
import MomentsList from './momentlist'

const Routing=()=>{
  const [momentdata, setMomentdata]=useState([])


  const allUserList = async () => {
    const response = await axios.get('/api/getmomentsList');
    let filterData = await response.data.data
    setMomentdata(filterData)
  }

  
  useEffect(()=>{
    allUserList()
  }, [])


  return(
    <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />  
          <Route path="/user_list" element={<TableData/>} />  
          <Route path="/error" element={<Errorpage/>} />
          <Route path="/moments_list" element={<MomentsList data={momentdata}/>} />
          <Route path="/signup" element={<AddUser/>} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/moments" element={<Moments/>} />
          <Route path="/test" element={<FileUploadWithProgress/>} />
          <Route path="/user_details_update/:id" element={<UpdateUser/>} />
        </Routes>
    </>
    )
}


export default Routing;