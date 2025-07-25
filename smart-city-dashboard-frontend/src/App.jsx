    import React, { useEffect, useState } from 'react';
    import axios from 'axios';
    import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
    import './App.css';

    // Import authentication-related components
    import LoginScreen from './components/LoginScreen.jsx';
    import RegisterScreen from './components/RegisterScreen.jsx';
    import PrivateRoute from './components/PrivateRoute.jsx';

    // Import screen components
    import ProfileScreen from './screens/ProfileScreen.jsx';
    import DashboardScreen from './screens/DashboardScreen.jsx';

    // Define your deployed backend API base URL
    const API_BASE_URL = 'https://week-8-capstone_-3-stax.onrender.com'; // <--- UPDATED BASE URL for root API check

    function App() {
      const [backendMessage, setBackendMessage] = useState('');

      useEffect(() => {
        const fetchBackendData = async () => {
          try {
            const response = await axios.get(API_BASE_URL); // <--- UPDATED URL
            setBackendMessage(response.data);
          } catch (error) {
            console.error('Error fetching data from backend:', error);
            setBackendMessage('Failed to connect to deployed backend.');
          }
        };

        fetchBackendData();
      }, []);

      return (
        <BrowserRouter>
          <div className="App">
            <nav style={{ padding: '10px', background: '#333', color: 'white', display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Home</Link>
              <Link to="/login" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Login</Link>
              <Link to="/register" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Register</Link>
              <Link to="/profile" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Profile</Link>
              <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', padding: '5px 10px' }}>Dashboard</Link>
            </nav>

            <header style={{ padding: '20px', background: '#282c34', color: 'white', borderBottom: '1px solid #61dafb' }}>
              <h1>Smart City Dashboard</h1>
              <p>Status: {backendMessage}</p>
            </header>

            <main style={{ padding: '20px', textAlign: 'center' }}>
              <Routes>
                <Route path="/" element={
                  <div>
                    <h2>Welcome to the Smart City Dashboard!</h2>
                    <p>Please log in to view live data.</p>
                  </div>
                } />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />

                <Route path="" element={<PrivateRoute />}>
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/dashboard" element={<DashboardScreen />} />
                </Route>

              </Routes>
            </main>
          </div>
        </BrowserRouter>
      );
    }

    export default App;
    