import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const AddUserModal=({ isOpen, toggle })=>{
    const [userFirstName,setUserFirstName]=(useState(''));
    const [userLastName,setUserLastName]=(useState(''));
    const [department,setDepartment]=(useState(''));
    const [email,setEmail]=(useState(''));
    const [classe,setClasse]=(useState(''));
    const [projectType,setProjectType]=(useState(''));
    const [supervisorFullName,setSupervisorFullName]=(useState(''));
    const handleSubmit=async()=>{
        const newUser={
            userFirstName,
            userLastName,
            department,
            email,
            classe,
            projectType,
            supervisorFullName
        };
        try {
            const response=await fetch('http://localhost:5197/user',{
                method:'POST',
                headers: { 'Content-Type': 'application/json' },
                body:JSON.stringify(newUser),
            });
            if(response.ok){
                console.log("user added with successfully");
            }
            else{
                console.error('failed to add user');
            }
        }
        catch(error){
            console.error('Error:', error);
            
        }
        // Reset fields after submission
        setUserFirstName('');
        setUserLastName('');
        setDepartment('');
        setEmail('');
        setClasse('');
        setClasse('');
        setProjectType('');
        setSupervisorFullName('');
        toggle(); // Close modal
    };
    
    return(
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New User</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="userFirstName">User FirstName</Label>
                            <Input type="text" placeholder='user FirstName' id="userFirstName" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userLastName">User LastName</Label>
                            <Input type="text"placeholder='user LastName' id="userLastName" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="department">Department </Label>
                            <Input type="select" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
                                <option>Computer Science Engineering</option>
                                <option>Electrical Engineering</option>
                                <option>Applied Mathematical Engineering and Modeling</option>
                                <option>Civil Engineering</option>
                                <option>Mechanical Engineering</option>                 
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="classe">classe</Label>
                            <Input type="text" id="classe" value={classe} onChange={(e) => setClasse(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="projectType">projectType</Label>
                            <Input type="select" id="projectType" value={projectType} onChange={(e) => setProjectType(e.target.value)}>
                                <option>PFA1</option>
                                <option>PFA2</option>
                                <option>PFE</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="supervisorFullName">Supervisor FullName</Label>
                            <Input type="text" id="supervisorFullName" value={supervisorFullName} onChange={(e) => setSupervisorFullName(e.target.value)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Add User</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
    );
};

export default AddUserModal;
