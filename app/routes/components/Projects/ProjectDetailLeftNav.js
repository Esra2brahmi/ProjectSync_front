import React from "react";
import { faker } from "@faker-js/faker";

import {
  InputGroup,
  Button,
  Input,
  InputGroupAddon,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Media,
  Avatar,
} from "./../../../components";
import { randomAvatar } from "./../../../utilities";

const ProjectDetailLeftNav = () => (
  <React.Fragment>
    {/* START Left Nav  */}
    <div className="mb-4">
      <div className="small mb-3">Search</div>
      <InputGroup>
        <Input placeholder="Search for..." className="bg-white" />
        <InputGroupAddon addonType="append">
          <Button outline color="secondary">
            <i className="fa fa-search"></i>
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
    {/* END Left Nav  */}
    {/* START Left Nav  */}
    <div className="mb-4">
      <div className="small mb-3">Favorites</div>
      <Nav pills vertical>
        <NavItem>
          <NavLink href="#" active>
            <i className="fa fa-fw fa-line-chart mr-2"></i>
            Overview
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <i className="fa fa-fw fa-calendar-o mr-2"></i>
            Calendar
          </NavLink>
        </NavItem>
      </Nav>
    </div>
    {/* END Left Nav  */}
    {/* START Left Nav Supervisors */}
    <div className="mb-4">
      <div className="small mb-3">Supervisors</div>
      <Nav pills vertical>
        <NavItem>
          <NavLink href="#" className="d-flex">
            <Media>
              <Media left middle className="mr-3 align-self-center">
                <Avatar.Image size="md" src={randomAvatar()} />
              </Media>
              <Media body>
                <div className="mt-0">
                  {faker.person.firstName()} {faker.person.lastName()}
                </div>
                <span className="small">
                  {faker.location.state()}, {faker.location.stateAbbr()}
                </span>
              </Media>
            </Media>
            <i className="fa fa-fw fa-circle text-success ml-auto align-self-center ml-2"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="d-flex">
            <Media>
              <Media left middle className="mr-3 align-self-center">
                <Avatar.Image size="md" src={randomAvatar()} />
              </Media>
              <Media body>
                <div className="mt-0">
                  {faker.person.firstName()} {faker.person.lastName()}
                </div>
                <span className="small">
                  {faker.location.state()}, {faker.location.stateAbbr()}
                </span>
              </Media>
            </Media>
            <i className="fa fa-fw fa-circle text-warning ml-auto align-self-center ml-2"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="d-flex">
            <Media>
              <Media left middle className="mr-3 align-self-center">
                <Avatar.Image size="md" src={randomAvatar()} />
              </Media>
              <Media body>
                <div className="mt-0">
                  {faker.person.firstName()} {faker.person.lastName()}
                </div>
                <span className="small">
                  {faker.location.state()}, {faker.location.stateAbbr()}
                </span>
              </Media>
            </Media>
            <i className="fa fa-fw fa-circle text-danger ml-auto align-self-center ml-2"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <i className="fa fa-fw fa-plus mr-2"></i>
            Add New Supervisor
          </NavLink>
        </NavItem>
      </Nav>
    </div>
    {/* END Left Nav Supervisor */}
    {/* START Left Nav Students  */}
    <div className="mb-4">
      <div className="small mb-3">Students</div>
      <Nav pills vertical>
        <NavItem>
          <NavLink href="#" className="d-flex">
            <Media>
              <Media left middle className="mr-3 align-self-center">
                <Avatar.Image size="md" src={randomAvatar()} />
              </Media>
              <Media body>
                <div className="mt-0">
                  {faker.person.firstName()} {faker.person.lastName()}
                </div>
                <span className="small">
                  {faker.location.state()}, {faker.location.stateAbbr()}
                </span>
              </Media>
            </Media>
            <i className="fa fa-fw fa-circle text-success ml-auto align-self-center ml-2"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="d-flex">
            <Media>
              <Media left middle className="mr-3 align-self-center">
                <Avatar.Image size="md" src={randomAvatar()} />
              </Media>
              <Media body>
                <div className="mt-0">
                  {faker.person.firstName()} {faker.person.lastName()}
                </div>
                <span className="small">
                  {faker.location.state()}, {faker.location.stateAbbr()}
                </span>
              </Media>
            </Media>
            <i className="fa fa-fw fa-circle text-warning ml-auto align-self-center ml-2"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" className="d-flex">
            <Media>
              <Media left middle className="mr-3 align-self-center">
                <Avatar.Image size="md" src={randomAvatar()} />
              </Media>
              <Media body>
                <div className="mt-0">
                  {faker.person.firstName()} {faker.person.lastName()}
                </div>
                <span className="small">
                  {faker.location.state()}, {faker.location.stateAbbr()}
                </span>
              </Media>
            </Media>
            <i className="fa fa-fw fa-circle text-danger ml-auto align-self-center ml-2"></i>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#">
            <i className="fa fa-fw fa-plus mr-2"></i>
            Add New Student
          </NavLink>
        </NavItem>
      </Nav>
    </div>
    {/* END Left Nav  */}
  </React.Fragment>
);

export { ProjectDetailLeftNav };
