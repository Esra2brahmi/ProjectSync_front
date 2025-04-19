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
  DropdownItem
} from "./../../../components";
import { randomAvatar } from "./../../../utilities";

const ProjectDetailLeftNav = ({ projectId }) => {
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [projectSupervisors, setProjectSupervisors] = useState([]);
  const [students, setStudents] = useState([]);
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

  // Fetch students from API
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

  const handleAddStudent = (student, e) => {
    e.preventDefault();
    e.stopPropagation(); 
    setDropdownOpen(prev => ({ ...prev, student: false }));
    if (!selectedStudents.some(s => s.id === student.id)) {
      setSelectedStudents(prev => [...prev, student]);
    }
    setSearchTerm("");
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

      {/* Favorites Section */}
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
          {selectedStudents.map((student) => (
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
    </React.Fragment>
  );
};

export { ProjectDetailLeftNav };