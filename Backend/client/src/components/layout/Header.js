import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';
import styled from 'styled-components';

const HeaderNav = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0.5em 2em;
`;

const HomeLink = styled.h1`
  color: palevioletred;
  &:hover {
    color: #a4303f;
  }
`;

export const Header = () => {
  return (
    <HeaderNav>
      <Link to="/">
        <HomeLink>My Web Page</HomeLink>
      </Link>
      <AuthOptions />
    </HeaderNav>
  );
};
