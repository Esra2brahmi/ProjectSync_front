import React, { useEffect, useState } from 'react';

import { 
    Card,
    CardFooter,
    Table
} from './../../../components';

import { Paginations } from "../../components/Paginations";
import { TrTableFilesList } from "./components/TrTableFilesList";

const FilesList = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                // Make sure to use the full API URL with the correct base path
                const response = await fetch('http://localhost:5197/api/Departments');
                
                // First check if the response is OK
                if (!response.ok) {
                    throw new Error(`Server responded with status: ${response.status}`);
                }
                const data = await response.json();
                setDepartments(data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching departments:', err);
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    if (loading) return <div>Loading departments...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <Card className="mb-3">
            { /* START Table */}
            <div className="table-responsive-xl">
                <Table className="mb-0" hover>
                    <thead>
                        <tr>
                            <th className="align-middle bt-0">Department</th>
                            <th className="align-middle bt-0">Tags</th>
                            <th className="align-middle bt-0 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map(department => (
                            <TrTableFilesList 
                                key={department.id} 
                                department={department} 
                            />
                        ))}
                    </tbody>
                </Table>
            </div>
            { /* END Table */}
            <CardFooter className="d-flex justify-content-center pb-0">
                <Paginations />
            </CardFooter>
        </Card>
    );
};

export default FilesList;