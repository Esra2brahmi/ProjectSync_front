import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Badge,
  Avatar,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  AvatarAddOn,
  Media,
  DropdownItem,
} from "./../../../../components";


const badges = ["secondary"];

const status = ["success", "danger", "warning", "secondary"];

const TrTableFilesList = ({ department }) => {
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigateToGallery = (projectLevel) => {
    // Navigate to gallery with department id and project level
    history.push(`/apps/gallery-table?departmentId=${department.id}&level=${projectLevel}`);
  };

  return (
    <React.Fragment>
      <tr>
        <td className="align-middle">
          <Media>
            <Media left middle>
              <i className="fa fa-fw fa-folder-o fa-3x mr-2"></i>
            </Media>
            <Media body>
              <div className="text-inverse">{department.name}</div>
              <span>Chair: {department.chairName}</span>
              <br />
              <span>Contact: {department.phoneNumber}</span>
            </Media>
          </Media>
        </td>
        <td className="align-middle">
          <Badge color="primary" pill className="mr-1">
            PFA1
          </Badge>
          <Badge color="info" pill className="mr-1">
            PFA2
          </Badge>
          <Badge color="success" pill className="mr-1">
            PFE
          </Badge>
        </td>
        <td className="align-middle text-right">
          <UncontrolledButtonDropdown isOpen={isOpen} toggle={handleDropdownToggle}>
            <DropdownToggle color="link">
              <i className="fa fa-gear" />
              <i className="fa fa-angle-down ml-2" />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem onClick={() => handleNavigateToGallery('PFA1')}>
                <i className="fa fa-fw fa-file-text-o mr-2"></i>
                PFA1
              </DropdownItem>
              <DropdownItem onClick={() => handleNavigateToGallery('PFA2')}>
                <i className="fa fa-fw fa-bar-chart mr-2"></i>
                PFA2
              </DropdownItem>
              <DropdownItem onClick={() => handleNavigateToGallery('PFE')}>
                <i className="fa fa-fw fa-graduation-cap mr-2"></i>
                PFE
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledButtonDropdown>
        </td>
      </tr>
    </React.Fragment>
  );
};

export { TrTableFilesList };
