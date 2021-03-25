import React, { ReactElement, useState } from "react";
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
  Spinner,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Modal from "../../components/Modal";
import AddLinkForm from "../../components/AddLinkForm";

type PageLink = {
  id: string;
  link: string;
};

const Dashboard = (): ReactElement | null => {
  const [filter, setFilter] = useQueryParam("filter", StringParam);
  const [addModal, setAddModal] = useState(false);
  const { loading, error, data } = useQuery(SIMPLE_QUERY, {
    fetchPolicy: "no-cache",
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //console.log(filter);
  };

  const handleAddLink = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit link to database...");
  };

  const handleOnChange = (val: string): void => {
    setFilter(val);
  };

  if (loading) {
    return (
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  }
  if (error) return <div>Something wrong with server: ${error.message}</div>;
  return (
    <div>
      <Modal heading="Enter Link" show={addModal} setShow={setAddModal}>
        <AddLinkForm onSubmit={handleAddLink} />
      </Modal>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/links">
              Links
            </Nav.Link>
            <NavDropdown title="Configure" id="basic-nav-dropdown">
              <NavDropdown.Item onSelect={() => setAddModal(true)}>
                Add Link
              </NavDropdown.Item>
              <NavDropdown.Item>Delete Link</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/settings">
                Settings
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
      <div>Links</div>
      {data.me.pagelinks.map((x: PageLink) => (
        <p key={x.id}>{x.link}</p>
      ))}
    </div>
  );
};

export default Dashboard;
