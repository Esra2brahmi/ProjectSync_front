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

  useEffect(() => {
          const fetchTask = async () => {
              if (!id) return;  
      
              try {
                  const response = await fetch(`http://localhost:5197/task/${id}`);
                  const data = await response.json();
                  setTask(prev => ({
                  ...prev,
                  ...data,
                  // Ensure attachments are always an array
                  attachments: Array.isArray(data.attachments) ? data.attachments : prev.attachments
                }));

                  // Fetch project details once we have projectId
                  if (data.projectId) {
                    fetchProject(data.projectId);
                  }
              } catch (error) {
                  console.error("Error fetching task detail:", error);
              }
          };
      
          fetchTask();
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
                  Add New People
                </NavLink>
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
    </Container>
  </React.Fragment>
 );
};




export default TasksDetails;
