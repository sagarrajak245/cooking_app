import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import './verify.css';

function VerifyForm() {
  const [formData, setFormData] = useState({
    username: '',
    code: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://d6ubmnrbdk.execute-api.ap-south-1.amazonaws.com/dev/auth/user-auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': 'bOCN1fHWuta649WJs1dTd8pXpAaUvD1w1HB53yPI'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log('Server Response:', result); 

      let parsedBody;
      try {
        parsedBody = JSON.parse(result.body);
      } catch (error) {
        parsedBody = result.body;
      }

      if (result.statusCode === 200) {
        alert(parsedBody.message || 'Verification successful!');
        navigate('/'); 
      } else {
        alert(parsedBody.error || 'Verification failed!');
      }

    } catch (error) {
      console.error('Error during verification:', error);
      alert('Error during verification. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 rounded shadow-lg bg-light mt-4">
      <h2 className="mb-4 text-center text-success">Verify Account</h2>
      <div className="form-group">
        <label htmlFor="verify-username">Username:</label>
        <input
          type="text"
          id="verify-username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="verify-code">Verification Code:</label>
        <input
          type="text"
          id="verify-code"
          name="code"
          value={formData.code}
          onChange={handleChange}
          className="form-control"
          placeholder="Enter your verification code"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Verify</button>
      <div className="mt-3 text-center">
        <Link to="/" className="text-primary">Already have an account? Log in here.</Link>
      </div>
    </form>
  );
}

export default VerifyForm;
