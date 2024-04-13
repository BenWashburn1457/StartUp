import React, { useState } from 'react';
import './login.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  let unauthorized = localStorage.getItem('logout');
  if(unauthorized){
    localStorage.clear();
    try {
      const response =  fetch('/api/clear/cookie', {
          method: 'POST',
      });
  } catch (error) {
      console.error('Error posting data: ', error);
      throw error; // Re-throwing the error for further handling
  }
    authState = AuthState.Unauthenticated
    window.location.reload();
  }

  return (
    <div className="login">
      <div className="title">
        <img id="pic1" width="200px" src="2048_adventure1.jpg" alt="adventure" />
        <h3 id="title">2048</h3> 
        <img width="200px" src="2048_adventure.jpg" alt="adventure" />
      </div>
      <main>
        <h2>Prepare yourself for the adventure of a lifetime</h2>
        <div id="loginFormat">
          {authState === AuthState.Authenticated && (
            <><Authenticated userName={userName} onLogOut={() => onAuthChange(userName, AuthState.Unauthenticated)} /></>
          )}
          {authState === AuthState.Unauthenticated && (
            <div>
              <p>Login to play</p>
              <Unauthenticated
                userName={userName}
                onLogin={(loginUserName) => {
                  onAuthChange(loginUserName, AuthState.Authenticated);
                }}
                />
            </div>
          )}
          
        </div>
      </main>
    </div>
  )
}
