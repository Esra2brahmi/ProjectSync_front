import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Button,
  Input,
  InputGroupAddon,
  Nav,
  NavItem,
  NavLink,
  Media,
  Avatar,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Alert
} from "./../../../components";
import { randomAvatar } from "./../../../utilities";

const ProjectDetailLeftNav = ({ projectId }) => {
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [projectSupervisors, setProjectSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
  const [projectStudents, setProjectStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState({
    supervisor: false,
    student: false
  });
  const [loading, setLoading] = useState({
    supervisors: false,
    students: false
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  // Fetch project supervisors when component mounts
  useEffect(() => {
    const fetchProjectSupervisors = async () => {
      if (!projectId) return;
      
      setLoading(prev => ({ ...prev, supervisors: true }));
      try {
        const response = await fetch(`http://localhost:5197/api/ProjectSupervisor/project/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project supervisors");
        }
        const data = await response.json();
        setProjectSupervisors(data);
      } catch (error) {
        console.error("Error fetching project supervisors:", error);
      } finally {
        setLoading(prev => ({ ...prev, supervisors: false }));
      }
    };

    fetchProjectSupervisors();
  }, [projectId]);

  // Fetch project students when component mounts
  useEffect(() => {
    const fetchProjectStudents = async () => {
      if (!projectId) return;
      
      setLoading(prev => ({ ...prev, students: true }));
      try {
        const response = await fetch(`http://localhost:5197/api/ProjectUser/project/${projectId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project students");
        }
        const data = await response.json();
        setProjectStudents(data);
      } catch (error) {
        console.error("Error fetching project students:", error);
      } finally {
        setLoading(prev => ({ ...prev, students: false }));
      }
    };

    fetchProjectStudents();
  }, [projectId]);

  // Fetch all supervisors for dropdown
  useEffect(() => {
    const fetchSupervisors = async () => {
      setLoading(prev => ({ ...prev, supervisors: true }));
      try {
        const response = await fetch("http://localhost:5197/api/Supervisor");
        const data = await response.json();
        setAllSupervisors(data);
      } catch (error) {
        console.error("Error fetching supervisors:", error);
      } finally {
        setLoading(prev => ({ ...prev, supervisors: false }));
      }
    };

    fetchSupervisors();
  }, []);

  // Fetch students from API for dropdown
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(prev => ({ ...prev, students: true }));
      try {
        const response = await fetch("http://localhost:5197/user");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(prev => ({ ...prev, students: false }));
      }
    };

    fetchStudents();
  }, []);

  const toggleDropdown = (type) => {
    setDropdownOpen(prev => ({ ...prev, [type]: !prev[type] }));
  };

  const handleAddSupervisor = async (supervisor, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch("http://localhost:5197/api/ProjectSupervisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ProjectId: projectId,
          SupervisorId: supervisor.id
        })
      });

      if (!response.ok) {
        if (response.status === 400) {
          setAlertMessage("This supervisor is already assigned to this project");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          return;
        }
        throw new Error("Failed to add supervisor");
      }

      // Refresh project supervisors list
      const projectSupervisorsResponse = await fetch(`http://localhost:5197/api/ProjectSupervisor/project/${projectId}`);
      if (projectSupervisorsResponse.ok) {
        const updatedProjectSupervisors = await projectSupervisorsResponse.json();
        setProjectSupervisors(updatedProjectSupervisors);
      }
      
      setDropdownOpen(prev => ({ ...prev, supervisor: false }));
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding supervisor:", error);
    }
  };

  const handleAddStudent = async (student, e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await fetch("http://localhost:5197/api/ProjectUser/assign", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: student.id,
          ProjectId: projectId
        })
      });

      if (!response.ok) {
        if (response.status === 400) {
          setAlertMessage("This student is already assigned to this project");
          setShowAlert(true);
          setTimeout(() => setShowAlert(false), 3000);
          return;
        }
        throw new Error("Failed to add student");
      }

      // Refresh project students list
      const projectStudentsResponse = await fetch(`http://localhost:5197/api/ProjectUser/project/${projectId}`);
      if (projectStudentsResponse.ok) {
        const updatedProjectStudents = await projectStudentsResponse.json();
        setProjectStudents(updatedProjectStudents);
      }
      
      setDropdownOpen(prev => ({ ...prev, student: false }));
      setSearchTerm("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  const filteredSupervisors = allSupervisors.filter(supervisor =>
    `${supervisor.firstName} ${supervisor.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(student =>
    `${student.userFirstName} ${student.userLastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <React.Fragment>
      {/* Search Section */}
      <div className="mb-4">
        <div className="small mb-3">Search</div>
        <InputGroup>
          <Input
            placeholder="Search for..."
            className="bg-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputGroupAddon addonType="append">
            <Button outline color="secondary">
              <i className="fa fa-search"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>

      

      {/* Supervisors Section */}
      <div className="mb-4">
        <div className="small mb-3 d-flex justify-content-between align-items-center">
          <span>Supervisors</span>
          <Dropdown
            isOpen={dropdownOpen.supervisor}
            toggle={() => toggleDropdown("supervisor")}
          >
            <DropdownToggle color="link" className="p-0">
              <i className="fa fa-plus"></i>
            </DropdownToggle>
            <DropdownMenu right style={{ width: "300px" }}>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search supervisors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {loading.supervisors ? (
                <DropdownItem>Loading...</DropdownItem>
              ) : (
                filteredSupervisors.map((supervisor) => (
                  <DropdownItem
                    key={supervisor.id}
                    onClick={(e) => handleAddSupervisor(supervisor, e)}
                  >
                    {supervisor.firstName} {supervisor.lastName}
                  </DropdownItem>
                ))
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Nav pills vertical>
          {projectSupervisors.map((supervisor) => (
            <NavItem key={supervisor.supervisorId}>
              <NavLink href="#" className="d-flex">
                <Media>
                  <Media left middle className="mr-3 align-self-center">
                    <Avatar.Image size="md" src={randomAvatar()} />
                  </Media>
                  <Media body>
                    <div className="mt-0">
                      {supervisor.supervisorName}
                    </div>
                  </Media>
                </Media>
                <i className="fa fa-fw fa-circle text-success ml-auto align-self-center ml-2"></i>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>

      {/* Students Section */}
      <div className="mb-4">
        <div className="small mb-3 d-flex justify-content-between align-items-center">
          <span>Students</span>
          <Dropdown
            isOpen={dropdownOpen.student}
            toggle={() => toggleDropdown("student")}
          >
            <DropdownToggle color="link" className="p-0">
              <i className="fa fa-plus"></i>
            </DropdownToggle>
            <DropdownMenu right style={{ width: "300px" }}>
              <div className="p-2">
                <Input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {loading.students ? (
                <DropdownItem>Loading...</DropdownItem>
              ) : (
                filteredStudents.map((student) => (
                  <DropdownItem
                    key={student.id}
                    onClick={(e) => handleAddStudent(student, e)}
                  >
                    {student.userFirstName} {student.userLastName}
                  </DropdownItem>
                ))
              )}
            </DropdownMenu>
          </Dropdown>
        </div>
        <Nav pills vertical>
          {projectStudents.map((student) => (
            <NavItem key={student.id}>
              <NavLink href="#" className="d-flex">
                <Media>
                  <Media left middle className="mr-3 align-self-center">
                    <Avatar.Image size="md" src={randomAvatar()} />
                  </Media>
                  <Media body>
                    <div className="mt-0">
                      {student.userFirstName} {student.userLastName}
                    </div>
                  </Media>
                </Media>
                <i className="fa fa-fw fa-circle text-success ml-auto align-self-center ml-2"></i>
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>

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
    </React.Fragment>
  );
};

export { ProjectDetailLeftNav };