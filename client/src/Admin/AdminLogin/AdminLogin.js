import React, { useState } from 'react'
import { message } from 'antd';
import './AdminLogin.css';
import axios from 'axios';

const AdminLogin = () => {
    const [user, setUser] = React.useState({
        userName: "",
        password: ""
    });
    const [signUpForm, setSignUpForm] = useState(false);
    

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/portfolio/admin-login', user);
            if (response.data.success) {
                message.success(response.data.message);
                localStorage.setItem('token', JSON.stringify(response.data));
                window.location.href = '/admin';
            }
            else {
                message.error(response.data.message);
            }
        } catch (error) {
            message.error(error.message)
        }
    }
    const goToSignupPage = () => {
        setUser({
            userName:"",
            password:""
        });
        setSignUpForm(true)
    }
    const handleBack =()=>{
        setSignUpForm(false)
    }
    const signUp= async()=>{
        try {
            const response = await axios.post('http://localhost:5000/api/portfolio/addNewUser',user);
            if(response.data.success){
                message.success(response.data.message);
                setUser({
                    userName:"",
                    password:""
                })
                setSignUpForm(false);
            }else{
                message.error(response.data.message)
            }
            
        } catch (error) {
            message.error(error.message);
        }
    }
    return (
        <>
            {!signUpForm && (
                <div className='login-container'>
                    <div className='login-box-container'>
                        <h4>Portfolio Admin-Login</h4>
                        <div className="devider"></div>
                        <input type="text" value={user.userName} placeholder='Username' onChange={(e) => setUser({ ...user, userName: e.target.value })} />
                        <input type="password" value={user.password} placeholder='Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                        <div className="login-signup-btn">
                            <button className='login-btn' onClick={handleLogin}>Login</button>
                            <p className='have-account' onClick={goToSignupPage}>Don't have account?</p>
                        </div>
                    </div>
                </div>
            )}
            {signUpForm && (
                <>
                    <div className='login-container'>
                        <div className='login-box-container'>
                            <h4>Portfolio Admin-SignUp</h4>
                            <div className="devider"></div>
                            <input type="text" value={user.userName} placeholder='Create Username' onChange={(e) => setUser({ ...user, userName: e.target.value })} />
                            <input type="password" value={user.password} placeholder='Create Password' onChange={(e) => setUser({ ...user, password: e.target.value })} />
                            <div className="login-signup-btn">
                                <button className='login-btn' onClick={handleBack}>Back</button>
                                <button className='login-btn' onClick={signUp}>Sign UP</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default AdminLogin
