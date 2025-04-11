import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import AddTaskModal from "../../../components/Tasks/AddTaskModal";
import { useState } from "react";
import { randomArray} from "./../../../../utilities";
import axios from "axios";
import toast from 'react-hot-toast';
import UpdateProjectModal from "../../../components/Projects/UpdateProjectModal";

import {
  Badge,
  Progress,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./../../../../components";
const badges = ["secondary"];
/*eslint-disable */
const TrTableProjectsList = ({ project, index, refreshProjects }) => {
  const { id,projectName, supervisorFirstName, supervisorLastName, startDate, endDate, status,department,level } = project;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  

  const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  const handleOpenUpdateModal = () => {
    setSelectedProject(project);
    setTimeout(toggleUpdateModal, 0); 
  };

  const handleProjectUpdated = () => {
    refreshProjects(); 
  }; 
  
  const handleDelete = async () => {
    toast((t) => (
        <div>
            <p>Are you sure you want to delete this project?</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                    onClick={async () => {
                        toast.dismiss(t.id); 
                        try {
                            await axios.delete(`http://localhost:5197/project/${id}`);
                            toast.success("Project deleted successfully!");
                            refreshProjects();
                        } catch (error) {
                            console.error("Error deleting project:", error);
                            toast.error("Failed to delete project.");
                        }
                    }}
                    style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                    }}
                >
                    Yes
                </button>
                <button
                    onClick={() => toast.dismiss(t.id)}
                    style={{
                        background: "gray",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        cursor: "pointer",
                        borderRadius: "5px",
                    }}
                >
                    No
                </button>
            </div>
        </div>
    ), { duration: Infinity });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); 
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
                    {department}
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
          {level || "PFA1"}
          </td>
          <td className="align-middle text-right">
              <UncontrolledButtonDropdown>
                  <DropdownToggle color="link" outline>
                      <i className="fa fa-gear" />
                      <i className="fa fa-angle-down ml-2" />
                  </DropdownToggle>
                  <DropdownMenu right>
                      <DropdownItem onClick={handleOpenUpdateModal}>
                          <i className="fa fa-fw fa-edit mr-2"></i> Update
                      </DropdownItem>
                      <DropdownItem onClick={toggleTaskModal}>
                          <i className="fa fa-fw fa-plus mr-2"></i> Add Task
                      </DropdownItem>
                      <DropdownItem>
                          <i className="fa fa-fw fa-paperclip mr-2"></i> Add Files
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={handleDelete}>
                          <i className="fa fa-fw fa-trash mr-2"></i> Delete
                      </DropdownItem>
                  </DropdownMenu>
              </UncontrolledButtonDropdown>
          </td>
          <AddTaskModal isOpen={isTaskModalOpen} toggle={toggleTaskModal} projectId={project.id} />
          <UpdateProjectModal isOpen={isUpdateModalOpen} toggle={toggleUpdateModal} project={selectedProject} onProjectUpdated={handleProjectUpdated}/>
      </tr>
      
  );
};

export { TrTableProjectsList };

