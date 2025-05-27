import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const CaptainLogout = () => {
    const [hasLoggedOut, setHasLoggedOut] = useState(false);
    const navigate = useNavigate();
    const [counter, setCounter] = useState(0);

    // This useEffect will only run once, without looping
    useEffect(() => {
        // console.log(`useEffect called #${counter + 1}, Current counter value: ${counter}`);

        if (hasLoggedOut) return;

        // Increment counter
        setCounter((prev) => prev + 1);

        const logout = async () => {
            const token = localStorage.getItem('token');
            console.log("Token:", token);

            try {
                if (token) {
                    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // console.log(response);

                    localStorage.removeItem('token');
                    setHasLoggedOut(true);
                    navigate('/captain-login');
                }
            } catch (err) {
                console.log("Logout error:", err.response?.status);
            }
        };

        logout();
    }, [hasLoggedOut, navigate]); // Removed counter from the dependency array

    return <div>Logging you out...</div>;
};

export default CaptainLogout;
