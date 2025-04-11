import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CardColumns } from './../../../components';
import { Paginations } from "../../components/Paginations";
import { TasksCardGrid } from "../../components/Tasks/TasksCardGrid";

const TasksGrid = () => {
    const location = useLocation();
    const [tasks, setTasks] = useState([]);
    const pathSegments = location.pathname.split('/');
    const projectId = pathSegments[pathSegments.length - 1];

    
            const fetchTasks = async () => {
                if (!projectId) return;  // Prevent fetching if projectId is missing
        
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
    <React.Fragment>
        <CardColumns>
            {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TasksCardGrid task={task} refreshTasks={fetchTasks}  />
                        ))
                    ) : (
                        <p className="text-center">No tasks available</p>
            )}
        </CardColumns>
        <div className="d-flex justify-content-center">
            <Paginations />
        </div>
    </React.Fragment>
);
};

export default TasksGrid;