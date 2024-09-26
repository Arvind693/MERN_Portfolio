import React from 'react'
import './Home.css';
import { Link } from 'react-router-dom';
const Home = () => {
    return (
        <div className='admin-home-container'>
            <h3>Hey 👋, Welcome To Admin Panel , </h3>
            <h1>Mr. Arvind,</h1>
            <div className="lottie-img" >
                <dotlottie-player src="https://lottie.host/065b50c5-19eb-465a-87eb-6e28fc80147a/MLYGPbpQ2u.json"
                    background="transparent"
                    speed="1"
                    loop autoplay
                    style={{
                        width: '200px',
                        height: '200px',
                        margin: '0 auto',
                        display: 'block',
                        textShadow: '5px 4px 8px rgba(0, 0, 0, 0.1)',
                        transform: 'scale(1)',
                        transition: 'transform 0.3s ease-in-out'
                    }}
                >
                </dotlottie-player>
            </div>
            <div className="admin-home-text">
                <p>This is your digital playground! Here, you can easily manage every aspect of your portfolio to keep it looking sharp, relevant, and impressive. Whether you're showcasing your latest project,
                    updating your skills, or adding a new tech stack, everything is just a few clicks away. 🎯
                </p>
                <ul className="pages-boxes">
                    <li className="page-box">
                        <Link to='/admin' className='page-nav-link'>Home</Link>
                    </li>
                    <li className="page-box">
                        <Link to='/admin/intro' className='page-nav-link'>Intro</Link>
                    </li>
                    <li className="page-box">
                        <Link to='/admin/about' className='page-nav-link'>About</Link>
                    </li>
                    <li className="page-box">
                        <Link to='/admin/educations' className='page-nav-link'>Education</Link>
                    </li>
                    <li className="page-box">
                        <Link to='/admin/techStacks' className='page-nav-link'>TechStacks</Link>
                    </li>
                    <li className="page-box">
                        <Link to='/admin/projects' className='page-nav-link'>Projects</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Home
