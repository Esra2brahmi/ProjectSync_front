import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  InputGroup,
  Button,
  Input,
  InputGroupAddon,
  Nav,
  NavItem,
  NavLink,
  Badge,
  Media,
  Avatar,
  Spinner,
} from "./../../../components";
import { randomAvatar } from "./../../../utilities";

const ProjectsLeftNav = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5197/project");
        setProjects(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError("Failed to load projects");
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter projects based on search term
  const filteredProjects = projects.filter((project) => {
    return (
      project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectReference.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <React.Fragment>
      {/* START Left Nav  */}
      <div className="mb-4">
        <div className="small mb-3">Search</div>
        <InputGroup>
          <Input 
            placeholder="Search for..." 
            className="bg-white" 
            value={searchTerm}
            onChange={handleSearch}
          />
          <InputGroupAddon addonType="append">
            <Button outline color="secondary">
              <i className="fa fa-search"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      {/* END Left Nav  */}
      {/* START Left Nav  */}

    
      {/* END Left Nav  */}
      {/* START Left Nav  */}
      <div className="mb-4">
        <div className="small mb-3">Projects</div>
        <Nav pills vertical>
          {loading ? (
            <div className="text-center py-3">
              <i className="fa fa-spinner fa-spin"></i>
              <div className="small mt-2">Loading projects...</div>
            </div>
          ) : error ? (
            <div className="text-center text-danger py-3">
              <i className="fa fa-exclamation-circle"></i>
              <div className="small mt-2">{error}</div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center text-muted py-3">
              <i className="fa fa-folder-open-o"></i>
              <div className="small mt-2">No projects found</div>
            </div>
          ) : (
            <>
              {filteredProjects.map((project) => (
                <NavItem key={project.id}>
                  <NavLink href={`/apps/tasks/list/${project.id}`} className="d-flex">
                    <i className="fa fa-fw fa-star-o align-self-center mr-2"></i>
                    <div className="text-truncate mr-1" style={{ maxWidth: "160px" }}>
                      <span className="text-secondary">{project.projectReference}</span>
                      <small className="d-block text-muted">{project.projectName}</small>
                    </div>
                    <Badge color="secondary" pill className="ml-auto align-self-center">
                      {project.projectTasks?.length || 0}
                    </Badge>
                  </NavLink>
                </NavItem>
              ))}
              <NavItem>
                <NavLink href="/apps/projects/create">
                  <i className="fa fa-fw fa-plus mr-2"></i>
                  Add New Project
                </NavLink>
              </NavItem>
            </>
          )}
        </Nav>
      </div>
      {/* END Left Nav  */}
    </React.Fragment>
  );
};

export { ProjectsLeftNav };
