import React, { Fragment, useRef, useState } from "react";
import "./settings-body.scss";
import Simplebar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { AddIcon } from "../Settings Header/settings-header";
import axios from "axios";

const SettingsBody = ({ Profile, ChangeProfile }) => {
  const InputRef = useRef(null);
  const [ new_profile, SetNewProfile ] = useState(Profile);
  const [ username, SetUsername ] = useState(localStorage.getItem("Username"));

  const ChangeNewProfile = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        SetNewProfile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const UsernameChange = (event) => {
    const value = event.target.value;
    SetUsername(value);
  };

  const SubmitChanges = (event)=>{
    event.preventDefault();
    if(new_profile && localStorage.getItem('Username') !== username && username.length >= 4){
        const context = {
            ProfilePicture: new_profile,
            Username: username
        }
        axios.put('http://localhost:8000/change-settings/both', context).then(()=>{
            localStorage.setItem('Username', username);
            ChangeProfile(new_profile);
        });
    }
    else if(new_profile){
        const context = {
            ProfilePicture: new_profile
        }
        axios.put('http://localhost:8000/change-settings/profile', context).then(()=>{
            ChangeProfile(new_profile);
        });
    }
    else if(localStorage.getItem('Username') !== username && username.length >= 4){
        const context = {
            Username: username
        }
        axios.put('http://localhost:8000/change-settings/username', context).then(()=>{
            localStorage.setItem('Username', username);
        });
    }
  }

  return (
    <Fragment>
      <Simplebar style={{ maxHeight: "90%" }}>
        <main className="settings-body-container">
          <div style={{ position: "relative", textAlign: "center" }}>
            <img src={new_profile} alt="settings-profile" />
            <input
              hidden
              type="file"
              ref={InputRef}
              onChange={ChangeNewProfile}
              accept=".png, .jpeg, .svg, .jpg"
            />
            <span onClick={() => (InputRef ? InputRef.current.click() : null)}>
              <AddIcon />
            </span>
          </div>

            <div className='profile-conf-header'>Profile Configuration</div>

          <form onSubmit={ SubmitChanges }>
            <div className="settings-body-input-container">
              <label>USERNAME :</label>
              <input
                type="text"
                onChange={UsernameChange}
                value={username}
                spellCheck="false"
              />
            </div>
            <hr></hr>
            <button>
                Save Changes
            </button>
          </form>
        </main>
      </Simplebar>
    </Fragment>
  );
};

export default SettingsBody;
