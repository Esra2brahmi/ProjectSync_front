import React from 'react';
import PropTypes from 'prop-types';

const DlRowContacts = ({ leftSideClassName, rightSideClassName, supervisor }) => (
    <React.Fragment>
        <dl className="row">
            <dt className={ `col-sm-3 ${ leftSideClassName }` }>Phone</dt>
            <dd className={ `col-sm-9 ${ rightSideClassName }` }>{supervisor?.phoneNumber || 'phone number not specified'}</dd>
            <dt className={ `col-sm-3 ${ leftSideClassName }` }>Email</dt>
            <dd className={ `col-sm-9 ${ rightSideClassName }` }>
                {supervisor?.email || 'email not specified'}
            </dd>
        </dl>
    </React.Fragment>
)
DlRowContacts.propTypes = {
    leftSideClassName: PropTypes.string,
  rightSideClassName: PropTypes.string,
  supervisor: PropTypes.shape({
    phoneNumber: PropTypes.string,
    email: PropTypes.string,
    // Include other supervisor properties you might use
  }).isRequired
};
DlRowContacts.defaultProps = {
    leftSideClassName: "text-right",
    rightSideClassName: "text-left"
};

export { DlRowContacts };
