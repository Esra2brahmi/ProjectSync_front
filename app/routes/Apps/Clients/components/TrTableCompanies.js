import React ,{useState,useEffect} from "react";
import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";
import UpdateDepartmentModal from "../UpdateDepartmentModal";
import {
  Avatar,
  CustomInput,
  UncontrolledTooltip,
  AvatarAddOn,
  Media,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./../../../../components";
import { randomArray } from "./../../../../utilities";
const TrTableCompanies = ({department,index, onDeleteDepartment,updateDepartment}) => {
 const {id,name,chairName,phoneNumber,email}=department;
const status = ["success", "danger", "warning", "secondary"];
const tag = ["secondary", "primary", "info"];
const [isSelected, setIsSelected] = useState(false);
const [isModalOpen, setModalOpen] = useState(false);
 const toggleModal = () => setModalOpen(!isModalOpen);
 const handleCheckboxChange = () => {setIsSelected(!isSelected);};
 //method for editing the user
 const handleEdit=async(updatedDepartment)=>{
  if(isSelected){
    try{
      const response=await fetch(`http://localhost:5197/api/Departments/${id}`,{
        method:"PUT",
        headers: {
          "Content-Type": "application/json",//Indique au serveur que tu envoies du JSON
        },
        body:JSON.stringify(updatedDepartment)//convertit l'objet updatedUser en JSON
      });
      if (response.ok) {
        console.log("Department edited successfully");
        updateDepartment(updatedDepartment);
        setIsSelected(false)
      } else {
        console.error("Error editing Department", response);
       
      }
    } catch (error) {
      console.error("Error editing user:", error);
    }
  }
};
 //method for deleting Department
 const handleDelete = async () => {
  if (isSelected) {
    try {
      const response = await fetch(`http://localhost:5197/api/Departments/${id}`, {
        method: "DELETE",  // Utilisation de la méthode DELETE pour supprimer
        headers: {
          "Content-Type": "application/json",
        },
      });
        if (response.ok) {
          onDeleteDepartment(id); 
      } else {
        console.error("Error deleting Department", response);
       
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }
};
return(

  <React.Fragment>
    <tr>
      <td className="align-middle">
        <CustomInput
          type="checkbox"
          id={`trTableCompanies-${id}`}
          label=""
          inline
          checked={isSelected}
          onChange={handleCheckboxChange}
        />
      </td>
      <td className="align-middle">
        <a href="#" id={`trTableCompaniesTooltip-${id}`}>
          <i className="fa fa-fw fa-star-o"></i>
        </a>
        <UncontrolledTooltip
          placement="top"
          target={`trTableCompaniesTooltip-${id}`}
        >
          Add To Favorites
        </UncontrolledTooltip>
      </td>
      <td className="align-middle">{name}</td>
      <td className="align-middle">
        <Avatar.Image
          size="sm"
          src="http://bs4.webkom.co/img/avatars/2.jpg"
          
          className="mr-2"
          addOns={[
            <AvatarAddOn.Icon
              className="fa fa-circle"
              color="white"
              key="avatar-icon-bg"
            />,
            <AvatarAddOn.Icon
              className="fa fa-circle"
              color={randomArray(status)}
              key="avatar-icon-fg"
            />,
          ]}
        />
        {chairName}
      </td>
      <td  className="align-middle text-right">
      {phoneNumber}
      </td>
      <td className="align-middle text-right">
        {email}
      </td>
      <td className="align-middle text-right">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="link" className="pr-0">
              <i className="fa fa-bars"></i>
              <i className="fa fa-angle-down ml-2" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={toggleModal}>
                <i className="fa fa-fw fa-pencil mr-2"></i>
                Edit
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={handleDelete}>
                <i className="fa fa-fw fa-trash mr-2"></i>
                Delete
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </td>
      </tr>
      <UpdateDepartmentModal  isOpen={isModalOpen}
                      toggle={toggleModal}
                      editDepartment={handleEdit}
                      department={department} />
   
  </React.Fragment>
)};



export { TrTableCompanies };
