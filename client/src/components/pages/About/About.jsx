import React from 'react'
import { useSelector } from 'react-redux'
import './About.css'
const About = () => {
  const { portfolioData } = useSelector((state) => state.root);
  const { about = {} } = portfolioData || {};
  const {description, image } = about;

  return (
    <>
      <div className="about" id='about'>
        <div className="row">
          <div className="about-img" >
            <dotlottie-player src={image}
              loop autoplay>
            </dotlottie-player>
          </div>
        </div>
        <div className="about-text">
          <h2 className='text-uppercase'>About Me</h2>
          <p>{description}</p>
        </div>
      </div>
    </>
  )
}

export default About
