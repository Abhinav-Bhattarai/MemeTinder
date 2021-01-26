import axios from "axios";
import React, { Fragment, useState } from "react";
import "../Credentials/Signup/signup.scss";
import "./pre-registration.scss";

const PreRegistration = ({ CancelPopup }) => {
  const [fullname, SetFullname] = useState("");
  const [email, SetEmail] = useState("");

  const SubmitPreRegistration = (event)=>{
    event.preventDefault();
    if(fullname.length >= 5 && email.length >= 11){
      axios.post('/mobile', {Email: email}).then(() => {
        SetFullname('');
        SetEmail('');
        localStorage.setItem('pre-registered', true);
        CancelPopup();
      })
    }
  }

  return (
    <Fragment>
      <main className="pre-registration-container">
        <header className="header">
          <div id='name'>
            PRE-REGISTRATION
          </div>
        </header>
        <form onSubmit={ SubmitPreRegistration }>
          <main className="signup-input-container">
            <label>Fullname</label>
            <input
              type="username"
              spellCheck="false"
              autoFocus
              className="signup-input"
              onChange={(event)=> SetFullname(event.target.value)}
              value={fullname}
            />
        
            <label>Email</label>
            <input
              type="password"
              className="signup-input"
              onChange={(event)=> SetEmail(event.target.value)}
              value={email}
            />
           
          </main>
          <div className="login-btn-container-rel">
            <button className="signup-btn login-btn-form">SUBMIT</button>
          </div>
        </form>
      </main>
    </Fragment>
  );
};

export default PreRegistration;
