import React, { useState, useEffect } from "react";
import axios from "axios";
import { faker } from "@faker-js/faker";
import AddSupervisorModal from "./AddSupervisorModal";
import UpdateSupervisorModal from "./UpdateSupervisorModal";
import AddJuryMemberModal from "./AddJuryMemberModal";
import UpdateJuryMemberModal from "./UpdateJuryMemberModal";
import {
  Container,
  Row,
  Col,
  Card,
  ButtonToolbar,
  Button,
  ButtonGroup,
  CardBody,
  CardFooter,
  Table,
  TabPane,
  Badge,
  Nav,
  NavItem,
  Pagination,
  PaginationLink,
  PaginationItem,
  UncontrolledTooltip,
  UncontrolledTabs,
} from "./../../../components";

import { HeaderMain } from "../../components/HeaderMain";
import { Profile } from "../../components/Profile";
import { DlRowContacts } from "../../components/Profile/DlRowContacts";
import { DlRowAddress } from "../../components/Profile/DlRowAddress";
import { TrTableClients } from "./components/TrTableClients";
import { TrTableCompanies } from "./components/TrTableCompanies";
import { TrTableJuryMembers } from "./components/TrTableJuryMembers";


const Clients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [supervisors, setSupervisors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSupervisor, setSelectedSupervisor] = useState(null); 
  const [selectedJuryMember, setselectedJuryMember] = useState(null); 
  const [departments, setDepartments] = useState([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [juryMembers, setJuryMembers] = useState([]);
  const [isUpdateModalJuryOpen, setIsUpdateModalJuryOpen] = useState(false);
  useEffect(() => {
    fetchSupervisors();
    fetchJuryMembers();
  }, []);
  
  /*For Supervisors */
  const fetchSupervisors = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5197/api/Supervisor");
      setSupervisors(response.data);
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    } finally {
      setLoading(false);
    }
  };

   const handleAddSupervisor = async (supervisorData) => {
    try {
      await axios.post("http://localhost:5197/api/Supervisor", supervisorData);
      await fetchSupervisors(); 
    } catch (error) {
      console.error("Error adding supervisor:", error);
    }
  };
  const handleUpdateSupervisor = async (updatedData) => {
    try {
      await axios.put(`http://localhost:5197/api/Supervisor/${updatedData.id}`, updatedData);
      await fetchSupervisors(); // Refresh the list
    } catch (error) {
      console.error("Error updating supervisor:", error);
    }
  };
  const handleDeleteSupervisors = (id) => {
    setSupervisors((prevSupervisor) => prevSupervisor.filter((supervisor) => supervisor.id !== id));
  };

  /*For JuryMembers */
  const fetchJuryMembers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5197/api/JuryMember");
      setJuryMembers(response.data);
    } catch (error) {
      console.error("Error fetching JuryMember:", error);
    } finally {
      setLoading(false);
    }
  };

   const handleAddJuryMember= async (juryMemberData) => {
    try {
      await axios.post("http://localhost:5197/api/JuryMember", juryMemberData);
      await fetchJuryMembers(); 
    } catch (error) {
      console.error("Error adding JuryMembers:", error);
    }
  };
  const handleUpdateJuryMember = async (updatedData) => {
    try {
      await axios.put(`http://localhost:5197/api/JuryMember/${updatedData.id}`, updatedData);
      setJuryMembers((prevMember) =>
        prevMember.map((juryMember) =>
          juryMember.id === updatedData.id ? updatedData : juryMember
        )
      );
    } catch (error) {
      console.error("Error updating JuryMember:", error);
    }

  };
  const handleDeleteJuryMember = (id) => {
    setJuryMembers((prevMember) => prevMember.filter((member) => member.id !== id));
  };
/*For Departments */
  useEffect(() => {
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5197/api/Departments");
      console.log(response.data);
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  fetchDepartments();
}, []);

  const getDepartmentName = (id) => {
  const department = departments.find(d => d.id === id);
  return department ? department.name : `Department ${id}`;
};

const updateDepartment = (updatedDepartment) => {
  setDepartments((prevDepartment) =>
    prevDepartment.map((department) =>
      department.id === updatedDepartment.id ? updatedDepartment : department
    )
  );
};
const handleDeleteDepartment = (id) => {
  setDepartments((prevDepartment) => prevDepartment.filter((dep) => dep.id !== id));
};

