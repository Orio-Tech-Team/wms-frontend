import { Button, Badge } from "reactstrap";
import React from "react";
import { FaBell } from "react-icons/fa";

const Index = () => {
  return (
    <div className="d-flex align-items-center popover-header-wrapper">
      <span className="d-inline-block pr-2">
        <Button
          id="alertsPopover"
          color="neutral-success"
          className="bg-neutral-success text-success font-size-lg p-0 d-inline-block shadow-none border-0 text-center d-44 rounded position-relative"
        >
          <span>
            <Badge color="success" className="badge-circle">
              New notifications
            </Badge>
            <FaBell />
          </span>
        </Button>
      </span>
    </div>
  );
};

export default Index;
