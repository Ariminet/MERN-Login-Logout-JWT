import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

import styled from 'styled-components';

export default function Home() {
  const { userData } = useContext(UserContext);
  console.log(userData);

  const Welcome = styled.h1`
    color: palevioletred;
  `;

  return (
    <div className="page">
      {userData.user ? (
        <Welcome>Welcome {userData.user.displayName}</Welcome>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <Link to="/login">Log in</Link>
        </>
      )}
    </div>
  );
}
