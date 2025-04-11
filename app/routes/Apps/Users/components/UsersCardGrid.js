import React,{useState} from 'react';
import {
    Button,
    ButtonGroup,
    Card,
    CardBody,
    CardFooter,
    CustomInput,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Media,
    UncontrolledButtonDropdown,
    UncontrolledTooltip,
    Avatar,
    AvatarAddOn,
} from '../../../../components';
import EditUserModal from "./EditUserModal"; 
import {  randomAvatar } from "./../../../../utilities";
const UsersCardGrid = ({user,index,onDeleteUser,updateUser}) => {
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
  //method for editing the user
  const handleEdit=async(updatedUser)=>{
    if(isSelected){
      try{
        const response=await fetch(`http://localhost:5197/user/${id}`,{
          method:"PUT",
          headers: {
            "Content-Type": "application/json",//Indique au serveur que tu envoies du JSON
          },
          body:JSON.stringify(updatedUser)//convertit l'objet updatedUser en JSON
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
  //method for deleting user
  const handleDelete = async () => {
    if (isSelected) {
      try {
        const response = await fetch(`http://localhost:5197/user/${id}`, {
          method: "DELETE",  // Utilisation de la méthode DELETE pour supprimer
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
        { /* START Card */}
        <Card>
            <CardBody>
                <div className="d-flex">
                    <CustomInput className="pt-0 mt-0" type="checkbox" id={`UsersCardGrid-${ id }` } label="" inline  
                    checked={isSelected} onChange={handleCheckboxChange}/>
                    <ButtonGroup size="sm" className="ml-auto">
                        <Button color="link" size="sm" id={`UsersCardGridTooltip-${id}` } className="pt-0">
                            <i className="fa fa-star-o"></i>
                        </Button>
                        <UncontrolledTooltip placement="top" target={`UsersCardGridTooltip-${id}` }>
                            Add To Favorites
                        </UncontrolledTooltip>
                        <UncontrolledButtonDropdown className="ml-auto">
                            <DropdownToggle color="link" size="sm" className="pt-0">
                                <i className="fa fa-fw fa-bars pr-0" />
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-phone mr-2"></i>
                                    Call
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-comment mr-2"></i>
                                    Chat
                                </DropdownItem>
                                <DropdownItem>
                                    <i className="fa fa-fw fa-video-camera mr-2"></i>
                                    Video
                                </DropdownItem>
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
                    </ButtonGroup>
                </div>
                <div className="d-flex flex-column justify-content-start align-items-center text-center p-3">
                   <Avatar.Image size="md"src={randomAvatar()}className="mb-3"/>

                    <div  className="mb-2 d-flex align-items-center">
                     <p className="mb-0 mr-2 font-weight-bold text-nowrap">User FullName:</p>
                     <a className="text-decoration-none text-dark text-nowrap" href="#">
                       {userFirstName} {userLastName}
                     </a>
                    </div>

                    <div  className="mb-2 d-flex align-items-center"> 
                     <p className="mb-0 mr-2 font-weight-bold text-nowrap">Class:</p>
                     <a className="text-decoration-none text-dark text-nowrap" href="#">
                       {classe}
                     </a>
                    </div> 
                    <div  className="mb-2 d-flex align-items-center">
                     <p className="mb-0 mr-2 font-weight-bold text-nowrap">Department:</p>
                     <a className="text-decoration-none text-dark text-nowrap" href="#">
                       {department}
                     </a>
                    </div> 
                    <div className="mb-2 d-flex align-items-center">
                     <p className="mb-0 mr-2 font-weight-bold text-nowrap">Email:</p>
                     <a className="text-decoration-none text-dark text-nowrap" href="#">
                       {email}
                     </a>
                    </div>   
                         </div>
            </CardBody>
            <CardFooter className="bt-0 text-center">
                <span>
                    <span className="mr-3">
                        <i className="fa fa-user-o mr-1"></i> <span className="text-inverse">233</span> 
                    </span>
                    <span>
                        <i className="fa fa-star-o mr-1"></i> <span className="text-inverse">98</span>
                    </span>
                </span>
            </CardFooter>
        </Card>
        { /* END Card */}
        <EditUserModal  isOpen={isModalOpen}
                      toggle={toggleModal}
                      editUser={handleEdit}
                      user={user} />
    </React.Fragment>
)}


export { UsersCardGrid };
