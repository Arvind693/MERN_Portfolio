import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
const Navbar = () => {
    const location = useLocation(); // Get current route


    // Function to check if the current route matches the link
    const isActive = (path) => location.pathname === path ? 'active-btn' : '';

    return (
        <>
            <nav className='navbar'>
                <div className="logo">
                    <h2>Admin-Panel</h2>
                </div>
                <ul className="nav-links">
                    <li className={isActive('/admin')}>
                        <Link to='/admin' className='nav-link'>Home</Link>
                    </li>
                    <li className={isActive('/admin/intro')}>
                        <Link to='/admin/intro' className='nav-link'>Intro</Link>
                    </li>
                    <li className={isActive('/admin/about')}>
                        <Link to='/admin/about' className='nav-link'>About</Link>
                    </li>
                    <li className={isActive('/admin/educations')}>
                        <Link to='/admin/educations' className='nav-link'>Education</Link>
                    </li>
                    <li className={isActive('/admin/techStacks')}>
                        <Link to='/admin/techStacks' className='nav-link'>TechStacks</Link>
                    </li>
                    <li className={isActive('/admin/projects')}>
                        <Link to='/admin/projects' className='nav-link'>Projects</Link>
                    </li>
                </ul>
                <div className="logout-btn">
                    <button onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/admin-login"
                    }}>LOGOUT</button>
                </div>
            </nav>
        </>
    )
}

export default Navbar
