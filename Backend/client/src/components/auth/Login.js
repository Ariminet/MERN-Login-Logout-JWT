import React, { useState, useContext } from 'react';
import Axios from 'axios';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import ErrorNotice from '../misc/ErrorNotice';

import styled from 'styled-components';

const Title = styled.h2`
  font-size: 2.5rem;
  color: ${(props) => (props.color ? props.color : 'palevioletred')};
`;
const LoginForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 35%;
  padding: 2.5% 2.5% 2%;
  border: 1px solid palevioletred;
`;
const InputContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 5px;
`;
const Button = styled.button`
  /* Adapt the colors based on primary prop */
  background: ${(props) => (props.primary ? 'palevioletred' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'palevioletred')};

  font-size: 1em;
  margin: 0.5em 0 0 0;
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

const Input = styled.input`
  border: 1px solid palevioletred;
  height: 2em;
  ::placeholder {
    color: palevioletred;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 5px palevioletred;
  }
`;

export const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const { setUserData } = useContext(UserContext);
  const register = (e) => {
    e.preventDefault();
    history.push('/register');
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const loginUser = { email, password };

      const loginRes = await Axios.post('/api/users/login', loginUser);
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
      console.log(loginUser);
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className="page">
      <Title>Login</Title>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

      <LoginForm onSubmit={submit} className="form">
        <InputContainer>
          {/* <label htmlFor="login-email">Email</label> */}
          <Input
            type="email"
            id="login-email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label htmlFor="login-password">Password</label> */}
          <Input
            type="password"
            id="login-password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputContainer>
        <Button type="submit" value="Login">
          Login
        </Button>
        <Button onClick={register}>Register</Button>
      </LoginForm>
    </div>
  );
};
