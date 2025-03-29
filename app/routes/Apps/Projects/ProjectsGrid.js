import React, { useEffect, useState } from 'react';
import _ from 'lodash';

import { CardColumns } from './../../../components';
import { ProjectsCardGrid } from "../../components/Projects/ProjectsCardGrid";
import { Paginations } from "../../components/Paginations";

const ProjectsGrid = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:5197/project');  // Adjust URL if needed
                const data = await response.json();
                setProjects(data); // Set fetched projects into state
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <React.Fragment>
            <CardColumns>
                {projects.length > 0 ? (
                    projects.map((project, index) => (
                        <ProjectsCardGrid key={index} project={project} />
                    ))
                ) : (
                    <div>No projects available</div> // A message if there are no projects
                )}
            </CardColumns>
            <div className="d-flex justify-content-center">
                <Paginations />
            </div>
        </React.Fragment>
    );
};

export default ProjectsGrid;
