import React, { useEffect, useRef, useState } from 'react'
import './AdminIntro.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import BouncingLoader from '../../Loader/Loader';
import { message } from 'antd';
const AdminIntro = () => {
  const [welcomeText, setWelcomeText] = useState('');
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [resume, setResume] = useState('');
  const [loading, setLoading] = useState(true);  // Add loading state
  const [buttonLoader, setButtonLoader] = useState(false);

  useEffect(() => {
    const getIntroData = async () => {
      try {
        const portfolioData = await axios.get(`${window.location.origin}/api/portfolio/get-portfolio-data`);
        const { welcomeText, name, caption, resume } = portfolioData.data.intro;
        setWelcomeText(welcomeText);
        setName(name);
        setCaption(caption);
        setResume(resume);
        setLoading(false)
      } catch (error) {
        console.log("Failed to get the Intro Data!");
      }
    }
    getIntroData();
  }, []);

  const updateInroData = async (e) => {
    e.preventDefault();
    setButtonLoader(true);
    try {
      const response =await axios.put(`${window.location.origin}/api/portfolio/updateIntroData`, {
        welcomeText,
        name,
        caption,
        resume
      });
      message.success(response.data.msg, 2)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
      
      // Ensure you extract the error message properly
      const errorMessage = error.response?.data?.msg || "An error occurred while updating.";
      message.error(errorMessage, 2);
    }
  }

  return (
    <>
      {loading ? (
        <BouncingLoader />
      ) : (
        <div className="main-container">
          <div className="back-btn">
            <Link to='/admin'><IoMdArrowRoundBack /></Link>
          </div>
          <div className='intro-container'>
            <p>Update Intro Details</p>
            <div className="input-text">
              <label>Welcome Text :</label>
              <input type="text" value={welcomeText} onChange={(e) => setWelcomeText(e.target.value)} />
            </div>
            <div className="input-text">
              <label>Name :</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input-text">
              <label>Caption:</label>
              <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} />
            </div>
            <div className="input-text">
              <label>Resume:<span>(Google Drive Link)</span></label>
              <input type="text" value={resume} onChange={(e) => setResume(e.target.value)} />

            </div>
            <div className="btn-div">
              <button onClick={updateInroData}>Update</button>
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default AdminIntro
