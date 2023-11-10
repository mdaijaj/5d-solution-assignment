import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import Routing from './menubar';
import {allMenu} from  '../data_store'


const Sidebar = () => {

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#022238">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
          5D SOLUTIONS
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>

            {allMenu.map((menu, index) => (
              <NavLink exact to={menu.path} activeClassName="activeClicked">
                <CDBSidebarMenuItem icon={menu.icon}>{menu.name}</CDBSidebarMenuItem>
              </NavLink>
            ))}

          </CDBSidebarMenu> 
        </CDBSidebarContent>
      </CDBSidebar>

      {/* manage routing */}
      <Routing/>
    </div>
  );
};

export default Sidebar;