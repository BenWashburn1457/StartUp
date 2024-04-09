import React, { useState } from 'react';
// import './Login.css';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <div className="login">
      <h2>Prepare yourself for the adventure of a lifetime</h2>
      <div id="loginFormat">
        {authState === AuthState.Authenticated && (
          <><p>Login to play</p><Authenticated userName={userName} onLogOut={() => onAuthChange(userName, AuthState.Unauthenticated)} /></>
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
            />
        )}
        
      </div>
    </div>
  )
}
