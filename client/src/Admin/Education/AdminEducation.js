import React, { useEffect, useState } from 'react';
import './Education.css';
import axios from 'axios';
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaRegWindowClose } from "react-icons/fa";
import BouncingLoader from '../../Loader/Loader';
import { message } from 'antd';

const AdminEducation = () => {
  const [educationData, setEducationData] = useState([]);
  const [openAddForm, setopenAddForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);
  const [title, setTitle] = useState('');
  const [institute, setInstitute] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [idForUpdate, setIdForUpdate] = useState('');
  const [loading, setLoading] = useState(true);  // Add loading state
  const [buttonLoader, setButtonLoader] = useState(false);

  // Get the education data from MongoDB when the component mounts
  useEffect(() => {
    const getData = async () => {
      try {
        const portfolioData = await axios.get(`${window.location.origin}/api/portfolio/get-portfolio-data`);
        setEducationData(portfolioData.data.education);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);  // Add empty array to ensure it runs only once

  const handlleAddEducation = () => {
    setopenAddForm(true);
  };

  const handleCloseModal = () => {
    setopenAddForm(false);
  };

  // Post new education data to MongoDB
  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoader(true);

    try {
      await axios.post(`${window.location.origin}/api/portfolio/addNewEducation`, {
        title,
        institute,
        date,
        link,
      });
      message.success("Education Added Successfully 🥰", 2);
      setTimeout(() => {
        setopenAddForm(false);
        window.location.reload(); // Reload to reflect the new data
      }, 2000);
    } catch (error) {
      console.log("Failed to add the new education data!");
    }
  };

  // Delete the education data
  const removeEducation = async (id) => {
    try {
      await axios.delete(`${window.location.origin}/api/portfolio/removeEducation/${id}`);
      message.success("Education data removed successfully!", 2);
      window.location.reload();
    } catch (error) {
      console.log("Error deleting the education data");
    }
  };

  // Open update form with pre-filled data
  const popUpUpdateForm = (id) => {
    setOpenUpdateForm(true);
    setIdForUpdate(id);
  };

  const handleClose = () => {
    setOpenUpdateForm(false);
  };

  // Fetch education data by ID when `idForUpdate` changes
  useEffect(() => {
    if (!idForUpdate) return; // Only fetch when there's a valid ID

    const fetchEducation = async () => {
      try {
        const response = await axios.get(`${window.location.origin}/api/portfolio/getEducation/${idForUpdate}`);
        const education = response.data;
        setTitle(education.title);
        setInstitute(education.institute);
        setDate(education.date);
        setLink(education.link);
      } catch (error) {
        console.error('Error fetching education data:', error);
      }
    };

    fetchEducation();
  }, [idForUpdate]);

  // Update education data
  const handleUpdate = async (e) => {
    e.preventDefault();
    setButtonLoader(true);
    const updatedEducation = {
      title,
      institute,
      date,
      link,
    };
    try {
      await axios.put(`${window.location.origin}/api/portfolio/updateEducation/${idForUpdate}`, updatedEducation, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      message.success("Education Updated Successfully", 2);
      setTimeout(() => {
        setOpenUpdateForm(false);
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
        <div className="admin-education-container">
          <div className="mini-nav">
            <div className="education-back-btn">
              <Link to='/admin'><IoMdArrowRoundBack /></Link>
            </div>
            <div className="add-education-box" onClick={handlleAddEducation}>+</div>
          </div>
          <div className="education-grid-container">
            {educationData.map((education) => (
              <div className="education-box" key={education._id}> {/* Added key prop */}
                <p className='title'>{education.title}</p>
                <p className='institute'>From {education.institute}</p>
                <p className='date'>{education.date}</p>
                <div className="btn">
                  <button onClick={() => removeEducation(education._id)}>Remove</button>
                  <button onClick={() => popUpUpdateForm(education._id)}>Update</button>
                </div>
              </div>
            ))}

            {/* Open Add PopUp Form */}
            {openAddForm && (
              <div className='education-modal'>
                <div className='education-modal-content'>
                  <span className="education-close" onClick={handleCloseModal}><FaRegWindowClose /></span>
                  <h1>Add Education</h1>
                  <form onSubmit={handleSubmit} className='form-data'>
                    <label>
                      Title:
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                      Institute:
                      <input type="text" value={institute} onChange={(e) => setInstitute(e.target.value)} required />
                    </label>
                    <label>
                      Year of Passing:
                      <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </label>
                    <label>
                      Certificate Link:
                      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
                    </label>
                    <button type="submit" disabled={buttonLoader}>{buttonLoader?"Adding":"Add"}</button>
                  </form>
                </div>
              </div>
            )}

            {/* Open Update PopUp Form */}
            {openUpdateForm && (
              <div className='education-modal'>
                <div className='education-modal-content'>
                  <span className="education-close" onClick={handleClose}><FaRegWindowClose /></span>
                  <h1>Update Education</h1>
                  <form className='form-data' onSubmit={handleUpdate}>
                    <label>
                      Title:
                      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    </label>
                    <label>
                      Institute:
                      <input type="text" value={institute} onChange={(e) => setInstitute(e.target.value)} required />
                    </label>
                    <label>
                      Year of Passing:
                      <input type="text" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </label>
                    <label>
                      Certificate Link:
                      <input type="text" value={link} onChange={(e) => setLink(e.target.value)} required />
                    </label>
                    <button type="submit" disabled={buttonLoader}>{buttonLoader?"Updating...":"Update"}</button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AdminEducation;
