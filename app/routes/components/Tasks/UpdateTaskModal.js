import React, { useState, useEffect } from 'react';
import {
  Modal, ModalHeader, ModalBody, ModalFooter,
  Button, Form, FormGroup, Label, Input
} from 'reactstrap';
import toast from 'react-hot-toast';
import axios from 'axios';

const UpdateTaskModal = ({ isOpen, toggle, task, onTaskUpdated }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    dueDate: ''
  });
  const [taskId, setTaskId] = useState(null);

  useEffect(() => {
    if (task) {
      setTaskId(task.id);
      const { taskName, taskDescription, dueDate } = task;
      setFormData({
        taskName,
        taskDescription,
        dueDate: dueDate ? new Date(dueDate).toISOString().split('T')[0] : ''
      });
    }
  }, [task]);

    const handleChange = (e) => {
    e.persist(); 
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };


  const handleUpdate = async () => {
    if (!taskId) {
      toast.error('Invalid task data.');
      return;
    }   

    try {

      const response = await axios.put(`http://localhost:5197/task/${task.id}`, formData);
      if (response.status === 200) {
        toast.success('Task updated!');
        onTaskUpdated?.(); // optional chaining in case it’s not passed
        toggle();
      } else {
        toast.error('Failed to update task.');
      }
    } catch (err) {
      console.error(err);
      toast.error('An error occurred while updating the task.');
    }
  };



  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Update Task</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="taskName">Task Name</Label>
            <Input
              type="text"
              id="taskName"
              value={formData.taskName}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="dueDate">Task Due Date</Label>
            <Input
              type="date"
              id="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="taskDescription">Task Description</Label>
            <Input
              type="textarea"
              id="taskDescription"
              value={formData.taskDescription}
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>Update Task</Button>
        <Button color="secondary" onClick={toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateTaskModal;
