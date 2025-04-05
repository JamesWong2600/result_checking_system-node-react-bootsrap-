import React, { useEffect, useState } from 'react';
import './App.css';
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function App() {  

  const [backendData, setBackendData] = useState([{}]);

  const navigate = useNavigate();
  useEffect(() => {
    fetch('http://localhost:5000/api')
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'No data found') {
          navigate('/login');
          return;
        }
        setBackendData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        navigate('/login');
      });
  })

  const logout = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (response.ok) {
            const data = await response.json();
            if (data.message === 'Logout successful') {
                navigate('/login');
                return;
            }
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

  return (
      <div className="background-container">
        <center><h1>Your Result</h1></center>
      {(typeof backendData.results === 'undefined') ? (
        <p>Loading...</p>
      ) : (
      <center>
        <div className="table-container">
        <table class="table table-sm table-dark">
         <thead>
            <tr>
              <th>ranking</th>
              <th>Player</th>
              <th>Point</th>
            </tr>
          </thead>
          <tbody>
            {backendData.results.map((result, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{result.player}</td>
                <td>{result.point}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        </center>
      )}
      <center><button className="btn btn-primary pos" onClick={logout}>Logout</button></center>
    </div>
  )
}

export default App;