import './App.css';
import react, {useEffect, useState} from 'react';
import Navbar from './components/navbar'
import "./style.css";
import Sidebar from './components/sidebar'

const App=()=> {
  const [login, setLogin]= useState("")

  useEffect(()=>{
    let userInf= localStorage.getItem('user')
    userInf= JSON.parse(userInf)
    setLogin(userInf)
}, [])  


  return (
    <>
    <div className="App">
      <Navbar login={login}/>
      <Sidebar />
    </div>
    </>
  );
}

export default App;
