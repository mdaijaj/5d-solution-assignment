import Errorpage from './error';
import {Route, Routes} from 'react-router-dom';
import HomePage from './home'
import TableData from './table';
import CreateAgent from './add_users'
import UpdateUser from './edit_user';
import { useEffect, useState } from 'react';
import Login from './login';
import Moments from './moment';
import FileUploadWithProgress from './test'
import MomentsList from './momentlist'

const Routing=()=>{
  // const [momentdata, setMomentdata]=useState([])


  // const allUserList = async () => {
  //   const response = await axios.get('/api/getagentList');
  //   let filterData = await response.data.data
  //   setMomentdata(filterData)
  // }

  
  // useEffect(()=>{
  //   allUserList()
  // }, [])


  return(
    <>
        <Routes>
          <Route exact path="/" element={<HomePage/>} />  
          <Route path="/user_list" element={<TableData/>} />  
          <Route path="/error" element={<Errorpage/>} />
          <Route path="/momensits_list" element={<MomentsList/>} />
          {/* <Route path="/momensits_list" element={<MomentsList data={momentdata}/>} /> */}
          <Route path="/signup" element={<CreateAgent/>} />
          <Route path="/signin" element={<Login/>} />
          <Route path="/ticket_create" element={<Moments/>} />
          <Route path="/test" element={<FileUploadWithProgress/>} />
          <Route path="/user_details_update/:id" element={<UpdateUser/>} />
        </Routes>
    </>
    )
}


export default Routing;