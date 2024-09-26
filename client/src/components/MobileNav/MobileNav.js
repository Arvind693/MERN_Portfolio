import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import './MobileNav.css';
import { RiMoonClearFill } from "react-icons/ri";
import { IoSunny } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";

import { IoHomeSharp } from "react-icons/io5";
import { FcAbout, FcBiotech, FcVoicePresentation } from "react-icons/fc";
import { MdOutlineCastForEducation } from "react-icons/md";
import { GrProjects } from "react-icons/gr";
import { IoMdContacts } from "react-icons/io";
import { Link as ScrollLink } from "react-scroll";

const MobileNav = () => {
    const [theme, setTheme] = useTheme();
    const [toggleClass, setToggleClass] = useState(true);
    // handle theme
    const handleTheme = () => {
        setTheme((prevState) => (prevState === "light" ? "dark" : "light"))
    }
    const toggleClassBtn = () => {
        setToggleClass(!toggleClass);
    }
    return (
        <>
            <div className="main-mobile-nav">
                <div className="mobile-nav">
                    <div className="mobile-nav-header" onClick={toggleClassBtn}>
                        <IoMenu size={30} />
                    </div>
                    <h3>Portfolio</h3>
                    <div className="theme-btn-mobile" onClick={handleTheme}>
                        {theme === 'light' ? <RiMoonClearFill size={30} /> : <IoSunny size={30} />}
                    </div>
                </div>
                <div className={toggleClass? "close-menu" :"mobile-nav-items"}>
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
            </div>
        </>
    )
}

export default MobileNav
