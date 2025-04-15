import React, { useState ,useEffect} from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "./../../../components";

const AddSupervisorModal = ({ isOpen, toggle, onAddSupervisor }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    description: "",
    address: "",
    academicTitle:"",
    departmentIds: [],
  });

  const [departments, setDepartments] = useState([]); 
  const [loadingDepartments, setLoadingDepartments] = useState(true);

   // Fetch departments when modal opens
  useEffect(() => {
    if (isOpen) {
      const fetchDepartments = async () => {
        try {
          const response = await fetch('http://localhost:5197/api/Departments'); // Adjust your API endpoint
          const data = await response.json();
          setDepartments(data);
          setLoadingDepartments(false);
        } catch (error) {
          console.error("Failed to fetch departments:", error);
          setLoadingDepartments(false);
        }
      };
      fetchDepartments();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentChange = (e) => {
    const options = e.target.options;
    const selectedValues = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(parseInt(options[i].value));
      }
    }
    setFormData(prev => ({ ...prev, departmentIds: selectedValues }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await onAddSupervisor(formData);
    // Reset form fields after successful submission
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      description: "",
      address: "",
      academicTitle: "",
      departmentIds: [],
    });
    toggle(); // Close the modal
  } catch (error) {
    console.error("Failed to add supervisor:", error);
  }
};

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Add New Supervisor</ModalHeader>
      <Form onSubmit={handleSubmit}>
        <ModalBody>
          <FormGroup>
            <Label for="firstName">First Name</Label>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName">Last Name</Label>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="phoneNumber">Phone Number</Label>
            <Input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="academicTitle">Academic Title</Label>
            <Input
              type="text"
              name="academicTitle"
              id="academicTitle"
              value={formData.academicTitle}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="address">Address</Label>
            <Input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
            />
          </FormGroup>
          {/* Multi-select department field */}
          <FormGroup>
            <Label for="departments">Departments</Label>
            {loadingDepartments ? (
              <p>Loading departments...</p>
            ) : (
              <Input
                type="select"
                name="departments"
                id="departments"
                multiple
                value={formData.departmentIds.map(String)} // Convert numbers to strings for comparison
                onChange={handleDepartmentChange}
                style={{ height: 'auto' }} // Make it look better for multiple selections
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </Input>
            )}
            <small className="text-muted">
              Hold CTRL (or CMD on Mac) to select multiple departments
            </small>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Add Supervisor
          </Button>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default AddSupervisorModal;