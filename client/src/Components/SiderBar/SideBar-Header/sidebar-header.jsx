import React, { Fragment } from "react";
import "./sidebar-header.scss";

const SidebarHeader = ({ profile_picture, TriggerDropdown, children }) => {
  return (
    <Fragment>
      <header className="sidebar-header">
        {profile_picture ? (
          <img
            draggable="false"
            src={profile_picture}
            alt=" profile "
            onClick={TriggerDropdown}
            height="35px"
            width="35px"
          />
        ) : (
          <div className="temp-img"></div>
        )}

        <div className="sidebar-header-name">My Profile</div>
        {children}
      </header>
    </Fragment>
  );
};

export default SidebarHeader;
