import React ,{ useEffect } from "react";
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import CreateProject from '../components/CreateProject'
import AddButton from '../components/AddButton'
import { useGlobalState } from '../store'
import { loadProjects } from '../services/blockchain'

function Home() {
  const [projects] = useGlobalState('projects');
  const func= async()=>{
    await loadProjects();
  }

  // useEffect=( ()=>{
  //   func();
  // },[projects]);
 
  return (
    <>
    <Hero/>
    <Projects projects={projects}/>
    <CreateProject/>
    <AddButton/>
    </>
  )
}

export default Home