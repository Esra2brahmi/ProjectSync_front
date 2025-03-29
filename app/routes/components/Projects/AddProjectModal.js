import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';

const AddProjectModal = ({ isOpen, toggle }) => {
    const [projectName, setProjectName] = useState('');
    const [supervisorFirstName, setSupervisorFirstName] = useState('');
    const [supervisorLastName, setSupervisorLastName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async () => {
        const newProject = {
            projectName,
            supervisorFirstName,
            supervisorLastName,
            startDate,
            endDate,
            status,
        };

        try {
            const response = await fetch('http://localhost:5197/project', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProject),
            });

            if (response.ok) {
                console.log('Project added successfully');
            } else {
                console.error('Failed to add project');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        // Reset fields after submission
        setProjectName('');
        setSupervisorFirstName('');
        setSupervisorLastName('');
        setStartDate('');
        setEndDate('');
        setStatus('');
        toggle(); // Close modal
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New Project</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="projectName">Project Name</Label>
                        <Input type="text" id="projectName" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="supervisorFirstName">Supervisor First Name</Label>
                        <Input type="text" id="supervisorFirstName" value={supervisorFirstName} onChange={(e) => setSupervisorFirstName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="supervisorLastName">Supervisor Last Name</Label>
                        <Input type="text" id="supervisorLastName" value={supervisorLastName} onChange={(e) => setSupervisorLastName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Input type="date" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="endDate">End Date</Label>
                        <Input type="date" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="status">Status</Label>
                        <Input type="select" id="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option>Active</option>
                            <option>Suspended</option>
                            <option>Waiting</option>
                            <option>Paused</option>
                        </Input>
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Add Project</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddProjectModal;
