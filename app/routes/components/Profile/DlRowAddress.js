import React from 'react';
import PropTypes from 'prop-types';

const DlRowAddress = ({ leftSideClassName, rightSideClassName, supervisor }) => (
  <React.Fragment>
    <dl className="row">
      <dt className={`col-sm-3 ${leftSideClassName}`}>Address</dt>
      <dd className={`col-sm-9 ${rightSideClassName}`}>
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