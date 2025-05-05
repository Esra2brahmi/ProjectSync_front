import React from 'react';

import { SidebarMenu } from './../../components';

export const SidebarMiddleNav = () => (
    <SidebarMenu>
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-home"></i>}
            title="Dashboards"
        >
           
            <SidebarMenu.Item title="Projects" to='/dashboards/projects' exact />
            
        </SidebarMenu.Item>
        
        
        
       
       
       
       
        { /* -------- Apps ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-mouse-pointer"></i>}
            title="Apps"
        >
            <SidebarMenu.Item title="Projects">
                <SidebarMenu.Item title="Projects List" to="/apps/projects/list" />
                <SidebarMenu.Item title="Projects Grid" to="/apps/projects/grid" />
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Tasks">
                <SidebarMenu.Item title="Tasks List" to="/apps/tasks/list" />
                <SidebarMenu.Item title="Tasks Grid" to="/apps/tasks/grid" />
                <SidebarMenu.Item title="Tasks Kanban" to="/apps/tasks-kanban" />
                <SidebarMenu.Item title="Tasks Details" to="/apps/task-details" />
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Reports">
                <SidebarMenu.Item title="Reports List" to="/apps/files/list" />
                <SidebarMenu.Item title="Reports Grid" to="/apps/files/grid" />
            </SidebarMenu.Item>
            
            <SidebarMenu.Item title="Students">
                <SidebarMenu.Item title="Students List" to="/apps/users/list" />
                <SidebarMenu.Item title="Students Grid" to="/apps/users/grid" />
            </SidebarMenu.Item>
            <SidebarMenu.Item title="Files">
                <SidebarMenu.Item title="Reports Grid" to="/apps/gallery-grid" />
                <SidebarMenu.Item title="Reports Table" to="/apps/gallery-table" />
            </SidebarMenu.Item>
           
            
            <SidebarMenu.Item title="Users" to="/apps/clients" exact />
            
        </SidebarMenu.Item>
        { /* -------- Pages ---------*/ }
        <SidebarMenu.Item
            icon={<i className="fa fa-fw fa-copy"></i>}
            title="Pages"
        >
            <SidebarMenu.Item title="Register" to="/pages/register" />
            <SidebarMenu.Item title="Login" to="/pages/login" />
            <SidebarMenu.Item title="Forgot Password" to="/pages/forgot-password" />
            <SidebarMenu.Item title="Lock Screen" to="/pages/lock-screen" />
            <SidebarMenu.Item title="Error 404" to="/pages/error-404" />
            <SidebarMenu.Item title="Confirmation" to="/pages/confirmation" />
            <SidebarMenu.Item title="Success" to="/pages/success" />
            <SidebarMenu.Item title="Danger" to="/pages/danger" />
            <SidebarMenu.Item title="Coming Soon" to="/pages/coming-soon" />
            <SidebarMenu.Item title="Timeline" to="/pages/timeline" />
        </SidebarMenu.Item>
       
    </SidebarMenu >
);
