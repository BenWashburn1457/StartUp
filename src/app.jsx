import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { AuthState } from './login/authState';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
  
    return (
      <BrowserRouter>
          <header className='container-fluid'>
            <nav className='navbar fixed-top navbar-dark'>
              <menu className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink className='nav-link' to=''>
                    Login
                  </NavLink>
                </li>
                {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='play'>
                    Play
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='scores'>
                    Scores
                  </NavLink>
                </li>
              )}
              </menu>
            </nav>
          </header>
          <Routes>
            <Route
              path='/'
              element={
                <Login
                  userName={userName}
                  authState={authState}
                  onAuthChange={(userName, authState) => {
                    setAuthState(authState);
                    setUserName(userName);
                  }}
                />
              }
              exact
            />
            <Route path='/play' element={<Play userName={userName}/>} />
            <Route path='/scores' element={<Scores/>} />
            <Route path='*' element={<NotFound />} />
          </Routes>
  
          <footer>
            <div>
              <span>Created by Ben Washburn</span>
              <a href='https://github.com/BenWashburn1457/StartUp.git'>
                The GitHub
              </a>
            </div>
          </footer>
      </BrowserRouter>
    );
  }
  
  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  
  export default App;