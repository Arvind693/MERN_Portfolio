import React, { useEffect, useState } from 'react'
import "./TechStack.css"
import { useSelector } from 'react-redux';
import axios from 'axios';
const TechStack = () => {
    const [techStacks,setTechStacks]=useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get(`http://localhost:5000/api/portfolio/get-portfolio-data`);
                setTechStacks(response.data.techStack)
            } catch (error) {
                
            }
        }
        fetchData();
    },[])
    return (
        <>
            <div className="techstack-container" id='techstack'>
                <h2 className='col-12 mt-3 mb-1 text-center text-uppercase'>Tchnologies Stack</h2>
                <hr />
                <p className='pb-3 text-center'>👉 including programming languages, frameworks, databases, front-end, backe-end tools
                    and APIs
                </p>
                <div className="techStcks-row">
                    {techStacks.map((ele) => (
                        <div className="techStack-content">
                            <div className='tech-image'>
                                <img src={`http://localhost:5000/skillsIcons/${ele.icon}`} alt="icon" />
                            </div>
                            <div className="media-body">
                                <h5>{ele.name}</h5>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default TechStack
