import React, { useEffect, useState } from 'react';
import './App.css';
//import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {  

  const [backendData, setBackendData] = useState([{}]);

  useEffect(() => {
    fetch('/api')
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  })

  return (
      <div className="background-container">
      {(typeof backendData.results === 'undefined') ? (
        <p>Loading...</p>
      ) : (
      <center>
        <table class="table table-sm table-dark" style={{ width: '50%', maxWidth: '600px' }}>
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
        </center>
      )}
    </div>
  )
}

export default App;