return (
  <React.Fragment>
    <Container>
      <HeaderMain title="Users" className="mb-5 mt-4" />
      {/* START Content */}
      <Row>
        <Col lg={8}>
          <Card className="mb-3">
            <UncontrolledTabs initialActiveTabId="supervisors" >
              <CardBody>
                <div className="d-flex">
                  <Nav pills>
                    <NavItem>
                      <UncontrolledTabs.NavLink tabId="supervisors"  >
                        Supervisors
                      </UncontrolledTabs.NavLink>
                    </NavItem>
                    <NavItem>
                      <UncontrolledTabs.NavLink tabId="departments" >
                        Departments
                      </UncontrolledTabs.NavLink>
                    </NavItem>
                    <NavItem>
                      <UncontrolledTabs.NavLink tabId="juryMembers">
                        Jury Members
                      </UncontrolledTabs.NavLink>
                    </NavItem>
                  </Nav>
                  <ButtonToolbar className="ml-auto">
                    <ButtonGroup>
                      <Button
                        color="primary"
                        className="align-self-center"
                        id="tooltipAddNew"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <i className="fa fa-fw fa-plus"></i>
                      </Button>
                    </ButtonGroup>
                  </ButtonToolbar>
                  <UncontrolledTooltip placement="right" target="tooltipAddNew">
                    Add New
                  </UncontrolledTooltip>
                </div>
              </CardBody>

              <UncontrolledTabs.TabContent>
                <TabPane tabId="supervisors">
                  {/* START Table */}
                  <Table className="mb-0" hover responsive>
                    <thead>
                      <tr>
                     
                        <th className="bt-0"></th>
                        <th className="bt-0"></th>
                        <th className="bt-0">Name</th>
                        <th className="bt-0">Email</th>
                        <th className="text-right bt-0">Phone</th>
                        <th className="align-middle bt-0 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        ) : (
                          supervisors.map((supervisor,index) => (
                            <TrTableClients 
                              key={index}
                              supervisor={supervisor}
                              onDeleteSupervisor={handleDeleteSupervisors}
                              onClick={() =>{ setSelectedSupervisor(supervisor);
                                              setselectedJuryMember(null);
                              }}
                              isSelected={selectedSupervisor?.id === supervisor.id}
                              updateSupervisor={handleUpdateSupervisor}
                            />
                          ))
                        )}
                      </tbody>
                  </Table>
                  {/* END Table */}
                </TabPane>
                <TabPane tabId="departments">
                  {/* START Table */}
                  <Table className="mb-0" hover responsive>
                    <thead>
                      <tr>
                        <th className="bt-0"></th>
                        <th className="bt-0"></th>
                        <th className="bt-0">Name</th>
                        <th className="bt-0">ChairName</th>
                        <th className="text-right bt-0">phoneNumber</th>
                        <th className="text-right bt-0">Email</th>
                        <th className="text-right bt-0">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                    {loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        ) : (
                          departments.map((department,index) => (
                            <TrTableCompanies
                              key={index}
                              department={department}
                              onDeleteDepartment={handleDeleteDepartment} 
                              updateDepartment={updateDepartment}
                            />
                          ))
                        )}
                     
                      
                    </tbody>
                  </Table>
                  {/* END Table */}
                </TabPane>
                <TabPane tabId="juryMembers">
                  {/* START Table */}
                  <Table className="mb-0" hover responsive>
                    <thead>
                      <tr>
                        <th className="bt-0"></th>
                        <th className="bt-0"></th>
                        <th className="bt-0">Name</th>
                        <th className="bt-0">Email</th>
                        <th className="text-right bt-0">Phone</th>
                        <th className="align-middle bt-0 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan="6" className="text-center">
                              Loading...
                            </td>
                          </tr>
                        ) : (
                          juryMembers.map((juryMember,index) => (
                            <TrTableJuryMembers 
                              key={index}
                              juryMember={juryMember}
                              onDeleteJuryMember={handleDeleteJuryMember}
                              onClick={() =>{ setselectedJuryMember(juryMember);
                                         setSelectedSupervisor(null);
                              }}
                              isSelected={selectedJuryMember?.id === juryMember.id}
                              updateJuryMember={handleUpdateJuryMember}
                            />
                          ))
                        )}
                      </tbody>
                  </Table>
                  {/* END Table */}
                </TabPane>
              </UncontrolledTabs.TabContent>
            </UncontrolledTabs>

            <CardFooter className="d-flex">
              <span className="align-self-center">
                Showing 1 to 10 of 57 entries
              </span>
              <Pagination
                aria-label="Page navigation example"
                className="ml-auto"
              >
                <PaginationItem>
                  <PaginationLink previous href="#">
                    <i className="fa fa-fw fa-angle-left"></i>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem active>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink next href="#">
                    <i className="fa fa-fw fa-angle-right"></i>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </CardFooter>
          </Card>
        </Col>
        <Col lg={4}>
         { selectedSupervisor && (
          <Card>
            <CardBody>
              <Profile supervisor={selectedSupervisor} />
              <div className="text-center pb-1">
                <ul className="list-inline">
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">23</h2>
                    <span>Contracts</span>
                  </li>
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">13</h2>
                    <span>Tasks</span>
                  </li>
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">5</h2>
                    <span>Relases</span>
                  </li>
                </ul>
              </div>
              <Row className="mt-3">
                <Col sm={6}>
                  <Button color="primary" block>
                    Message
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button color="secondary" outline block onClick={() => setIsUpdateModalOpen(true)}>
                    Edit
                  </Button>
                </Col>
              </Row>
              <div className="mt-4 mb-2">
                <span className="font-weight-bold" style={{ fontSize: '1.0rem' }}>Description</span>
              </div>
              <p className="text-left">
                {selectedSupervisor?.description || 'No description available'}
              </p>
              <div className="mt-4 mb-2">
                <span className="font-weight-bold" style={{ fontSize: '1.0rem' }}>Departments</span>
              </div>
              <div className="text-left mb-4">
                {selectedSupervisor?.departmentIds?.map((departmentId) => (
                  <Badge 
                    key={departmentId} 
                    pill 
                    color={departmentId % 2 === 0 ? "primary" : "secondary"} 
                    className="mr-1"
                  >
                    {getDepartmentName(departmentId)}
                  </Badge>
                ))}
                {(!selectedSupervisor?.departmentIds || selectedSupervisor.departmentIds.length === 0) && (
                  <span className="text-muted">No departments assigned</span>
                )}
              </div>
              <div className="mt-4 mb-2">
                <span className="font-weight-bold" style={{ fontSize: '1.0rem' }}>Contact</span>
              </div>
              <DlRowContacts
                leftSideClassName="text-left"
                rightSideClassName="text-right text-inverse"
                supervisor={selectedSupervisor}
              />
              <div className="mt-4 mb-2">
              <DlRowAddress
                leftSideClassName="text-left"
                rightSideClassName="text-right text-inverse"
                supervisor={selectedSupervisor}
              />
               </div>
            </CardBody>
          </Card>
           )}    
         {selectedJuryMember && (
          <Card>
            <CardBody>
              <Profile supervisor={selectedJuryMember} />
              <div className="text-center pb-1">
                <ul className="list-inline">
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">23</h2>
                    <span>Contracts</span>
                  </li>
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">13</h2>
                    <span>Tasks</span>
                  </li>
                  <li className="list-inline-item text-center">
                    <h2 className="mb-1">5</h2>
                    <span>Relases</span>
                  </li>
                </ul>
              </div>
              <Row className="mt-3">
                <Col sm={6}>
                  <Button color="primary" block>
                    Message
                  </Button>
                </Col>
                <Col sm={6}>
                  <Button color="secondary" outline block onClick={() => setIsUpdateModalJuryOpen(true)}>
                    Edit
                  </Button>
                </Col>
              </Row>
              <div className="mt-4 mb-2">
                <span className="font-weight-bold" style={{ fontSize: '1.0rem' }}>Description</span>
              </div>
              <p className="text-left">
                {selectedJuryMember?.description || 'No description available'}
              </p>
              <div className="mt-4 mb-2">
                <span className="font-weight-bold" style={{ fontSize: '1.0rem' }}>Departments</span>
              </div>
              <div className="text-left mb-4">
                {selectedJuryMember?.departmentIds?.map((departmentId) => (
                  <Badge 
                    key={departmentId} 
                    pill 
                    color={departmentId % 2 === 0 ? "primary" : "secondary"} 
                    className="mr-1"
                  >
                    {getDepartmentName(departmentId)}
                  </Badge>
                ))}
                <p>
                {(!selectedJuryMember?.departmentIds || selectedJuryMember.departmentIds.length === 0) && (
                  <span className="text-muted">No departments assigned</span>
                )}</p>
              </div>
              <div className="mt-4 mb-2">
                <span className="font-weight-bold" style={{ fontSize: '1.0rem' }}>Contact</span>
              </div>
              
              <DlRowContacts
                leftSideClassName="text-left"
                rightSideClassName="text-right text-inverse"
                supervisor={selectedJuryMember}
              />
             <div className="mt-4 mb-2">
              <DlRowAddress
                leftSideClassName="text-left"
                rightSideClassName="text-right text-inverse"
                supervisor={selectedJuryMember}
              />
              </div>
            </CardBody>
          </Card>
           )} 
      </Col>
      </Row>
      {/* END Content */}
    </Container>
    <AddSupervisorModal
        isOpen={isModalOpen}
        toggle={() => setIsModalOpen(!isModalOpen)}
        onAddSupervisor={handleAddSupervisor}
      />
    <UpdateSupervisorModal
       isOpen={isUpdateModalOpen}
       toggle={() => setIsUpdateModalOpen(!isUpdateModalOpen)}
       supervisor={selectedSupervisor}
       onUpdateSupervisor={handleUpdateSupervisor}
       />
    <UpdateJuryMemberModal
      isOpen={isUpdateModalJuryOpen}
      toggle={() => setIsUpdateModalJuryOpen(!isUpdateModalJuryOpen)}
      juryMember={selectedJuryMember}
      onUpdateJuryMember={handleUpdateJuryMember}
    />
  </React.Fragment>
);

};

export default Clients;
