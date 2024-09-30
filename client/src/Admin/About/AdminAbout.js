import React, { useEffect, useState } from 'react';
import './AdminAbout.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import BouncingLoader from '../../Loader/Loader';
import { message } from 'antd';
import { Navigate } from 'react-router-dom';

const AdminAbout = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);  // Add loading state
  const [buttonLoader, setButtonLoader] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const portfolioData = await axios.get(`${window.location.origin}/api/portfolio/get-portfolio-data`);
        const { description, image } = portfolioData.data.about;
        setDescription(description);
        setImage(image);
        setLoading(false);
      } catch (error) {
        console.log(error);

      }
    };

    getData();
  }, []);

  const handleUpdate = async (e) => {
    setButtonLoader(true);
    e.preventDefault();
    try {
      await axios.put(`${window.location.origin}/api/portfolio/updateAboutData`, {
        description,
        image
      });
      message.success("About data Updated Successfully", 2)
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (

        <BouncingLoader />
      ) : (
        <div className='admin-about-container'>
          <div className="back-btn">
            <Link to='/admin'><IoMdArrowRoundBack /></Link>
          </div>
          <div className="about-container">
            <div className="about-text">
              <label>Update Decription</label>
              <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="about-text">
              <label>Lottie URL:</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
            </div>
            <div className="btn-div">
              <button onClick={handleUpdate} disabled={buttonLoader}>{buttonLoader?"Updating":"Update"}</button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default AdminAbout;

