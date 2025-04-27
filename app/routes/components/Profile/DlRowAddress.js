import React from 'react';
import PropTypes from 'prop-types';

const DlRowAddress = ({ leftSideClassName, rightSideClassName, supervisor }) => (
  <React.Fragment>
    <dl className="row">
      <dt className={`col-sm-4 ${leftSideClassName}`}>Address</dt>
      <dd className={`col-sm-8 ${rightSideClassName}`}>
        {supervisor?.address || 'Address not specified'}
      </dd>
    </dl>
  </React.Fragment>
);

DlRowAddress.propTypes = {
  leftSideClassName: PropTypes.string,
  rightSideClassName: PropTypes.string,
  supervisor: PropTypes.shape({
    address: PropTypes.string,
    // Include other supervisor properties you might use
  }).isRequired
};

DlRowAddress.defaultProps = {
  leftSideClassName: "",
  rightSideClassName: ""
};

export { DlRowAddress };