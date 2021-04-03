import React from "react";
import { Button, ListGroupItem } from "react-bootstrap";
export interface DatumProps {
  link: string;
}

const Datum = ({ link }: DatumProps): React.ReactElement => {
  return (
    <>
      <ListGroupItem>
        <Button variant="secondary" size="sm">
          Settings
        </Button>
        <p style={{ display: "inline", marginLeft: "5px" }}>{link}</p>
      </ListGroupItem>
    </>
  );
};

export default Datum;
