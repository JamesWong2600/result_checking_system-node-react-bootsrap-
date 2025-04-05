import React, { useEffect, useState } from 'react';
import './css/background.css';
import './css/loginform.css';
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: '',
        players_uuid: '',
        api_code: ''
    });

    
    `const [formData] = useState({
        username: '',
        email: '',
        password: '',
        password_confirm: ''
    });`

    //const [backendData, setBackendData] = useState([{}]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    `const username = ''
    const email = ''
    const password = ''
    const password_confirm = ''`
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                //body: JSON.stringify(formData)
                body: JSON.stringify(formData)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                console.log(formData);
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
                            value={FormData.username}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="input-group mb-3">
                        <input
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="email"
                            value={FormData.email}
                            onChange={handleInputChange}
                        />
                        <span className="input-group-text">@gmail.com</span>
                    </div>

                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="password"
                                value={FormData.password}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                type="password"
                                name="password_confirm"
                                className="form-control"
                                placeholder="password_confirm"
                                value={FormData.password_confirm}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>


                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                type="password"
                                name="players_uuid"
                                className="form-control"
                                placeholder="players_uuid"
                                value={FormData.players_uuid}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>


                    <div className="mb-3">
                        <div className="input-group">
                            <input
                                type="password"
                                name="api_code"
                                className="form-control"
                                placeholder="api_code"
                                value={FormData.api_code}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
                <div className="register-link">
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default Register;