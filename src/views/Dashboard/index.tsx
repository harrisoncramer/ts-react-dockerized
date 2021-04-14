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
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import Datum from "../../components/Datum";
import Modal from "../../components/Modal";
import AddLinkForm from "../../components/AddLinkForm";

type PageLink = {
  id: string;
  link: string;
};

const Dashboard = (): ReactElement | null => {
  const [filter, setFilter] = useQueryParam("filter", StringParam);
  const [addModal, setAddModal] = useState(false);
  const { loading, error, data, refetch } = useQuery(SIMPLE_QUERY, {
    fetchPolicy: "no-cache",
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleAddLink = () => {
    setAddModal(false);
    refetch();
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
        <AddLinkForm handleAddLink={handleAddLink} />
      </Modal>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/data">
              Data
            </Nav.Link>
            <NavDropdown title="Configure" id="basic-nav-dropdown">
              <NavDropdown.Item onSelect={() => setAddModal(true)}>
                Add Link
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/settings">
                Account Settings
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={handleSearch}>
            <FormControl
              type="text"
              placeholder={filter || "Search"}
              className="mr-sm-2"
              onChange={(e) => handleOnChange(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <ListGroup>
        {data.me.pagelinks
          .filter((x: PageLink) => {
            return x.link.match(filter || "");
          })
          .map((x: PageLink) => (
            <Datum key={x.id} link={x.link} />
          ))}
      </ListGroup>
    </div>
  );
};

export default Dashboard;
