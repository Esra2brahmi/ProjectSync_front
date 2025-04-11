import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import toast from 'react-hot-toast';

const AddTaskModal = ({ isOpen, toggle, projectId }) => {
    const [TaskName, setTaskName] = useState('');
    const [TaskDescription, setTaskDescription] = useState('');
    const [DueDate, setTaskDueDate] = useState('');

    const handleSubmit = async () => {
        const newTask = {
            TaskName,
            TaskDescription,
            DueDate,
        };

        try {
            const response = await fetch(`http://localhost:5197/task/${projectId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask),
            });

            if (response.ok) {
                toast.success('Task added successfully');
            } else {
                toast.error('Failed to add task');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An unexpected error occurred.');
        }

        // Reset fields after submission
        setTaskName('');
        setTaskDueDate('');
        setTaskDescription('');
        toggle(); // Close modal
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Add New Task</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="taskName">Task Name</Label>
                        <Input type="text" id="taskName" value={TaskName} onChange={(e) => setTaskName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskDueDate">Task Due Date</Label>
                        <Input type="date" id="taskDueDate" value={DueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="taskDescription">Task Description</Label>
                        <Input type="textarea" id="taskDescription" value={TaskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>Add Task</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};

export default AddTaskModal;
