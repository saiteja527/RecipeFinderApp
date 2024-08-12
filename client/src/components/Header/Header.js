import "./Header.css";
import { Link } from 'react-router-dom';
import logo from '../../assets/Foods-logo.png';
import { FaHome } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { HiMenu } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5'; 
import axios from "axios";
import { useEffect, useState } from "react";

const Header = () => {
  const [userData, setUserData] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false); 

  const getUser = async () => {
    try {
      const response = await axios.get(`https://recipefinderappbackend.onrender.com/login/success`, { withCredentials: true });
      setUserData(response.data.user);
    } catch (err) {
      console.error("Error fetching user data", err);
    }
  };

  const logOut = async () => {
    window.open(`https://recipefinderappbackend.onrender.com/logout`, "_self");
  }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  }

  useEffect(() => {
    getUser();
  }, []);
  
  return (
    <header>
      <nav>
        <div className="left">
          <img src={logo} alt="Logo" />
        </div>
        <div className="menu-icon" onClick={toggleNav}>
          <HiMenu />
        </div>
        <div className={`right ${isNavOpen ? 'open' : ''}`}>
          <div className="close-icon" onClick={toggleNav}>
            <IoClose />
          </div>
          <ul>
            <li><Link to='/'><FaHome style={{ width: "40px" }} />Home</Link></li>
            {Object.keys(userData).length > 0 ? 
              (<>
                <li className="username"><Link ><FaUser style={{ width: "40px" }} />{userData.displayName}</Link></li>
                <li onClick={logOut} className="logout"><Link to="/"><FiLogOut style={{ width: "40px" }} />Log Out</Link></li>
                <li>
                  <img src={userData.image} alt="User" />
                </li>
              </>) : (
              <li><Link to='/login'><FaUser style={{ width: "40px" }} />Login</Link></li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
