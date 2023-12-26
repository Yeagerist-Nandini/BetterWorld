import React, { useEffect, useState } from 'react'
import ProjectDetail from '../components/ProjectDetail'
import ProjectBackers from '../components/ProjectBackers'
import UpdateProject from '../components/UpdateProject'
import BackProject from '../components/BackProject'
import DeleteProject from '../components/DeleteProject'
import { getBackers, loadProject } from '../services/blockchain'
import { useParams } from 'react-router-dom'
import { useGlobalState } from '../store'

 
function Project() {
  const {id} = useParams();
  const [project]=useGlobalState('project');
  const [loaded,setLoaded] = useState(false);
  const [backers] = useGlobalState('backers')
 
  useEffect(()=>{
    const func = async(id)=>{
      await loadProject(id);
      await getBackers(id);
      setLoaded(true);
      // console.log(project,backers);
    }

    func(id);
  },[id]); 
 
  return loaded ? (
    <div className=''>
      <ProjectDetail project={project}/>
      <UpdateProject project={project}/>
      <DeleteProject project={project}/>
      <BackProject project={project}/>
      <ProjectBackers backers={backers}/>
      
    </div>
  ) : null
} 

export default Project