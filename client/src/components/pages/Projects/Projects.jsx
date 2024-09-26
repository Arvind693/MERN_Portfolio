import React, { useEffect, useState } from 'react';
import './Projects.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
const Projects = () => {
  const [projects,setProjects]=useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get('http://localhost:5000/api/portfolio/get-portfolio-data');
                setProjects(response.data.project)
            } catch (error) {
                
            }
        }
        fetchData();
    },[])
  
  return (
    <div className='projects-container' id='project'>
      <h2 className='projects-heading'>Top Recent Projects </h2>
      <hr />
      <p className='projects-caption'>
        Responsive web apps built using React, Node.js, and MongoDB, designed to streamline task management
        with real-time updates, with live demo and source code available.
      </p>
      {/* card design */}
      <div className="projects-grid">
        {projects.map((project, index) => (
          <div className="project-card">
            <img src={`http://localhost:5000/projectsThumbnail/${project.thumbnail}`}alt="project_img" className='project-image' />
            <div className="project-details">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>
              <p className="project-technologies">
                <strong>Technologies:</strong> <em>{project.technologies}</em>
              </p>
              <div className="project-links">
                <a href={project.liveLink} target='_blank' className='project-link'>Live Demo</a>
                <a href={project.codeLink} target='_blank' className='project-link'>Get Code</a>
              </div>
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default Projects;
