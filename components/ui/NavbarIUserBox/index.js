import React from "react";
import { FaAngleDown, FaUserAlt } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Badge,
  ListGroup,
  ListGroupItem,
  UncontrolledTooltip,
  Nav,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { NavLink as NavLinkStrap } from "reactstrap";

const HeaderUserBox = () => {
  return (
    <>
      <UncontrolledDropdown className="position-relative ml-2">
        <DropdownToggle
          color="link"
          className="p-0 text-left d-flex btn-transition-none align-items-center"
        >
          <div className="d-block p-0 avatar-icon-wrapper">
            <Badge color="success" className="badge-circle p-top-a">
              Online
            </Badge>
            <div className="avatar-icon rounded">
              <FaUserAlt />
            </div>
          </div>
          <div className="d-none d-xl-block pl-2">
            <div className="font-weight-bold">Demo</div>
            <span className="text-black-50">Someone</span>
          </div>
          <span className="pl-1 pl-xl-3">
            <FaAngleDown />
          </span>
        </DropdownToggle>
        <DropdownMenu end className="dropdown-menu-lg overflow-hidden p-0">
          <ListGroup flush className="text-left bg-transparent">
            <ListGroupItem className="rounded-top">
              <Nav pills className="nav-neutral-primary flex-column">
                <NavItem className="nav-header d-flex text-primary pt-1 pb-2 font-weight-bold align-items-center">
                  <div>Profile options</div>
                </NavItem>
                <NavItem>
                  {/* <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    My Account
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    Profile settings
                  </NavLinkStrap>
                </NavItem>
                <NavItem>
                  <NavLinkStrap href="#/" onClick={(e) => e.preventDefault()}>
                    Active tasks
                  </NavLinkStrap> */}
                </NavItem>
              </Nav>
            </ListGroupItem>
            <ListGroupItem className="bg-transparent p-0">
              {/* <div className="grid-menu grid-menu-2col">
                <div className="py-3">
                  <div className="d-flex justify-content-center">
                    <div className="d-flex align-items-center">
                      <div>
                        <FontAwesomeIcon
                          icon={["far", "chart-bar"]}
                          className="font-size-xxl text-info"
                        />
                      </div>
                      <div className="pl-3 line-height-sm">
                        <b className="font-size-lg">$9,693</b>
                        <span className="text-black-50 d-block">revenue</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </ListGroupItem>
          </ListGroup>
        </DropdownMenu>
      </UncontrolledDropdown>
    </>
  );
};

export default HeaderUserBox;
