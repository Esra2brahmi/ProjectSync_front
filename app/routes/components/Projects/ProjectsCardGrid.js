import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom"; 
import AddTaskModal from "../Tasks/AddTaskModal"; 
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

import UpdateProjectModal from "../Projects/UpdateProjectModal";

import { randomArray, randomAvatar } from "./../../../utilities";
const badges = ["secondary"];




const ProjectsCardGrid = ({ project,index, refreshProjects }) => {
  const { id,projectName, supervisorFirstName, supervisorLastName, startDate, endDate, status,department } = project;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // This will display as "MM/DD/YYYY" by default
  };

  const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  const handleOpenUpdateModal = () => {
    setSelectedProject(project);
    setTimeout(toggleUpdateModal, 0); 
  };

  const handleProjectUpdated = () => {
    refreshProjects(); 
  }; 


  const statusBadge = {
    Active: <Badge pill color="success">Active</Badge>,
    Suspended: <Badge pill color="danger">Suspended</Badge>,
    Waiting: <Badge pill color="warning">Waiting</Badge>,
    Paused: <Badge pill color="secondary">Paused</Badge>,
  };
  const taskCompleted = ["15", "28", "30", "80", "57", "90"];

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const toggleTaskModal = () => {
    setIsTaskModalOpen(!isTaskModalOpen);
  };


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
          <Link to={`/apps/tasks/grid/${id}`} className="text-decoration-none">
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
        <p className="mb-0">
                <Badge pill color={randomArray(badges)} className="mr-1">
                    {department}
                    {/*idk how to change this but im thinking about bagdes like genie info/indus/meca.. and get them from backend*/}
                </Badge>
        </p>
        <UncontrolledButtonDropdown className="align-self-center ml-auto">
          <DropdownToggle color="link" size="sm" className="pr-0">
            <i className="fa fa-gear" />
            <i className="fa fa-angle-down ml-2" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={handleOpenUpdateModal}>
              <i className="fa fa-fw fa-edit mr-2"></i>
              Update 
            </DropdownItem>
            <DropdownItem onClick={toggleTaskModal}>
              <i className="fa fa-fw fa-ticket mr-2" ></i>
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
    <AddTaskModal isOpen={isTaskModalOpen} toggle={toggleTaskModal} projectId={project.id} />
    <UpdateProjectModal isOpen={isUpdateModalOpen} toggle={toggleUpdateModal} project={selectedProject} onProjectUpdated={handleProjectUpdated}/>

  </React.Fragment>
 );
};

export { ProjectsCardGrid };
