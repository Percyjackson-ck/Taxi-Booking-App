import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const navigate = useNavigate();
    const [hasLoggedOut, setHasLoggedOut] = useState(false);

    useEffect(() => {
        if (hasLoggedOut) return;

        const logout = async () => {
            const token = localStorage.getItem('token');
            try {
                if (token) {
                    await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    localStorage.removeItem('token');
                    setHasLoggedOut(true);
                    navigate('/login');
                }
            } catch (err) {
                // 401 is expected if token is gone
                console.log("Logout error:", err.response?.status);
            } 
        };

        logout();
    }, [hasLoggedOut, navigate]);

    return <div>Logging you out...</div>;
};

export default UserLogout;
