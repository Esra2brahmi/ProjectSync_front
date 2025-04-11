import React,{useState,useEffect} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const EditUserModal=({isOpen, toggle, editUser, user})=>{
        const[userFirstName, setUserFirstName]=useState('');
        const [userLastName,setUserLastName]=(useState(''));
        const [department,setDepartment]=(useState(''));
        const [email,setEmail]=(useState(''));
        const [classe,setClasse]=(useState(''));
        const [projectType,setProjectType]=(useState(''));
        const [supervisorFullName,setSupervisorFullName]=(useState(''));

       //par defaut les champs prend les infos de user
       useEffect(() => {
            if (user) {
              setUserFirstName(user.userFirstName || '');
              setUserLastName(user.userLastName || '');
              setDepartment(user.department || '');
              setEmail(user.email || '');
              setClasse(user.classe || '');
              setProjectType(user.projectType || '');
              setSupervisorFullName(user.supervisorFullName || '');
            }
          }, [user]);

          const handleEdit = () => {
            const updatedUser = {
              ...user,
              userFirstName,
              userLastName,
              department,
              email,
              classe,
              projectType,
              supervisorFullName,
            };
            editUser(updatedUser);
            toggle(); // Close modal after editing
          };
    return(
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle}>Edit the user User</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="userFirstName">User FirstName</Label>
                            <Input type="text" placeholder='user FirstName' id="userFirstName" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="userLastName">Supervisor First Name</Label>
                            <Input type="text"placeholder='user LastName' id="userLastName" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="department">Supervisor Last Name</Label>
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
                    <Button color="primary" onClick={handleEdit}>Edit User</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

    );
};
export default EditUserModal;