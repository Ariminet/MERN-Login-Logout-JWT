import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

const Menu = styled.nav`
  padding: auto 0;
`;

const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 0.5em;
  padding: 0.25em 2em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  &:hover {
    background: #a4303f;
    color: white;
    border: 2px solid #a4303f;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px palevioletred;
  }
`;

export default function AuthOptions() {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => {
    history.push('/register');
  };
  const login = () => {
    history.push('/login');
  };
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <Menu>
      {userData.user ? (
        <Button onClick={logout}>Log Out</Button>
      ) : (
        <>
          <Button onClick={register}>Register</Button>
          <Button onClick={login}>Log In</Button>
        </>
      )}
    </Menu>
  );
}
