import React from "react";
import { Avatar } from "./../../components";

const Profile = ({ supervisor }) => {
  // Simple SVG user icon
  const defaultUserIcon = "data:image/svg+xml;utf8," + 
    encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="#6c757d"/>
        <path fill="white" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
      </svg>
    `);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center my-3">
        <Avatar.Image
          size="lg"
          src={defaultUserIcon}
        />
      </div>
      <div className="mb-4 text-center">
        <a className="h6 text-decoration-none" href="#">
          {supervisor ? `${supervisor.firstName} ${supervisor.lastName}` : 'Select a supervisor'}
        </a>
        <div className="text-center mt-2">{supervisor ? supervisor.academicTitle : 'Title will appear here'}</div>
        <div className="text-center">
          <i className="fa fa-map-marker mr-1"></i>
          {supervisor ? supervisor.address : 'Address will appear here'}
        </div>
      </div>
    </React.Fragment>
  );
};

export { Profile };