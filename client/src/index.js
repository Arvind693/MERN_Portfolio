import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './components/context/ThemeContext';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import App from './App';
import Admin from './Admin/Admin';
import AdminLogin from './Admin/AdminLogin/AdminLogin';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/admin/*' element={<Admin/>}/>
          <Route path='/admin-login' element={<AdminLogin/>}/>
        </Routes>
      </Router>
    </Provider>
  </ThemeProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
