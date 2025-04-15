import React,{useState,useEffect} from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const UpdateDepartmentModal=({isOpen, toggle, editDepartment, department})=>{
        const[name, setName]=useState('');
        const [chairName,setChairName]=(useState(''));
        const [phoneNumber,setPhoneNumber]=(useState(''));
        const [email,setEmail]=(useState(''));
    

       //par defaut les champs prend les infos de department
       useEffect(() => {
            if (department) {
                setName(department.name || '');
                setChairName(department.chairName || '');
                setPhoneNumber(department.phoneNumber || '');
               setEmail(department.email || '');
            }
          }, [department]);

          const handleEdit = () => {
            const updatedDepartment = {
              ...department,
              name,
              chairName,
              phoneNumber,
              email,
            };
            editDepartment(updatedDepartment);
            toggle(); // Close modal after editing
          };
    return(
        <Modal isOpen={isOpen} toggle={toggle} >
            <ModalHeader toggle={toggle}>Edit the Department Information</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Department Name</Label>
                            <Input type="text" placeholder='name' id="name" value={name} onChange={(e) => setName(e.target.value)}  />
                        </FormGroup>
                        <FormGroup>
                            <Label for="chairName">Department's chairName</Label>
                            <Input type="text"placeholder='chairName' id="chairName" value={chairName} onChange={(e) => setChairName(e.target.value)} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="phoneNumber">Phone Number</Label>
                            <Input type="text"placeholder='phoneNumber' id="phoneNumber" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />   
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleEdit}>Edit Department</Button>
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

    );
};
export default UpdateDepartmentModal;