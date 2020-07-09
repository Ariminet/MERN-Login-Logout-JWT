import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './style.css';
import UserContext from './components/context/UserContext';
import Axios from 'axios';
import Home from './components/pages/Home';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import styled from 'styled-components';

const Body = styled.div`
  text-align: center;
`;

export default function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await Axios.post('/api/users/tokenIsValid', null, {
        headers: { 'x-auth-token': token },
      });
      if (tokenRes.data) {
        const userRes = await Axios.get('/api/users/', {
          headers: { 'x-auth-token': token },
        });
        console.log(userRes);
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Body>
      <BrowserRouter>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </Switch>
          <Footer />
        </UserContext.Provider>
      </BrowserRouter>
    </Body>
  );
}
