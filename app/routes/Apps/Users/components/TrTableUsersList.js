import React,{ useState } from "react";
import {
  Media,
  Avatar,
  AvatarAddOn,
  CustomInput,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "./../../../../components";
import EditUserModal from "./EditUserModal"; 
import {  randomAvatar } from "./../../../../utilities";

const TrTableUsersList = ({ user,index, onDeleteUser,updateUser }) => {
  const { id,userFirstName, userLastName, department, email, classe, projectType,supervisorFullName } = user;
  const [isSelected, setIsSelected] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
 const toggleModal = () => setModalOpen(!isModalOpen);
  const avatar = [
    [
      <AvatarAddOn.Icon
        className="fa fa-circle"
        color="facebook"
        key="avatar-icon-bg"
      />,
      <AvatarAddOn.Icon
        className="fa fa-facebook"
        color="white"
        key="avatar-icon-fg"
        small
      />,
    ],
    [
      <AvatarAddOn.Icon
        className="fa fa-circle"
        color="twitter"
        key="avatar-icon-bg"
      />,
      <AvatarAddOn.Icon
        className="fa fa-twitter"
        color="white"
        key="avatar-icon-fg"
        small
      />,
    ],
    [
      <AvatarAddOn.Icon
        className="fa fa-circle"
        color="linkedin"
        key="avatar-icon-bg"
      />,
      <AvatarAddOn.Icon
        className="fa fa-linkedin"
        color="white"
        key="avatar-icon-fg"
        small
      />,
    ],
    [
      <AvatarAddOn.Icon
        className="fa fa-circle"
        color="foursquare"
        key="avatar-icon-bg"
      />,
      <AvatarAddOn.Icon
        className="fa fa-foursquare"
        color="white"
        key="avatar-icon-fg"
        small
      />,
    ],
    [
      <AvatarAddOn.Icon
        className="fa fa-circle"
        color="paypal"
        key="avatar-icon-bg"
      />,
      <AvatarAddOn.Icon
        className="fa fa-paypal"
        color="white"
        key="avatar-icon-fg"
        small
      />,
    ],
  ];
  const handleCheckboxChange = () => {setIsSelected(!isSelected);};
  
  const handleEdit=async(updatedUser)=>{
    if(isSelected){
      try{
        const response=await fetch(`http://localhost:5197/user/${id}`,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify(updatedUser)
        });
        if (response.ok) {
          console.log("User edited successfully");
          updateUser(updatedUser);
          setIsSelected(false)
        } else {
          console.error("Error editing user", response);
         
        }
      } catch (error) {
        console.error("Error editing user:", error);
      }
    }
  };
  
  const handleDelete = async () => {
    if (isSelected) {
      try {
        const response = await fetch(`http://localhost:5197/user/${id}`, {
          method: "DELETE",  
          headers: {
            "Content-Type": "application/json",
          },
        });
          if (response.ok) {
          onDeleteUser(id); 
        } else {
          console.error("Error deleting user", response);
         
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };
  
  return (
    <React.Fragment>
      <tr>
        <td className="align-middle">
          <CustomInput
            type="checkbox"
            id={`TrTableUsersList-${id}`}
            label=""
            inline
            checked={isSelected}
            onChange={handleCheckboxChange}
          />
        </td>
        <td className="align-middle">
          <a href="#">
            <i className="fa fa-fw fa-star-o"></i>
          </a>
        </td>
        <td>
          <Media>
            <Media left className="d-flex align-self-center mr-3">
              <Avatar.Image
                size="md"
                src={randomAvatar()}
                className="align-self-center"
              />
            </Media>
            <Media body>
              <a className="mt-0 d-flex text-decoration-none" href="#">
                {userFirstName} {userLastName}
              </a>
              <span>{classe}</span>
            </Media>
          </Media>
        </td>
        <td className="align-middle">{email}</td>
        <td className="align-middle">{department}</td>
        <td className="align-middle text-right">
          <UncontrolledButtonDropdown>
            <DropdownToggle color="link" className="pr-0">
              <i className="fa fa-bars"></i>
              <i className="fa fa-angle-down ml-2" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="fa fa-fw fa-user mr-2"></i>
                Profile
              </DropdownItem>
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
      <EditUserModal  isOpen={isModalOpen}
                      toggle={toggleModal}
                      editUser={handleEdit}
                      user={user} />

    </React.Fragment>
  );
};


export { TrTableUsersList };
