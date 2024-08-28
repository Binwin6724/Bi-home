// src/components/Navigation.js

import React from "react";
import {
  Navbar,
  Container,
} from "react-bootstrap";

function Navigation() {
  return (
    <Navbar bg="light">
      <Container fluid>
        <div>
          <Navbar.Brand href="/" style={{marginLeft:"20px"}}>BI Home</Navbar.Brand>
        </div>
      </Container>
    </Navbar>
  );
}

export default Navigation;
