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
import UpdateJuryMemberModal from "../UpdateJuryMemberModal";

const TrTableJuryMembers = ({ juryMember,index ,onDeleteJuryMember,onClick,isSelected,updateJuryMember}) => {
const status = ["secondary", "success", "warning", "danger"];
const tag = ["secondary", "primary", "info"];
const [isSelectedMember, setIsSelectedMember] = useState(false);
const [isModalOpen, setModalOpen] = useState(false);
 const toggleModal = () => setModalOpen(!isModalOpen);
 const handleCheckboxChange = () => {setIsSelectedMember(!isSelectedMember);};
  const {id,firstName,lastName,phoneNumber,email,academicTitle,address}=juryMember;
  //update JuryMember
  const handleEdit=async(updatedMember)=>{
    if(isSelectedMember){
      try{
        const response=await fetch(`http://localhost:5197/api/JuryMember/${id}`,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json",//Indique au serveur que tu envoies du JSON
          },
          body:JSON.stringify(updatedMember)//convertit l'objet updatedUser en JSON
        });
        if (response.ok) {
          console.log("JuryMember edited successfully");
          updateJuryMember(updatedMember);
          setIsSelectedMember(false)
        } else {
          console.error("Error editing JuryMember", response);
         
        }
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }
  };
  //delete juryMember
  const handleDelete = async () => {
    if (isSelectedMember) {
      try {
        const response = await fetch(`http://localhost:5197/api/JuryMember/${id}`, {
          method: "DELETE",  // Utilisation de la méthode DELETE pour supprimer
          headers: {
            "Content-Type": "application/json",
          },
        });
          if (response.ok) {
            onDeleteJuryMember(id); 
        } else {
          console.error("Error deleting JuryMember", response);
         
        }
      } catch (error) {
        console.error("Error deleting JuryMember:", error);
      }
    }
  };
  return(
  <React.Fragment>
    <tr onClick={onClick}>
      <td className="align-middle">
        <CustomInput
          type="checkbox"
          checked={isSelectedMember}
          onChange={handleCheckboxChange}
          id={`trTableJuryMembers-${id}`}
          label=""
          inline
        />
      </td>
      <td className="align-middle">
        <a href="#" id={`trTableJuryMembersTooltip-${id}`}>
          <i className="fa fa-fw fa-star-o"></i>
        </a>
        <UncontrolledTooltip
          placement="top"
          target={`trTableJuryMembersTooltip-${id}`}
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
    <UpdateJuryMemberModal  isOpen={isModalOpen}
                      toggle={toggleModal}
                      onUpdateJuryMember={handleEdit}
                      juryMember={juryMember}/>
  </React.Fragment>
)};


export { TrTableJuryMembers };
