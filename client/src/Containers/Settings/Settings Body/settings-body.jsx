import React, { Fragment, useRef, useState } from "react";
import "./settings-body.scss";
import Simplebar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";
import { AddIcon } from "../Settings Header/settings-header";
import axios from "axios";
import { withRouter } from 'react-router-dom';

const SettingsBody = ({ Profile, ChangeProfile, history }) => {
  const InputRef = useRef(null);
  const [ new_profile, SetNewProfile ] = useState(Profile);
  const [ profile_condition, SetProfileCondition ] = useState(false);
  const [ username_condition, SetUsernameCondition ] = useState(false);
  const [ username, SetUsername ] = useState(localStorage.getItem("Username"));

  const ChangeNewProfile = (event) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        SetNewProfile(reader.result);
        SetProfileCondition(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const UsernameChange = (event) => {
    const value = event.target.value;
    SetUsername(value);
    if(localStorage.getItem('Username') !== value && value.length >= 4){
      if(username_condition === false){
        SetUsernameCondition(true);
      }
    }else{
      SetUsernameCondition(false);
    }
  };

  const SubmitChanges = (event)=>{
    event.preventDefault();
    if(profile_condition || username_condition){
        const context = {
            ProfilePicture: new_profile,
            Username: username
        }
        axios.put(`http://localhost:8000/change-settings/${localStorage.getItem('Username')}`, context).then(()=>{
            localStorage.setItem('Username', username);
            ChangeProfile(new_profile);
            history.push('/posts');
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

export default withRouter(SettingsBody);
