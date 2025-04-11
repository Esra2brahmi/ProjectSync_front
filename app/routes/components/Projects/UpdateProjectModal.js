import React, { useState, useEffect } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import toast from 'react-hot-toast';
import axios from 'axios';

const UpdateProjectModal = ({ isOpen, toggle, project, onProjectUpdated }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    supervisorFirstName: '',
    supervisorLastName: '',
    startDate: '',
    endDate: '',
    status: 'Active',
    department: 'Mechanical Engineering',
    level: 'PFA1'
  });

  useEffect(() => {
    if (project) {
      const { projectName, supervisorFirstName, supervisorLastName, startDate, endDate, status, department, level } = project;
      setFormData({
        projectName,
        supervisorFirstName,
        supervisorLastName,
        startDate: project.startDate?.slice(0, 10),
        endDate: project.endDate?.slice(0, 10),
        status,
        department,
        level
      });
    }
  }, [project]);
  

  const handleChange = (e) => {
    e.persist();
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleUpdate = async () => {
    if (!project?.id) {  
      toast.error('Invalid project data.');  
      return;  
    }
    
    try {
      const response = await axios.put(`http://localhost:5197/project/${project.id}`, formData);
      if (response.status === 200) {
        toast.success('Project updated!');
        onProjectUpdated(); // parent re-fetch
        toggle();
      } else {
        toast.error('Update failed!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error updating project.');
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Project</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="projectName">Project Name</Label>
            <Input type="text" id="projectName" value={formData.projectName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="supervisorFirstName">Supervisor First Name</Label>
            <Input type="text" id="supervisorFirstName" value={formData.supervisorFirstName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="supervisorLastName">Supervisor Last Name</Label>
            <Input type="text" id="supervisorLastName" value={formData.supervisorLastName} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="startDate">Start Date</Label>
            <Input type="date" id="startDate" value={formData.startDate} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="endDate">End Date</Label>
            <Input type="date" id="endDate" value={formData.endDate} onChange={handleChange} />
          </FormGroup>
          <FormGroup>
            <Label for="status">Status</Label>
            <Input type="select" id="status" value={formData.status} onChange={handleChange}>
              <option>Active</option>
              <option>Suspended</option>
              <option>Waiting</option>
              <option>Paused</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="department">Department</Label>
            <Input type="select" id="department" value={formData.department} onChange={handleChange}>
              <option value="Mechanical Engineering">Mechanical Engineering</option>
              <option value="Electrical Engineering">Electrical Engineering</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Industrial Engineering">Industrial Engineering</option>
              <option value="Civil Engineering">Civil Engineering</option>
              <option value="Applied Mathematics Engineering">Applied Mathematics and Modeling</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="level">Level</Label>
            <Input type="select" id="level" value={formData.level} onChange={handleChange}>
              <option value="PFA1">PFA1</option>
              <option value="PFA2">PFA2</option>
              <option value="PFE">PFE</option>
            </Input>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>Update Project</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateProjectModal;
