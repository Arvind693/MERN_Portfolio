import React, { useEffect, useState } from 'react';
import './AdminAbout.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import BouncingLoader from '../../Loader/Loader';

const AdminAbout = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const getData = async () => {
      try {
        const portfolioData = await axios.get('http://localhost:5000/api/portfolio/get-portfolio-data');
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
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/portfolio/updateAboutData', {
        description,
        image
      });
      alert("About Updated Successful")
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
              <button onClick={handleUpdate}>Update</button>
            </div>
          </div>
        </div>
      )}
    </>

  )
}

export default AdminAbout;

