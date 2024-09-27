import React, { useEffect, useState } from 'react'
import { useTheme } from '../../context/ThemeContext';
import Typewriter from "typewriter-effect";
import axios from 'axios';
import './Home.css'
import { RiMoonClearFill } from "react-icons/ri";
import { IoSunny } from "react-icons/io5";
import { useSelector } from 'react-redux';
const Home = () => {
  const [theme, setTheme] = useTheme();
  const [intro,setIntro]=useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const response = await axios.get(`${window.location.origin}/api/portfolio/get-portfolio-data`);
                setIntro(response.data.intro)
                
            } catch (error) {
                
            }
        }
        fetchData();
    },[])

  const { welcomeText, name, caption, resume } = intro;


  // handle theme
  const handleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"))
  }
  return (
    <div className='container-fluid home-container' id='home'>
      <div className="theme-btn" onClick={handleTheme}>
        {theme === 'light' ? <RiMoonClearFill size={30} /> : <IoSunny size={30} />}
      </div>
      <div className="content home-content">
        <h6>👋{welcomeText || ""}</h6>
        <h2>{name || ""},</h2>
        <h1>
          {
            <Typewriter
              options={{
                strings: [`${caption}` || "", "Fullstack Developer !", "MERN Stack Developer !"],
                autoStart: true,
                loop: true,
              }}
            />
          }
        </h1>
        <div className="home-buttons">
          <a href="https://api.whatsapp.com/send?phone=9956361554"
            className="btn-hire"
            rel='noreferrer'
            target='_blank'>Hire Me
            </a>
          <a className="btn-resume" href={`http://localhost:5000/files/${resume}` || ""} target='_blank'>Resume</a>
        </div>
      </div>
    </div>
  )
}

export default Home
