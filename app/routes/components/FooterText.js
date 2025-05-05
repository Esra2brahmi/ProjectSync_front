import React from 'react';
import PropTypes from 'prop-types';

const FooterText = () => (
  <div className="text-sm text-gray-500 text-center">
    © {new Date().getFullYear()} ProjectSync. All rights reserved.
  </div>
);

export { FooterText };

