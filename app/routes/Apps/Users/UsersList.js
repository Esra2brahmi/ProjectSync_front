import React from 'react';
import { useState,useEffect } from 'react';

import {
    Card,
    CardFooter,
    Table,
} from './../../../components';

import {
    TrTableUsersList
} from "./components/TrTableUsersList";

import {
    Paginations
} from "../../components/Paginations";

const UsersList = () => {
     const [users, setUsers] = useState([]);
     const handleDeleteUser = (id) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      };
     useEffect(() => {
        let isMounted = true; 
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5197/user');
                const data = await response.json();
                if (isMounted) {
                    setUsers(data); 
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
        return () => {
            isMounted = false;
        };
    }, []);
    const updateUser = (updatedUser) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      };
    return (
        <Card className="mb-3">
            { /* START Table */}
            <div className="table-responsive-xl">
                <Table className="mb-0" hover>
                    <thead>
                        <tr>
                            <th className="align-middle bt-0"></th>
                            <th className="align-middle bt-0"></th>
                            <th className="align-middle bt-0">Name</th>
                            <th className="align-middle bt-0">Email</th>
                            <th className="align-middle bt-0">Department</th>
                            <th className="align-middle bt-0 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {users.length > 0 ? (
                            users.map((user,index) => (
                                <TrTableUsersList key={index} user={user} onDeleteUser={handleDeleteUser} updateUser={updateUser}/>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No users available</td>
                            </tr>
                        )}
                       
                       
                        
                    </tbody>
                </Table>
            </div>
            { /* END Table */}
            <CardFooter className="d-flex justify-content-center pb-0">
                <Paginations />
            </CardFooter>
        </Card>

)};

export default UsersList;