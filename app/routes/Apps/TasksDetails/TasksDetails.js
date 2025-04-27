import React,{ useEffect, useState,useCallback } from "react";
import { faker } from "@faker-js/faker";
import TaskAttachments from "./TaskAttachments";
import {
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  Table,
  Button,
  Card,
  CardBody,
  CardFooter,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Media,
  Input,
  InputGroup,
  CustomInput,
  InputGroupAddon,
  Badge,
  Avatar,
  Alert,
} from "./../../../components";
import { randomAvatar } from "./../../../utilities";
import { HeaderMain } from "../../components/HeaderMain";
import { ProjectsSmHeader } from "../../components/Projects/ProjectsSmHeader";
import { Attachment } from "../../components/Attachment";
import { Comment } from "../../components/Comment";
import { useLocation } from 'react-router-dom';

const TasksDetails = () => {
  const location = useLocation();
  const [task, setTask] = useState({ 
    attachments: [],
    taskName: '',
    taskDescription: '',
    dueDate: '',
    projectId: null
  });
  const [project, setProject] = useState({});
  const [students, setStudents] = useState([]);
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pathSegments = location.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  // Memoize the callback to prevent unnecessary re-renders
  const handleAttachmentsUpdate = useCallback((updatedAttachments) => {
    console.log('Updating attachments with:', updatedAttachments);
    setTask(prev => {
    // Ensure we're getting a proper array
    const newAttachments = Array.isArray(updatedAttachments) ? updatedAttachments : [];
    
    // Deep comparison
    if (JSON.stringify(prev.attachments) === JSON.stringify(newAttachments)) {
      return prev;
    }
      return { ...prev, attachments: newAttachments  };
    });
  }, []);

  // Fetch task details and assigned students when component mounts
  useEffect(() => {
    const fetchTaskAndStudents = async () => {
      if (!id) return;  
      
      try {
        // Fetch task details
        const taskResponse = await fetch(`http://localhost:5197/task/${id}`);
        const taskData = await taskResponse.json();
        setTask(prev => ({
          ...prev,
          ...taskData,
          attachments: Array.isArray(taskData.attachments) ? taskData.attachments : prev.attachments
        }));

        // Fetch assigned student
        const studentResponse = await fetch(`http://localhost:5197/task/${id}/student`);
        if (studentResponse.ok) {
          const studentData = await studentResponse.json();
          console.log("Assigned student:", studentData);
          // Store the single student in state
          setAssignedStudents(studentData ? [studentData] : []);
        } else if (studentResponse.status === 404) {
          // No student assigned yet
          setAssignedStudents([]);
        } else {
          console.error("Failed to fetch assigned student. Status:", studentResponse.status);
          setAssignedStudents([]);
        }

        // Fetch project details if needed
        if (taskData.projectId) {
          fetchProject(taskData.projectId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setAssignedStudents([]);
      }
    };

    fetchTaskAndStudents();
  }, [id]);

  const { taskName, taskDescription, dueDate,projectId } = task;

  const fetchProject = async (projectId) => {
    try {
      const response = await fetch(`http://localhost:5197/project/${projectId}`);
      const data = await response.json();
      setProject(data);
    } catch (error) {
      console.error("Error fetching project detail:", error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  
  const { projectName, supervisorFirstName,supervisorLastName, status,startDate,endDate,department } = project;
  
  // Add useEffect to fetch students when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:5197/user");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleAddStudent = async (student) => {
    try {
      const response = await fetch("http://localhost:5197/task/assign-student", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          TaskId: parseInt(id),
          UserId: student.id
        })
      });

      if (!response.ok) {
        if (response.status === 400) {
          setAlertMessage("This task is already assigned to a student");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          return;
        }
        throw new Error("Failed to assign student");
      }

      // Refresh assigned student
      const studentResponse = await fetch(`http://localhost:5197/task/${id}/student`);
      if (studentResponse.ok) {
        const studentData = await studentResponse.json();
        console.log("Updated assigned student:", studentData);
        setAssignedStudents(studentData ? [studentData] : []);
      } else if (studentResponse.status === 404) {
        setAssignedStudents([]);
      } else {
        console.error("Failed to refresh assigned student. Status:", studentResponse.status);
      }
      
      setDropdownOpen(false);
      setSearchTerm("");
    } catch (error) {
      console.error("Error assigning student:", error);
    }
  };

  const filteredStudents = students.filter(student =>
    `${student.userFirstName} ${student.userLastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
  <React.Fragment>
    <Container>
      <HeaderMain title="Tasks Details" className="mb-5 mt-4" />
      {/* START Header 1 */}
      <Row>
        <Col lg={3}>
          {/* START Left Nav  */}
          <div className="mb-5">
            <div className="small mb-3">Task Details</div>
            <Table size="sm">
              <tbody>
                <tr>
                  <td className="align-middle">Project</td>
                  <td className="text-right">
                    <a href="#" className="text-decoration-none">
                      {projectName}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">Assigned by</td>
                  <td className="text-right">
                    <a href="#" className="text-decoration-none">
                    {`${supervisorFirstName} ${supervisorLastName}`}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">Start Date</td>
                  <td className="text-right">{formatDate(startDate)}</td>
                </tr>
                <tr>
                  <td className="align-middle">End Date</td>
                  <td className="text-right">{formatDate(endDate)}</td>
                </tr>
                <tr>
                  <td className="align-middle">Priority</td>
                  <td className="text-right">
                    <UncontrolledButtonDropdown>
                      <DropdownToggle
                        color="link"
                        className="p-0 text-decoration-none"
                      >
                        <i className="fa fa-circle text-success mr-2"></i>
                        Small
                        <i className="fa fa-angle-down ml-2" />
                      </DropdownToggle>
                      <DropdownMenu right>
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
                        <DropdownItem active>
                          <i className="fa fa-circle text-success mr-2"></i>
                          Small
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledButtonDropdown>
                  </td>
                </tr>
                <tr>
                  <td className="align-middle">Progress</td>
                  <td className="align-middle text-right">30%</td>{/*status : doing to do done*/}
                </tr>
                <tr>
                  <td className="align-middle">status</td>
                  <td className="align-middle text-right">{status}</td>
                </tr>
                <tr>
                  <td className="align-middle">Due Date</td>
                  <td className="align-middle text-right">
                      {formatDate(dueDate)}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
          {/* END Left Nav  */}
          {/* START Left Nav  */}
          <div className="mb-4">
            <div className="small mb-3">Assigned to</div>
            <Nav pills vertical>
              {assignedStudents.length > 0 ? (
                <NavItem>
                  <NavLink href="#" className="d-flex">
                    <Media>
                      <Media left middle className="mr-3 align-self-center">
                        <Avatar.Image size="md" src={randomAvatar()} />
                      </Media>
                      <Media body>
                        <div className="mt-0">
                          {assignedStudents[0].userFirstName} {assignedStudents[0].userLastName}
                        </div>
                        <div className="small text-muted">
                          {assignedStudents[0].department}
                        </div>
                      </Media>
                    </Media>
                    <i className="fa fa-fw fa-circle text-success ml-auto align-self-center ml-2"></i>
                  </NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink href="#" className="text-muted">
                    No student assigned
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <UncontrolledButtonDropdown isOpen={dropdownOpen} toggle={() => setDropdownOpen(!dropdownOpen)}>
                  <DropdownToggle color="link" className="p-0">
                    <NavLink href="#">
                      <i className="fa fa-fw fa-plus mr-2"></i>
                      {assignedStudents.length > 0 ? "Change Student" : "Assign Student"}
                    </NavLink>
                  </DropdownToggle>
                  <DropdownMenu 
                    style={{ 
                      width: "300px",
                      position: "fixed",
                      top: "100px",
                      left: "calc(25% + 50px)",
                      zIndex: 1000,
                      transform: "translateX(0)",
                      marginLeft: "auto"
                    }}
                  >
                    <div className="p-2">
                      <Input
                        type="text"
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                    {filteredStudents.map((student) => (
                      <DropdownItem
                        key={student.id}
                        onClick={() => handleAddStudent(student)}
                      >
                        {student.userFirstName} {student.userLastName}
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              </NavItem>
            </Nav>
          </div>
          {/* END Left Nav  */}
        </Col>
        <Col lg={9}>
          <ProjectsSmHeader
            subTitle="Tasks"
            subTitleLink="/apps/tasks/grid"
            title="Task Details"
          />
          {/* START Right Content */}
          <Card>
            <CardBody>
              <Media>
                <Media left href="#">
                  <CustomInput
                    type="checkbox"
                    id="checkboxTaskDetails"
                    label=""
                    inline
                  />
                </Media>
                <Media body>
                  <div className="mb-3">
                    <h5>
                      {taskName}
                    </h5>
                    <Badge pill color="primary" className="mr-1">
                      {department}
                    </Badge>
                  </div>
                </Media>
              </Media>
              <p className="mb-4">{taskDescription}</p>
              {/* START Atachemnts */}
              <TaskAttachments 
                  taskId={id}
                  attachments={task.attachments || []}
                  onAttachmentsUpdate={handleAttachmentsUpdate}
                />
              {/* END Atachemnts */}
              <div className="mb-3">
                <span className="small mr-3">Comments</span>
                <Badge pill color="secondary">
                  3
                </Badge>
              </div>
              <Comment />
              <Comment />
              {/* END Comment Media */}
            </CardBody>
            <CardFooter>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <Button color="secondary" outline>
                    <i className="fa fa fa-paperclip"></i>
                  </Button>
                </InputGroupAddon>
                <Input placeholder="Your message..." />
                <InputGroupAddon addonType="append">
                  <Button color="primary">
                    <i className="fa fa fa-send"></i>
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </CardFooter>
          </Card>
          {/* END Right Content */}
        </Col>
      </Row>
      {/* END Header 1 */}

      {/* Alert Notification */}
      {showAlert && (
        <Alert 
          color="warning" 
          className="position-fixed" 
          style={{ 
            top: '80px', 
            right: '20px', 
            zIndex: 1000,
            minWidth: '300px',
            padding: '15px',
            margin: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '4px'
          }}
        >
          {alertMessage}
        </Alert>
      )}
    </Container>
  </React.Fragment>
 );
};

export default TasksDetails;
