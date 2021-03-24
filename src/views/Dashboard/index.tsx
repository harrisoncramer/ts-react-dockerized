import React, { ReactElement } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useQueryParam, StringParam } from "use-query-params";
import { SIMPLE_QUERY } from "../../graphql/queries";
import {
  Navbar,
  NavDropdown,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Dashboard = (): ReactElement | null => {
  const [filter, setFilter] = useQueryParam("filter", StringParam);
  const { loading, error, data } = useQuery(SIMPLE_QUERY, {
    fetchPolicy: "no-cache",
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(filter);
  };

  const handleOnChange = (val: string): void => {
    setFilter(val);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something wrong with server: ${error.message}</div>;
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/link">
              Links
            </Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/addpagelink">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dropdown2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dropdown3">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/dropdown4">
                Something Else
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder="Search"
              className="mr-sm-2"
              onChange={(e) => handleOnChange(e.target.value)}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <p>Welcome, {data.me.name}</p>
    </div>
  );
};

export default Dashboard;
