import React, { useEffect, useState } from 'react'
import './AdminProject.css';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaRegWindowClose } from "react-icons/fa";
import axios from 'axios';
import BouncingLoader from '../../Loader/Loader';
import { message } from 'antd';

const AdminProject = () => {
    const [loading, setLoading] = useState(true);  // Add loading state
    const [projectData, setProjectData] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [technologies, setTechnologies] = useState('');
    const [liveLink, setLiveLink] = useState('');
    const [codeLink, setCodeLink] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [updatePopUpForm, setUpdatePopUpForm] = useState(false);
    const [addPopUpForm, setAddPopUpForm] = useState(false);
    const [idForUpdate, setIdForUpdate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [buttonLoader , setButtonLoader] = useState(false);

    // Fetch project data from the server
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/portfolio/get-portfolio-data`);
                setProjectData(response.data.project);
                setLoading(false);  // Stop loading when data is received
            } catch (error) {
                console.log("Failed to get the portfolio data (for project)", error);
                setLoading(false);  // Stop loading on error as well
            }
        }
        fetchData();
    }, []);

    // Handle closing modal
    const handleCloseModal = () => {
        setUpdatePopUpForm(false);
        setAddPopUpForm(false);
        clearForm();
    };
    // Handle form input reset
    const clearForm = () => {
        setTitle('');
        setDescription('');
        setTechnologies('');
        setLiveLink('');
        setCodeLink('');
        setThumbnail('');
    };

    // Open update modal with selected project data
    const handleOpenModal = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/portfolio/getProject/${id}`);
            setTitle(response.data.title);
            setDescription(response.data.description);
            setTechnologies(response.data.technologies);
            setLiveLink(response.data.liveLink);
            setCodeLink(response.data.codeLink);
            setThumbnail(response.data.thumbnail);
            setIdForUpdate(id);
            setUpdatePopUpForm(true);
        } catch (error) {
            console.log("Error fetching project details", error);
        }
    };

    // Handle update form submission
    const handleUpdate = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setButtonLoader(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('technologies', technologies);
            formData.append('liveLink', liveLink);
            formData.append('codeLink', codeLink);
            if (thumbnail instanceof File) {
                formData.append('thumbnail', thumbnail);
            }

            const response = await axios.put(`http://localhost:5000/api/portfolio/updateProject/${idForUpdate}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            message.success("Project Updated Successfully", 2)
            setTimeout(() => {
                clearForm();
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log("Error updating project", error);
        }
    };

    // Handle Delete 
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/portfolio/removeProject/${id}`);
            message.success("Project Deleted Successfully",2)
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            console.log('Failed to delete TechStacks');
        }
    };

    // Open add project modal
    const handleAddProject = () => {
        clearForm();
        setAddPopUpForm(true);
        setButtonLoader(true);
    };
    const handleUpload = async () => {
        // Create a FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('technologies', technologies);
        formData.append('liveLink', liveLink);
        formData.append('codeLink', codeLink);
        if (thumbnail instanceof File) {
            // Only append the image if a new file is selected
            formData.append('thumbnail', thumbnail);
        }

        try {
            // Make the POST request to the server to upload the form data
            const response = await axios.post(`http://localhost:5000/api/portfolio/addNewProject`, formData);

            // Handle successful response
            if (response.status === 200) {
                message.success("Project Added Successfully", 2)
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                // Display the server's validation error message
                setSuccessMessage(error.response.data.msg);
            } else {
                // Display a generic error message
                console.error("Error uploading project:", error.response?.data || error.message);
                setSuccessMessage("An error occurred while uploading the project.");
            }
        }
    };

    return (
        <>
            {loading ? (
                <BouncingLoader />
            ) : (
                <div className="admin-project-container">
                    <div className="mini-nav">
                        <div className="education-back-btn">
                            <Link to='/admin'><IoMdArrowRoundBack /></Link>
                        </div>
                        <div className="add-education-box" onClick={handleAddProject}>+</div>
                    </div>
                    <div className="projects-grid-container">
                        {projectData.map((project) => (
                            <div className='project-container'>
                                <div className='tech-icon'>
                                    <img src={`https://res.cloudinary.com/drbe1wmf4/image/upload/v1727673442/${project.thumbnail}`} alt="" />
                                </div>
                                <div className="media-body">
                                    <h2>{project.title}</h2>
                                </div>
                                <div className="btn">
                                    <button onClick={() => handleDelete(project._id)}>Remove</button>
                                    <button onClick={() => handleOpenModal(project._id)}>Update</button>
                                </div>
                            </div>
                        ))}
                        {/* Open Add PopUp Form */}

                        {addPopUpForm && (
                            <div className='education-modal'>
                                <div className='education-modal-content'>
                                    <span className="education-close" onClick={handleCloseModal}><FaRegWindowClose /></span>
                                    <h3>Add Project </h3>
                                    <div className='form-data'>
                                        <label>
                                            Title:
                                            <input type="text" onChange={(e) => setTitle(e.target.value)} />
                                        </label>
                                        <label>
                                            Description:
                                            <input type="text" onChange={(e) => setDescription(e.target.value)} />
                                        </label>
                                        <label>
                                            Technologies:
                                            <input type="text" onChange={(e) => setTechnologies(e.target.value)} />
                                        </label>
                                        <label>
                                            Live link:
                                            <input type="text" onChange={(e) => setLiveLink(e.target.value)} />
                                        </label>
                                        <label>
                                            Code link:
                                            <input type="text" onChange={(e) => setCodeLink(e.target.value)} />
                                        </label>
                                        <label>
                                            Thumbnail:
                                            <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                                        </label>
                                        <button onClick={handleUpload} disabled={buttonLoader}>{buttonLoader?"Adding...":"Add"}</button>
                                        {successMessage && (
                                            <p style={{ 'color': 'red', 'fontSize': '20px', fontWeight: '600' }}>{successMessage}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        )}

                        {/* update pop-up form */}
                        {updatePopUpForm && (
                            <div className='education-modal'>
                                <div className='education-modal-content'>
                                    <span className="education-close" onClick={handleCloseModal}><FaRegWindowClose /></span>
                                    <h3>Update Project Details</h3>
                                    <form onSubmit={handleUpdate} className='form-data'>
                                        <label>
                                            Title:
                                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                        </label>
                                        <label>
                                            Description:
                                            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                                        </label>
                                        <label>
                                            Technologies:
                                            <textarea type="text" value={technologies} onChange={(e) => setTechnologies(e.target.value)} />
                                        </label>
                                        <label>
                                            Live link:
                                            <input type="text" value={liveLink} onChange={(e) => setLiveLink(e.target.value)} />
                                        </label>
                                        <label>
                                            Code link:
                                            <input type="text" value={codeLink} onChange={(e) => setCodeLink(e.target.value)} />
                                        </label>
                                        <label>
                                            Thumbnail:
                                            <input type="file" onChange={(e) => setThumbnail(e.target.files[0])} />
                                        </label>
                                        <button onClick={handleUpload} disabled={buttonLoader}>{buttonLoader?"Updating...":"Update"}</button>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )
            }

        </>
    )
}
export default AdminProject