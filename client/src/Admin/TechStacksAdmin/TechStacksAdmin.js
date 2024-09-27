import React, { useEffect, useState } from 'react';
import './TechStacksAdmin.css';
import { FaRegWindowClose } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from 'axios';
import BouncingLoader from '../../Loader/Loader';

const TechStacksAdmin = () => {
    const [skillData, setSkillData] = useState([]);
    const [skillName, setSkillName] = useState('');
    const [skillsIcon, setSkillsIcon] = useState('');
    const [updatePopUpForm, setUpdatePopUpForm] = useState(false);
    const [addPopUpForm, setAddPopUpForm] = useState(false);
    const [idForUpdate, setIdForUpdate] = useState('');
    const [loading, setLoading] = useState(true);

    // Fetch skills data from portfolio data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/portfolio/get-portfolio-data`);
                setSkillData(response.data.techStack);
                setLoading(false);
            } catch (error) {
                console.log("Failed to get the portfolio data (for skills)");
            }
        };
        fetchData();
    }, []);

    const handleCloseModal = () => {
        setUpdatePopUpForm(false);
        setAddPopUpForm(false);
        clearForm();
    };

    const clearForm = () => {
        setSkillName('');
        setSkillsIcon('');
    };

    const handleOpenModal = (id) => {
        setUpdatePopUpForm(true);
        setIdForUpdate(id);
    };

    // Fetch individual skill data for update
    useEffect(() => {
        if (!idForUpdate) return;
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/portfolio/getSkills/${idForUpdate}`);
                setSkillName(response.data.name);
                setSkillsIcon(response.data.icon);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [idForUpdate]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append('name', skillName);
            if (skillsIcon instanceof File) {
                formData.append('icon', skillsIcon);
            }

            const response = await axios.put(`http://localhost:5000/api/portfolio/updateSkills/${idForUpdate}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            alert(response.data.msg);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    // Handle Delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/portfolio/removeSkill/${id}`);
            window.location.reload();
        } catch (error) {
            console.log('Failed to delete TechStacks');
        }
    };

    // Add new skill
    const handleAddSkill = () => {
        setAddPopUpForm(true);
        clearForm();
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', skillName);
        formData.append('icon', skillsIcon);

        try {
            const response = await axios.post(`http://localhost:5000/api/portfolio/addNewSkill`, formData);
            if (response.status === 200) {
                alert("Skill Added Successfully");
                window.location.reload();
            } else {
                console.log("Unexpected response:", response);
            }
        } catch (error) {
            console.error("Error uploading skill:", error.response?.data || error.message);
        }
    };

    return (
        <>
            {loading ? (
                <BouncingLoader />
            ) : (
                <div className="skills-main-container">
                    <div className="mini-nav">
                        <div className="education-back-btn">
                            <Link to='/admin'><IoMdArrowRoundBack /></Link>
                        </div>
                        <div className="add-education-box" onClick={handleAddSkill}>+</div>
                    </div>
                    <div className="skills-grid-container">
                        {skillData.map((skills) => (
                            <div className='skills-container' key={skills._id}>
                                <div className='tech-icon'>
                                    <img src={`http://localhost:5000/skillsIcons/${skills.icon}`} alt={skills.name} />
                                </div>
                                <div className="media-body">
                                    <h5>{skills.name}</h5>
                                </div>
                                <div className="btn">
                                    <button onClick={() => handleDelete(skills._id)}>Remove</button>
                                    <button onClick={() => handleOpenModal(skills._id)}>Update</button>
                                </div>
                            </div>
                        ))}

                        {/* Add Skill Modal */}
                        {addPopUpForm && (
                            <div className='education-modal'>
                                <div className='education-modal-content'>
                                    <span className="education-close" onClick={handleCloseModal}><FaRegWindowClose /></span>
                                    <h3>Add Skill</h3>
                                    <form onSubmit={handleUpload} className='form-data'>
                                        <label>
                                            Skill Name:
                                            <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} required />
                                        </label>
                                        <label>
                                            Upload Icon:
                                            <input type="file" onChange={(e) => setSkillsIcon(e.target.files[0])} required />
                                        </label>
                                        <button type="submit">Add</button>
                                    </form>
                                </div>
                            </div>
                        )}

                        {/* Update Skill Modal */}
                        {updatePopUpForm && (
                            <div className='education-modal'>
                                <div className='education-modal-content'>
                                    <span className="education-close" onClick={handleCloseModal}><FaRegWindowClose /></span>
                                    <h3>Update Skill Details</h3>
                                    <form onSubmit={handleUpdate} className='form-data'>
                                        <label>
                                            Skill Name:
                                            <input type="text" value={skillName} onChange={(e) => setSkillName(e.target.value)} required />
                                        </label>
                                        <label>
                                            Upload Icon:
                                            <input type="file" onChange={(e) => setSkillsIcon(e.target.files[0])} />
                                        </label>
                                        <button type="submit">Submit</button>
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

export default TechStacksAdmin;
