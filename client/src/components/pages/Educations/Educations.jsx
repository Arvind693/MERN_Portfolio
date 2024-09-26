import React, { useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { GrCertificate } from "react-icons/gr";
import './Educations.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
const Educations = () => {
    const [education,setEducaion]=useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get('http://localhost:5000/api/portfolio/get-portfolio-data');
                setEducaion(response.data.education)
            } catch (error) {
                
            }
        }
        fetchData();
    },[])
    return (
        <>
            <div className="container education" id='education'>
                <h2 className='col-12 mt-3 mb-1 text-center text-uppercase'>EDUCATION & CERTIFICATION</h2>
                <hr />
                <VerticalTimeline>
                   {education.map((education,index)=>(
                    <VerticalTimelineElement
                        className="vertical-timeline-element--education"
                        contentStyle={{ background: 'white', color: 'black' }}
                        contentArrowStyle={{ borderRight: '7px solid  white' }}
                        date={education.date}
                        iconStyle={{ background: '#138781', color: '#fff' }}
                        icon={ <GrCertificate /> } 
                    >
                        <h3 className="vertical-timeline-element-title">{education.title}</h3>
                        <h4 className="vertical-timeline-element-subtitle">from {education.institute}</h4>
                        <div >
                            <a className="view-btn" href={education.link} target='_blank'>View</a>
                        </div>
                    </VerticalTimelineElement>
                   ))}
                </VerticalTimeline>
            </div>
        </>
    )
}

export default Educations
