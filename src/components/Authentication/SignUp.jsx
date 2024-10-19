import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LetterAnimation.css';

const LetterAnimation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const navigate = useNavigate();

  const handleEnvelopeClick = () => {
    if (isOpen) {
      setIsOpen(false);
      setTimeout(() => {
        handleSubmit(); 
      }, 500); 
    } else {
      setIsOpen(true); 
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://d6ubmnrbdk.execute-api.ap-south-1.amazonaws.com/dev/auth/user-auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bOCN1fHWuta649WJs1dTd8pXpAaUvD1w1HB53yPI',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      if (result.statusCode === 200) {
        // Successfully signed up
        if (result.body.message && result.body.message.includes('Check your email')) {
          navigate('/verify');
        } else {
          alert(result.body.message || 'Sign-up successful!');
          navigate('/verify');
        }
      } else {
        alert(result.body.error || 'Sign-up failed!');
      }
    } catch (error) {
      console.error('Error during sign-up:', error);
      alert('Error during sign-up. Please try again.');
    }
  };

  return (
    <div className={`letter-image ${isOpen ? 'open' : ''}`} onClick={handleEnvelopeClick}>
      <div className="animated-mail">
        <div className="back-fold"></div>
        <div className="letter" onClick={(e) => e.stopPropagation()}>
          <div className="letter-border"></div>
          <div className={`letter-form ${isOpen ? 'active' : ''}`}>
            <h3>Signup</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </form>
          </div>
        </div>
        <div className="top-fold"></div>
        <div className="body"></div>
        <div className="left-fold"></div>
      </div>
      <div className="shadow"></div>
  
    </div>
    
  );
};

export default LetterAnimation;
