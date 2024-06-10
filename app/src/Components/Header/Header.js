import React from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { UserAuth } from '../../context/authContext';
import { Link, useNavigate } from 'react-router-dom';
function Header() {
  const navigate = useNavigate()
  const {user, logout} = UserAuth();
  const handleLogout = () =>{
    logout();
    navigate('/login');
  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          {
            user ? (
              <span>{user?.displayName}</span>
            ) : (
              <span>ENGLISH <Arrow> </Arrow></span>
            )
          }
            {/* <span> { user ? user?.displayName : "ENGLISH"  (<Arrow> </Arrow>) } </span> */}
         
        </div>
        <div className="loginPage">
          {
            user ? (
              <span className='logout' onClick={handleLogout}>Logout</span>
            ) : (
              <span><Link className='a' to="/login">Login</Link></span>
            )
          }
          <hr />
        </div>

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
