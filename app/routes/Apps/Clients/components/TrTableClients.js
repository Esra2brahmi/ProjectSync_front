import React from "react";
import { faker } from "@faker-js/faker";
import PropTypes from "prop-types";

import {
  Badge,
  Avatar,
  CustomInput,
  UncontrolledTooltip,
  AvatarAddOn,
  Media,
  Button
} from "./../../../../components";

import { randomArray } from "./../../../../utilities";

const status = ["secondary", "success", "warning", "danger"];

const tag = ["secondary", "primary", "info"];

const TrTableClients = ({ id, firstName, lastName, email, phoneNumber,academicTitle ,onClick,isSelected}) => (
  <React.Fragment>
    <tr onClick={onClick}>
      <td className="align-middle">
        <CustomInput
          type="checkbox"
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
       <Button color="link"
              className="align-self-center mr-2 text-decoration-none"
              id="tooltipSettings"
              >
              <i className="fa fa-fw fa-gear"></i>
              </Button>
      </td>
    </tr>
  </React.Fragment>
);
TrTableClients.propTypes = {
  id: PropTypes.node,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  academicTitle: PropTypes.string,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool
};
TrTableClients.defaultProps = {
  id: "1",
  isSelected: false
};

export { TrTableClients };
