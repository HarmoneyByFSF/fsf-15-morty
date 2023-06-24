import React from "react";
import { Navbar, Nav, Container, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar bg="body-tertiary" expand="lg">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarSupportedContent" />
        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/" className="nav-link" aria-current="page" active>Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/dashboard" className="nav-link" aria-current="page" active>Dashboard</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/gamepage" className="nav-link" aria-current="page" active>Game</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/reports/expense" className="nav-link" aria-current="page" active>Report</Link>
            </Nav.Link>
            <NavDropdown  className="nav-link" title="My Expenses" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/expense" className="nav-link" aria-current="page" active>List of Expenses</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/add-expense" className="nav-link" aria-current="page" active>Add Expense</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown  className="nav-link" title="My Incomes" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/income" className="nav-link" aria-current="page" active>List of Income</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/add-income" className="nav-link" aria-current="page" active>Add Income</Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown  className="nav-link" title="Others" id="basic-nav-dropdown">
            <NavDropdown.Item >
              <Link to="/goal" className="nav-link" aria-current="page" active>Goal</Link>
            </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/saving-pot" className="nav-link" aria-current="page" active>Saving Pot</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/chatbot" className="nav-link" aria-current="page" active>Chat Bot</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
          <NavDropdown  className="nav-link" title="User" id="basic-nav-dropdown">
              <NavDropdown.Item>
                <Link to="/login" className="nav-link" aria-current="page" active>Login</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/register" className="nav-link" aria-current="page" active>Register</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;