import React, { useEffect, useRef, useState } from 'react'
import './AdminIntro.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import BouncingLoader from '../../Loader/Loader';
const AdminIntro = () => {
  const [welcomeText, setWelcomeText] = useState('');
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [resume, setResume] = useState();
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const getIntroData = async () => {
      try {
        const portfolioData = await axios.get('http://localhost:5000/api/portfolio/get-portfolio-data');
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
    try {
      const formData = new FormData();

      formData.append('welcomeText', welcomeText);
      formData.append('name', name);
      formData.append('caption', caption);

      if (resume instanceof File) {
        // Only append the image if a new file is selected
        formData.append('resume', resume);
      }
      axios.put('http://localhost:5000/api/portfolio/updateIntroData', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct header
        }
      });
      alert("User Updated successfully")
      // window.location.reload();
    } catch (error) {
      console.log("Failed to upadte the Inro Data");
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
              <label>Resume:</label>
              <input type="file" accept='application/pdf' onChange={(e) => setResume(e.target.files[0])} />

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
