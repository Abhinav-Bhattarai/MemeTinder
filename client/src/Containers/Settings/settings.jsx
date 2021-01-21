import React, { Fragment } from "react";
import '../../Components/PostContainer/post-container.scss';
import SettingsBody from "./Settings Body/settings-body";
import SettingsHeader from "./Settings Header/settings-header";

const Settings = ({ blur, Profile, ChangeProfile }) => {
  return (
      <Fragment>
          <main className='main-post-container' style={{filter: `blur(${blur})`}}>
              <SettingsHeader/>
              <SettingsBody Profile={ Profile } ChangeProfile={ (profile)=>ChangeProfile(profile) }/>
          </main>
      </Fragment>
  );
};

export default Settings;
