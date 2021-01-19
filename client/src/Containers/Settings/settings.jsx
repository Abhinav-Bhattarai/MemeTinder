import React, { Fragment } from "react";
import '../../Components/PostContainer/post-container.scss';
import SettingsHeader from "./Settings Header/settings-header";

const Settings = ({ blur }) => {
  return (
      <Fragment>
          <main className='main-post-container' style={{filter: `blur(${blur})`}}>
                <SettingsHeader/>
          </main>
      </Fragment>
  );
};

export default Settings;
