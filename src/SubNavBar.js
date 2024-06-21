import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const SubNavBar = () => {
  return (
    <Nav className="justify-content-center bg-dark py-2">
      <LinkContainer to="/category">
        <Nav.Link>Categories</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/category/macBook">
        <Nav.Link>MacBook</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/category/iPhone">
        <Nav.Link>iPhone</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/category/iPad">
        <Nav.Link>iPad</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/category/watch">
        <Nav.Link>Watch</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/category/airPods">
        <Nav.Link>AirPods</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/category/tvandhome">
        <Nav.Link>TV & Home</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/category/others">
        <Nav.Link>Others</Nav.Link>
      </LinkContainer>
    </Nav>
  );
};

export default SubNavBar;
