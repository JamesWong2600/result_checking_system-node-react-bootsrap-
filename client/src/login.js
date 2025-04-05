import React, { useEffect, useState } from 'react';
import './css/background.css';
import './css/loginform.css';
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    //const [backendData, setBackendData] = useState([{}]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                console.log(formData);
                // Redirect to login page after successful registration
                navigate('/api');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                alert(errorData.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('Network error occurred');
        }
    };



   /* useEffect(() => {
      fetch('/')
        .then((response) => response.json())
        .then((data) => {
          setBackendData(data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, ); */

    return (
        <div className="background-container">
            <div className="input_form">
                <form onSubmit={handleSubmit}>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="username"
                            className="form-control"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="password"
                                value={formData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div className="register-link">
                    <p>no account? <a href="/register">Register</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;