import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import UpdateTaskModal from "../../../components/Tasks/UpdateTaskModal";

import {
  Avatar,
  CustomInput,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  AvatarAddOn,
} from "./../../../../components";

import { randomArray, randomAvatar } from "./../../../../utilities";

const badges = ["secondary"];

const avatarStatus = ["secondary", "warning", "danger", "success"];

const prioStatus = [
  <React.Fragment key="1">
    <i className="fa fa-circle text-success mr-2"></i>
    Small
    <i className="fa fa-angle-down ml-2" />
  </React.Fragment>,
  <React.Fragment key="2">
    <i className="fa fa-circle text-primary mr-2"></i>
    Normal
    <i className="fa fa-angle-down ml-2" />
  </React.Fragment>,
  <React.Fragment key="3">
    <i className="fa fa-circle text-warning mr-2"></i>
    High
    <i className="fa fa-angle-down ml-2" />
  </React.Fragment>,
  <React.Fragment key="3">
    <i className="fa fa-circle text-danger mr-2"></i>
    Big
    <i className="fa fa-angle-down ml-2" />
  </React.Fragment>,
];

const TrTableTasksList = ({ task,refreshTasks }) => {
  const { id,taskName, taskDescription, dueDate } = task;
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const toggleUpdateModal = () => setIsUpdateModalOpen(!isUpdateModalOpen);

  const handleOpenUpdateModal = () => {
    setSelectedTask(task);
    setTimeout(toggleUpdateModal, 0);
  };

   const handleTaskUpdated = () => {
    refreshTasks(); 
  };

  const handleDelete = async () => {
    toast((t) => (
        <div>
            <p>Are you sure you want to delete this task?</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                    onClick={async () => {
                        toast.dismiss(t.id); // Close the toast
                        try {
                            await axios.delete(`http://localhost:5197/task/${id}`);
                            toast.success("Task deleted successfully!");
                        } catch (error) {
                            console.error("Error deleting Task:", error);
                            toast.error("Failed to delete Task.");
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

  
  return(
  <React.Fragment>
    <tr>
      <td className="align-middle">
        <CustomInput
          type="checkbox"
          label=""
          inline
        />
      </td>
      <td className="align-middle">
        <UncontrolledButtonDropdown>
          <DropdownToggle
            color="link"
            link
            size="sm"
            className="pl-0 mb-3 text-decoration-none"
          >
            {randomArray(prioStatus)}
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header>Select Priority</DropdownItem>
            <DropdownItem>
              <i className="fa fa-circle text-danger mr-2"></i>
              Big
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-circle text-warning mr-2"></i>
              High
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-circle text-primary mr-2"></i>
              Normal
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-circle text-success mr-2"></i>
              Small
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </td>
      <td className="align-middle">
        <div>
          <Link to={`/apps/task-details/${id}`} className="text-decoration-none">
          {taskName}
          </Link>
        </div>
        <p className="mb-0">
          <span className="mr-2">{taskDescription}</span>
        </p>
      </td>
      <td className="align-middle">
        <Avatar.Image
          size="md"
          src={randomAvatar()}
          className="mr-3"
          addOns={[
            <AvatarAddOn.Icon
              className="fa fa-circle"
              color="white"
              key="avatar-icon-bg"
            />,
            <AvatarAddOn.Icon
              className="fa fa-circle"
              color={randomArray(avatarStatus)}
              key="avatar-icon-fg"
            />,
          ]}
        />
      </td>
      <td className="align-middle">{formatDate(dueDate)}</td>
      <td className="align-middle text-right">
        <UncontrolledButtonDropdown className="align-self-center ml-auto">
          <DropdownToggle color="link" size="sm">
            <i className="fa fa-gear" />
            <i className="fa fa-angle-down ml-2" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={handleOpenUpdateModal}>
              <i className="fa fa-fw fa-edit mr-2"></i>
              Update
            </DropdownItem>
            <DropdownItem >
              <i className="fa fa-fw fa-plus mr-2"></i>
              Add Task
            </DropdownItem>
            <DropdownItem>
              <i className="fa fa-fw fa-paperclip mr-2"></i>
              Add Files
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem onClick={handleDelete}>
              <i className="fa fa-fw fa-trash mr-2"></i>
              Delete
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      </td>

    </tr>
    {selectedTask && (
        <UpdateTaskModal 
          isOpen={isUpdateModalOpen} 
          toggle={toggleUpdateModal} 
          task={selectedTask} 
          refreshTasks={refreshTasks} 
          onTaskUpdated={handleTaskUpdated}
        />
      )}
  </React.Fragment>
 );
};


export { TrTableTasksList };
