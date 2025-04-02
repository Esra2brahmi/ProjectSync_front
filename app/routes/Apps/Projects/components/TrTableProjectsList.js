import React from "react";
import _ from "lodash";
import { faker } from "@faker-js/faker";
import { Link } from "react-router-dom";
import AddTaskModal from "../../../components/Tasks/AddTaskModal";
import { useState } from "react";
import { randomArray, randomAvatar } from "./../../../../utilities";

import {
  Badge,
  Progress,
  Avatar,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./../../../../components";
const badges = ["secondary"];
/*eslint-disable */
const TrTableProjectsList = ({ project,index }) => {
  const { id,projectName, supervisorFirstName, supervisorLastName, startDate, endDate, status } = project;
  
  

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

  const tasksCompleted = ["25", "50", "70", "90"];

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    
      const toggleTaskModal = () => {
        setIsTaskModalOpen(!isTaskModalOpen);
      };

  return (
      <tr>
          <td className="align-middle">
              <div className="text-inverse">
            <a href="#">
              <i className="fa fa-fw fa-lg fa-star-o"></i>
            </a>
              </div>
          </td>
          <td className="align-middle">
              <div>
              <Link to={`/apps/tasks/list/${id}`} className="text-decoration-none">
                {projectName}
              </Link>

              </div>
              <span>
                  Supervisor: {supervisorFirstName} {supervisorLastName}
                  <br />
                  Start Date: {formatDate(startDate)}
                  <br />
                  End Date: {formatDate(endDate)}
              </span>
              <p className="mb-0">
                <Badge pill color={randomArray(badges)} className="mr-1">
                    {faker.commerce.department()}
                    {/*idk how to change this but im thinking about bagdes like genie info/indus/meca.. and get them from backend*/}
                </Badge>
              </p>
          </td>
          <td className="align-middle">{statusBadge[status]}</td>
          <td className="align-middle">
          <Progress
            value={tasksCompleted[index % 4]}
            style={{ height: "5px" }}
            className="mb-2"
          />
              <div>
                  Tasks Completed:
                  <span className="text-inverse">36/94</span>
              </div>
          </td>
          <td className="align-middle">
              <Avatar.Image size="md" src={randomAvatar()} />
          </td>
          <td className="align-middle text-right">
              <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" outline>
                      <i className="fa fa-gear" />
                      <i className="fa fa-angle-down ml-2" />
                  </DropdownToggle>
                  <DropdownMenu right>
                      <DropdownItem>
                          <i className="fa fa-fw fa-folder-open mr-2"></i> View
                      </DropdownItem>
                      <DropdownItem onClick={toggleTaskModal}>
                          <i className="fa fa-fw fa-ticket mr-2"></i> Add Task
                      </DropdownItem>
                      <DropdownItem>
                          <i className="fa fa-fw fa-paperclip mr-2"></i> Add Files
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                          <i className="fa fa-fw fa-trash mr-2"></i> Delete
                      </DropdownItem>
                  </DropdownMenu>
              </UncontrolledButtonDropdown>
          </td>
          <AddTaskModal isOpen={isTaskModalOpen} toggle={toggleTaskModal} projectId={project.id} />
      </tr>
      
  );
};

export { TrTableProjectsList };

