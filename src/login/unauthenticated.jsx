import React from 'react';

import Button from 'react-bootstrap/Button';
// import {MessageDialog} from '/messageDialog'

export function Unauthenticated(props) {
    const [userName, setUsername] = React.useState(props.userName);
    const [password, setPassword] = React.useState('');
    const [displayError, setDisplayError] = React.useState(null);

    async function checkLogin() {
        await loginOrCreate('/api/auth/login');
    }

    async function createUser(){
        await loginOrCreate('/api/auth/create')
    }

    async function loginOrCreate(path) {
        try{
            const response = await fetch(path, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: userName,
                    password: password
                })
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (response?.status === 200) {
                localStorage.setItem('userName', userName);
            }
        }
        catch (error) {
            console.error('Error posting data: ', error);
            throw error; // Re-throwing the error for further handling
        }
    }

    return (
        <div>
            <div className='username'>
                <input
                    className='form-control'
                    type='text'
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder='username'
                />
            </div>
            <div className='password'>
                <input
                    className='form-control'
                    type='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='password'
                />
            </div>
            <div className='playerName'>{props.username}</div>
            <Button varient='primary' onClick={createUser}>
                Create User
            </Button>
            <Button varient='secondary' onClick={checkLogin}>
                Login
            </Button>
        </div>
    )

}