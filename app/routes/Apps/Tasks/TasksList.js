import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem, PaginationLink, Card, CardFooter, Table } from './../../../components';
import { TrTableTasksList } from "./components/TrTableTasksList";
import { useLocation } from 'react-router-dom';

const TasksList = () => {
    const location = useLocation();
    const [tasks, setTasks] = useState([]);
    const pathSegments = location.pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

        const fetchTasks = async () => {
            if (!projectId) return;  
    
            try {
                const response = await fetch(`http://localhost:5197/task/byProject/${projectId}`);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
    
       useEffect(() => {
               fetchTasks();
           }, [projectId]);
    

    return (
        <Card className="mb-3">
            <div className="table-responsive-xl">
                <Table className="mb-0" hover>
                    <thead>
                        <tr>
                            <th className="align-middle bt-0">#</th>
                            <th className="align-middle bt-0">Priority</th>
                            <th className="align-middle bt-0">Title & Description</th>
                            <th className="align-middle bt-0">People</th>
                            <th className="align-middle bt-0">Due Date</th>
                            <th className="align-middle bt-0 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <TrTableTasksList key={index} task={task} refreshTasks={fetchTasks} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No tasks available</td>
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



export default TasksList;
