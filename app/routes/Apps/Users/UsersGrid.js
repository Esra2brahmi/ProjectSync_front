import React, { useEffect, useState } from 'react';

import { Paginations } from "../../components/Paginations";
import { CardColumns } from './../../../components';
import { UsersCardGrid } from "./components/UsersCardGrid";

const UsersGrid = () => {
	 const [users, setUsers] = useState([]);
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
			//mettre à jour la liste des users aprés chaque delete
			const handleDeleteUser = (id) => {
				setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
			  };

			//mettre à jour la liste des users aprés chaque update 
			const updateUser = (updatedUser) => {
				setUsers((prevUsers) =>
				  prevUsers.map((user) =>
					user.id === updatedUser.id ? updatedUser : user
				  )
				);
			  };

			//mettre à jour les users aprés chaque ajout 

	return(
	<React.Fragment>
		<CardColumns>
		{users.length > 0 ? (
                    users.map((user, index) => (
                        <UsersCardGrid  key={index} user={user} onDeleteUser={handleDeleteUser} updateUser={updateUser}/>
                    ))
                ) : (
                    <div>No users available</div> // A message if there are no projects
                )}
		</CardColumns>
		<div className="d-flex justify-content-center">
			<Paginations />
		</div>
    </React.Fragment>
)};

export default UsersGrid;