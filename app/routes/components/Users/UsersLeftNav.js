import React from 'react';

import { 
    Nav,
    NavItem,
    NavLink,
    Badge
} from './../../../components';

const UsersLeftNav = () => (
    <React.Fragment>
        { /* START Left Nav  */}
        <div className="mb-4">
            <Nav pills vertical>
                <NavItem>
                    <NavLink href="#" active>
                        All Students
                    </NavLink>
                </NavItem>
                
            </Nav>
        </div>
        { /* END Left Nav  */}
        { /* START Left Nav  */}
        <div className="mb-4">
            <div className="small mb-3">
                Tags
            </div>
            <Nav pills vertical>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-primary align-self-center mr-2"></i>
                        Software Engineering
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            12
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-info align-self-center mr-2"></i>
                        Industrial Engineering
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            3
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-success align-self-center mr-2"></i>
                        Mechanical Engineering
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            67
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-warning align-self-center mr-2"></i>
                        Electrical Engineering
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            5
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" className="d-flex">
                        <i className="fa fa-fw fa-circle text-danger align-self-center mr-2"></i>
                        Applied Mathematics Engineering
                        <Badge color="secondary" pill className="ml-auto align-self-center">
                            1
                        </Badge>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#">
                        <i className="fa fa-fw fa-plus mr-2"></i>
                        Add New Department
                    </NavLink>
                </NavItem>
            </Nav>
        </div>
        { /* END Left Nav  */}
    </React.Fragment>
)

export { UsersLeftNav };
