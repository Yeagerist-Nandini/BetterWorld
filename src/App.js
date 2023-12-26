import Header from "./components/Header"
import Home from "./views/Home";
import {Routes,Route,BrowserRouter} from 'react-router-dom'
import Project from "./views/Project";
import React,{ useEffect, useState } from "react";
import { isWalletConnected, loadProjects } from "./services/blockchain";
import { ToastContainer } from "react-toastify";
 
function App() {
  const [loaded,setLoaded] = useState(false);

  useEffect( ()=>{
    const asyncFn=async()=>{
       await isWalletConnected();
       console.log('blockchain loaded');
       await loadProjects();
       setLoaded(true);  //if the blockchain is not loaded yet then we cant
       //load the Routes comp vrna contract load hone se phle hi comp run ho jayenge
    }

    asyncFn();
  },[]);
  
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>

      {loaded? (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<Project />} />
      </Routes>
      ) : null}

      <ToastContainer
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
      />
    </BrowserRouter>
    </div>
  );
}

export default App;
