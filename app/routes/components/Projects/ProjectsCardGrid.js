import React from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardBody,
  Badge,
  CardFooter,
  Progress,
  Avatar,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./../../../components";

import { randomArray, randomAvatar } from "./../../../utilities";





const ProjectsCardGrid = ({ project,index }) => {
  const { projectName, supervisorFirstName, supervisorLastName, startDate, endDate, status } = project;
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will display as "MM/DD/YYYY" by default
  };

  const statusBadge = {
    Active: <Badge pill color="success">Active</Badge>,
    Suspended: <Badge pill color="danger">Suspended</Badge>,
    Waiting: <Badge pill color="warning">Waiting</Badge>,
    Paused: <Badge pill color="secondary">Paused</Badge>,
  };
  const taskCompleted = ["15", "28", "30", "80", "57", "90"];


  return(
  <React.Fragment>
    {/* START Card */}
    <Card>
      <CardBody>
        {statusBadge[status]}
        <div className="mb-2">
          <a href="#" className="mr-2">
            <i className="fa fa-fw fa-star-o"></i>
          </a>
          <Link to="/apps/tasks/grid" className="text-decoration-none">
             {projectName}
          </Link>
        </div>
        <div className="mb-3">
          Supervisor: {supervisorFirstName} {supervisorLastName}
          <br />
          Start Date: {formatDate(startDate)}
          <br />
          End Date: {formatDate(endDate)}
        </div>
        <div className="mb-3">
          <Progress
            value={randomArray(taskCompleted)}
            style={{ height: "5px" }}
            className="mb-2"
          />
          <div>
            Tasks Completed:
            <span className="text-inverse">36/94</span>
          </div>
        </div>
        <div>
          <Avatar.Image size="md" src={randomAvatar()} className="mr-2" />
          <Avatar.Image size="md" src={randomAvatar()} className="mr-2" />
          <Avatar.Image size="md" src={randomAvatar()} className="mr-2" />
        </div>
      </CardBody>
      <CardFooter className="d-flex">
        <span className="align-self-center">20 Sep, Fri, 2018</span>
        <UncontrolledButtonDropdown className="align-self-center ml-auto">
          <DropdownToggle color="link" size="sm" className="pr-0">
            <i className="fa fa-gear" />
            <i className="fa fa-angle-down ml-2" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <i className="fa fa-fw fa-folder-open mr-2"></i>
              View
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-fw fa-ticket mr-2"></i>
              Add Task
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-fw fa-paperclip mr-2"></i>
              Add Files
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <i className="fa fa-fw fa-trash mr-2"></i>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </CardFooter>
    </Card>
    {/* END Card */}
  </React.Fragment>
 );
};

export { ProjectsCardGrid };
