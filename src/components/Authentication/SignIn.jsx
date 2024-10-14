import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignIn.scss';

const SIGNIN_URL = 'https://d6ubmnrbdk.execute-api.ap-south-1.amazonaws.com/dev/auth/user-auth/login'; 

const SignIn = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setEyePosition({
      x: clientX / window.innerWidth,
      y: clientY / window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(SIGNIN_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bOCN1fHWuta649WJs1dTd8pXpAaUvD1w1HB53yPI' 
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorText = await response.text(); 
        throw new Error(`HTTP error! Status: ${response.status}, ${errorText}`);
      }

      const result = await response.json();
      console.log('Server Response:', result);
      
      let parsedBody = result.body;
      if (typeof parsedBody === 'string') {
        parsedBody = JSON.parse(parsedBody); 
      }

      console.log('Parsed Body:', parsedBody);
      console.log('Token:', parsedBody.token);

      if (parsedBody.token) {
        localStorage.setItem('jwtToken', parsedBody.token);
        console.log('Token stored in localStorage:', localStorage.getItem('jwtToken'));
      }

      alert(result.message || 'Sign-in successful!');
        navigate('/home');
    } catch (error) {
      console.error('Error during sign-in:', error);
      setError(error.message);
      alert('Error during sign-in. Please try again.');
    }
  };

  return (
    <div className="sign-in-container">
      <div className="cat">
        <div className="ear ear--left"></div>
        <div className="ear ear--right"></div>
        <div className="face">
          <div className="eye eye--left">
            <div
              className="eye-pupil"
              style={{
                transform: `translate(${eyePosition.x * 20 - 10}px, ${eyePosition.y * 20 - 10}px)`,
              }}
            ></div>
          </div>
          <div className="eye eye--right">
            <div
              className="eye-pupil"
              style={{
                transform: `translate(${eyePosition.x * 20 - 10}px, ${eyePosition.y * 20 - 10}px)`,
              }}
            ></div>
          </div>
          <div className="muzzle"></div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="sign-in-form">
  <div className="form-row">
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        name="username"
        id="username"
        className="input-field" 
        value={formData.username}
        onChange={handleChange}
        required
      />
    </div>
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        id="password"
        className="input-field" 
        value={formData.password}
        onChange={handleChange}
        required
      />
    </div>
  </div>
  {error && <p className="error">{error}</p>}
  <button type="submit" className="submit-button">Sign In</button>
</form>

    </div>
  );
};

export default SignIn;
