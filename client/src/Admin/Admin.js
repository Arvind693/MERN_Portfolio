import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar';
import { Routes, Route } from 'react-router-dom';
import AdminIntro from './AdminIntro/AdminIntro';
import AdminAbout from './About/AdminAbout';
import Home from './Home/Home';
import AdminEducation from './Education/AdminEducation';
import TechStacksAdmin from './TechStacksAdmin/TechStacksAdmin';
import AdminProject from './AdminProjects/AdminProject';
import axios from 'axios';


function Admin() {
    
    useEffect(()=>{
        if(!localStorage.getItem("token")){
            window.location.href="/admin-login"
        }
    })

    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/intro' element={<AdminIntro />} />
                <Route path='/about' element={<AdminAbout />} />
                <Route path='/educations' element={<AdminEducation/>} />
                <Route path='/techStacks' element={<TechStacksAdmin />} />
                <Route path='/projects' element={<AdminProject />} />
            </Routes>
        </>
    )
}

export default Admin
