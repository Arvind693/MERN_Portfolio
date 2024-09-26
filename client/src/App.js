import Layout from './components/Layout/Layout';
import About from './components/pages/About/About';
import Contact from './components/pages/Contact/Contact';
import Educations from './components/pages/Educations/Educations';
import Projects from './components/pages/Projects/Projects';
import TechStack from './components/pages/TechStack/TechStack';
import ScrollToTop from "react-scroll-to-top";
import axios from 'axios';
import { Element } from 'react-scroll';
import './App.css'
import Home from './components/pages/Home/Home';
import { useTheme } from './components/context/ThemeContext';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetPortfolioData } from './redux/rootSlice';
import BouncingLoader from './Loader/Loader';
import MobileNav from './components/MobileNav/MobileNav';
function App() {
  const [loading, setLoading] = useState(true);
  const [theme] = useTheme();
  const { portfolioData } = useSelector((state) => state.root);
  const dispatch = useDispatch()
  const getPortfolioData = async () => {
    try {
      const response = await axios.get('/api/portfolio/get-portfolio-data');
      dispatch(SetPortfolioData(response.data))
      // setLoading(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPortfolioData();
  }, [])

  return (
    <>
      <div id={theme}>
        <MobileNav/>
        <Layout />
        {portfolioData ? (
          <div className="app-container">
            <Element name="home"><Home /></Element>
            <Element name="about"><About /></Element>
            <Element name="educations"><Educations /></Element>
            <Element name="techstack"><TechStack /></Element>
            <Element name="projects"><Projects /></Element>
            <Element name="contact"><Contact /></Element>
          </div>
        ) : (
          
          <BouncingLoader/>
        )}

        <div className="footer">
          <h4>&copy; 2024 Arvind Kumar. All rights reserved.</h4>
        </div>
      </div>
      <ScrollToTop
        className='scroll-to-top'
        smooth
        color='#f29e66'
        style={{ backgroundColor: "#1e1e2c", borderRadius: "80px" }}
      />
    </>
  );
}

export default App;
