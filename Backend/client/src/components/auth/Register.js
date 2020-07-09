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
const RegisterForm = styled.form`
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

export const Register = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();

  const history = useHistory();

  const { setUserData } = useContext(UserContext);

  const login = (e) => {
    e.preventDefault();
    history.push('/login');
  };

  const submit = async (e) => {
    e.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };

      await Axios.post('/api/users/register', newUser);
      const loginRes = await Axios.post('/api/users/login', {
        email,
        password,
      });
      setUserData({ token: loginRes.data.token, user: loginRes.data.user });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };
  return (
    <div className="page">
      <Title>Register</Title>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <RegisterForm onSubmit={submit} className="form">
        <InputContainer>
          {/* <label htmlFor="register-email">Email</label> */}
          <Input
            type="email"
            id="register-email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <label htmlFor="register-password">Password</label> */}
          <Input
            type="password"
            id="register-password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Verify Password"
            onChange={(e) => setPasswordCheck(e.target.value)}
          />
          {/* <label htmlFor="register-displayname">Display name</label> */}
          <Input
            type="text"
            id="register-displayname"
            placeholder="Enter Display Name"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </InputContainer>
        <Button type="submit" value="Register">
          Register
        </Button>
        <Button onClick={login}>Log in</Button>
      </RegisterForm>
    </div>
  );
};
