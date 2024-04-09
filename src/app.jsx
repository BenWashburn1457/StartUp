import React from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
// import { Play } from './play/play';
// import { Scores } from './scores/scores';
import { AuthState } from './login/authState';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './app.css';

function App() {
    const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
    const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
    const [authState, setAuthState] = React.useState(currentAuthState);
  
    return (
      <BrowserRouter>
        <div className='body bg-dark text-light'>
          <header className='container-fluid'>
            <nav className='navbar fixed-top navbar-dark'>
              <div className='navbar-brand'>
                2048<sup>&reg;</sup>
              </div>
              <menu className='navbar-nav'>
                <li className='nav-item'>
                  <NavLink className='nav-link' to=''>
                    Login
                  </NavLink>
                </li>
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
            <Route path='*' element={<NotFound />} />
          </Routes>
  
          <footer className='bg-dark text-dark text-muted'>
            <div className='container-fluid'>
              <span className='text-reset'>Author Name(s)</span>
              <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
                Source
              </a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    );
  }
  
  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  
  export default App;