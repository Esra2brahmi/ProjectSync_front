import React ,{useState,useEffect} from "react";
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
import UpdateSupervisorModal from "../UpdateSupervisorModal";

const status = ["secondary", "success", "warning", "danger"];

const tag = ["secondary", "primary", "info"];

const TrTableClients = ({ supervisor,index ,onDeleteSupervisor,onClick,isSelected,updateSupervisor}) => {
  const { id, firstName, lastName, email, phoneNumber,academicTitle}=supervisor;
  const status = ["secondary", "success", "warning", "danger"];
  const tag = ["secondary", "primary", "info"];
  const [isSelectedSupervisor, setIsSelectedSupervisor] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
   const toggleModal = () => setModalOpen(!isModalOpen);
   const handleCheckboxChange = () => {setIsSelectedSupervisor(!isSelectedSupervisor);};
  //edit supervisor
  const handleEdit=async(updatedSupervisor)=>{
    if(isSelectedSupervisor){
      try{
        const response=await fetch(`http://localhost:5197/api/Supervisor/${id}`,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json",//Indique au serveur que tu envoies du JSON
          },
          body:JSON.stringify(updatedSupervisor)//convertit l'objet updatedUser en JSON
        });
        if (response.ok) {
          console.log("Supervisor edited successfully");
          updateSupervisor(updatedSupervisor);
          setIsSelectedSupervisor(false)
        } else {
          console.error("Error editing Supervisor", response);
         
        }
      } catch (error) {
        console.error("Error editing Supervisor:", error);
      }
    }
  };

  //delete supervisor
  const handleDelete = async () => {
    if (isSelectedSupervisor) {
      try {
        const response = await fetch(`http://localhost:5197/api/Supervisor/${id}`, {
          method: "DELETE",  // Utilisation de la méthode DELETE pour supprimer
          headers: {
            "Content-Type": "application/json",
          },
        });
          if (response.ok) {
            onDeleteSupervisor(id); 
        } else {
          console.error("Error deleting Supervisor", response);
         
        }
      } catch (error) {
        console.error("Error deleting Supervisor:", error);
      }
    }
  };
  return(
  <React.Fragment>
    <tr onClick={onClick}>
      <td className="align-middle">
        <CustomInput
          type="checkbox"
          checked={isSelectedSupervisor}
          onChange={handleCheckboxChange}
          id={`trTableClients-${id}`}
          label=""
          inline
        />
      </td>
      <td className="align-middle">
        <a href="#" id={`trTableClientsTooltip-${id}`}>
          <i className="fa fa-fw fa-star-o"></i>
        </a>
        <UncontrolledTooltip
          placement="top"
          target={`trTableClientsTooltip-${id}`}
        >
          Add To Favorites
        </UncontrolledTooltip>
      </td>
      <td className="align-middle">
        <Media>
          <Media left className="align-self-center mr-3">
            <Avatar.Image
              size="md"
              src="http://bs4.webkom.co/img/avatars/2.jpg"
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
          </Media>
          <Media body>
            <a className="mt-0 d-flex text-decoration-none" href="#">
              {firstName} {lastName}
            </a>
            <span>{academicTitle}</span>
          </Media>
        </Media>
      </td>
      <td className="align-middle">{email}</td>
      <td className="align-middle">{phoneNumber}</td>
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
    <UpdateSupervisorModal  isOpen={isModalOpen}
                      toggle={toggleModal}
                      onUpdateSupervisor={handleEdit}
                      supervisor={supervisor}/>
  </React.Fragment>
)};


export { TrTableClients };
