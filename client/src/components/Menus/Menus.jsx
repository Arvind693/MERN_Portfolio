import React from 'react';
import './Menus.css';
import image from "../../Assets/profile-img.jpg"
import { IoHomeSharp } from "react-icons/io5";
import { FcAbout, FcBiotech, FcVoicePresentation } from "react-icons/fc";
import { MdOutlineCastForEducation } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { IoMdContacts } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";

const Menus = ({ toggle }) => {
    return (

        <>
            {
                toggle ? (
                    <>
                        <div className="navbar-profile-pic">
                            <img src={image} alt="profile pic" />
                        </div>
                        <div className="nav-items">
                            <div className="nav-item">
                                <ScrollLink to="home" spy={true} smooth={true} offset={-100} duration={100}>
                                    <IoHomeSharp />
                                    Home
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to="about" spy={true} smooth={true} offset={-100} duration={100}>
                                    <FcAbout />
                                    About
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to="education" spy={true} smooth={true} offset={-100} duration={100}>
                                    <MdOutlineCastForEducation />
                                    Education
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to="techstack" spy={true} smooth={true} offset={-100} duration={100}>
                                    <FcBiotech />
                                    Tech Stack
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to="projects" spy={true} smooth={true} offset={-100} duration={100}>
                                    <GrProjects />
                                    Projects
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to="contact" spy={true} smooth={true} offset={-100} duration={100}>
                                    <IoMdContacts />
                                    Contact
                                </ScrollLink>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="nav-items">
                            <div className="nav-item">
                                <ScrollLink to='home' spy={true} smooth={true} offset={-100} duration={100}>
                                    <IoHomeSharp title='Home' />
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to='about' spy={true} smooth={true} offset={-100} duration={100}>
                                    <FcAbout title='About' />
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to='education' spy={true} smooth={true} offset={-100} duration={100}>
                                    <MdOutlineCastForEducation title='Education' />
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to='techstack' spy={true} smooth={true} offset={-100} duration={100}>
                                    <FcBiotech title='Tech Stack' />
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to='projects' spy={true} smooth={true} offset={-100} duration={100}>
                                    <GrProjects title='Projects' />
                                </ScrollLink>
                            </div>
                            <div className="nav-item">
                                <ScrollLink to='contact' spy={true} smooth={true} offset={-100} duration={100}>
                                    <IoMdContacts title='Contact' />
                                </ScrollLink>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default Menus
