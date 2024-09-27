import React, { useState } from 'react'
import { BsLinkedin, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { ImFacebook2 } from "react-icons/im";
import "./Contact.css"
import axios from 'axios';
const Contact = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [fieldError,setFieldError] = useState('');
    // console.log(name,email,message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            const response = await axios.post(`${window.location.origin}/api/portfolio/contact`, {
                name,
                email,
                message
            });
            if (response.status === 200) { 
                setSuccessMessage('');
                setFieldError(response.data.msg);
            }
            if (response.status === 201) {
                setName('');
                setEmail('');
                setMessage('');
                setFieldError('')
                setSuccessMessage(response.data.msg)
            }
        } catch (error) {
            setSuccessMessage("Failed to send message");
            console.log(error);
        } finally {
            setIsLoading(false); // End loading
        }
    }

    return (
        <>
            <div className="contact" id='contact'>
                <div className="card card0 border-0">
                    <div className="row">
                        <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
                            <div className="card1">
                                <div className="row border-line">
                                    <dotlottie-player src="https://lottie.host/050fc055-4248-4192-a6c2-48d6b9996dcd/LmIEuAaBhP.json"
                                        background="transparent"
                                        speed="1"
                                        loop autoplay>
                                    </dotlottie-player>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="card2 d-flex card border-0 px-4 py-3">
                                <div className="row contact-second-div">
                                    <div className="row">
                                        <h6>Contact With Us
                                            <BsLinkedin className='linkedin-icon' />
                                            <FcGoogle className='google-icon' />
                                            <BsGithub className='github-icon' />
                                            <ImFacebook2 className='facebook-icon' />
                                        </h6>
                                    </div>
                                    <div className="row px-3 mb-4 or-line">
                                        <div className='line' />
                                        <small className="or text-center">OR</small>
                                        <div className='line' />
                                    </div>
                                    <div className="row px-3">
                                        <input type="text" name='name' value={name} placeholder='Write your name' className='mb-3' onChange={(e) => setName(e.target.value)} />
                                        <input type="email" name='email' value={email} placeholder='Email' className='mb-3' onChange={(e) => setEmail(e.target.value)} />
                                        <textarea type="text" name='msg' value={message} placeholder='Write your message' className='mb-3' onChange={(e) => setMessage(e.target.value)} />
                                    </div>
                                    <div className="row px-3">
                                        <button className='contact-btn' type='submit' onClick={handleSubmit} disabled={isLoading}>
                                            {isLoading ? 'Sending...' : 'SEND MESSAGE'}
                                        </button>
                                    </div>
                                    <div className="isSuccessMessage-container">
                                        {successMessage && <p style={{'color':'green'}}>{successMessage}</p>}
                                        {fieldError && <p style={{'color':'red'}}>{fieldError}</p>}
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Contact;
