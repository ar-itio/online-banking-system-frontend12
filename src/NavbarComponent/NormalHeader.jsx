import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo.png";

const NormalHeader = () => {
  const headerStyle = {
    height: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between', // Align items with space in between
    padding: '0 20px', // Add padding horizontally
  };

  const cardStyle = {
    backgroundColor: '#00CED1', // Card background color
    color: 'white', // Text color for cards
    padding: '10px',
    borderRadius: '8px', // Rounded corners for the card
    margin: '0 10px', // Space between cards
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow for depth
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  const logoStyle = {
    width: '60px', // Adjusted width for a slightly larger logo
    height: '60px', // Adjusted height for a slightly larger logo
    marginRight: '10px', // Margin to separate the logo from text
  };

  return (
    <div style={headerStyle}>
      {/* Logo and Application Name */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={logoStyle} />
        <b>Online Banking System</b>
      </div>
      {/* Navigation Links */}
      <div style={{ display: 'flex' }}>
        <div style={cardStyle}>
          <Link to="/user/admin/register" style={linkStyle}>
            Register Admin
          </Link>
        </div>
        <div style={cardStyle}>
          <Link to="/user/customer/register" style={linkStyle}>
            Register Customer
          </Link>
        </div>
        <div style={cardStyle}>
          <Link to="/user/login" style={linkStyle}>
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NormalHeader;
