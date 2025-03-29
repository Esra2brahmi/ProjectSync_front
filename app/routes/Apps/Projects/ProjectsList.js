import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Card, CardFooter, Table } from './../../../components';
import { TrTableProjectsList } from "./components/TrTableProjectsList";

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('http://localhost:5197/project');  // Adjust URL if needed
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <Card className="mb-3">
            <div className="table-responsive-xl">
                <Table className="mb-0" hover>
                    <thead>
                        <tr>
                            <th className="align-middle bt-0">Star</th>
                            <th className="align-middle bt-0">Project</th>
                            <th className="align-middle bt-0">Status</th>
                            <th className="align-middle bt-0">Tasks Completed</th>
                            <th className="align-middle bt-0">Supervisor</th>
                            <th className="align-middle bt-0 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map((project, index) => (
                                <TrTableProjectsList key={index} project={project} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No projects available</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
            <CardFooter className="d-flex justify-content-center pb-0">
                <Pagination aria-label="Page navigation example">
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
    );
};

export default ProjectsList;
