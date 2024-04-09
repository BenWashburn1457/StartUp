import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

// import './authenticated.css';

export function Authenticated(props) {
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        clearCookie('token');
        window.location.reload();
    }

    async function clearCookie(name) {
        try {
            const response = await fetch('/api/clear/cookie', {
                method: 'POST',
            });
        } catch (error) {
            console.error('Error posting data: ', error);
            throw error; // Re-throwing the error for further handling
        }
    }

    return (
        <div>
            <div className='playerName'>{props.userName}</div>
            <Button varient='primary' onClick={()=> navigate('/play')}>
                Play
            </Button>
            <Button varient='secondary' onClick={() => logout()}>
                Logout
            </Button>
        </div>
    )
}