import React, { Fragment, useState } from "react";
import "./pre-registration.scss";
import "../Credentials/Signup/signup.scss";
import { TimesIcon } from "../Credentials/Signup/signup";

const PreRegistration = () => {
  const [fullname, SetFullname] = useState("");
  const [email, SetEmail] = useState("");

  return (
    <Fragment>
      <main className="pre-registration-container">
        <header className="signup-header">
          <span>
            <TimesIcon />
          </span>
          <div
            style={{
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            PRE-REGISTER
          </div>
        </header>
        <form>
          <main className="signup-input-container">
            <label>Fullname</label>
            <div className="signup-input-rel">
              <input
                type="username"
                spellCheck="false"
                autoFocus
                className="signup-input"
                onChange={(event)=> SetFullname(event.target.value)}
                value={fullname}
              />
            </div>
        
            <label>Email</label>
            <div className="signup-input-rel">
              <input
                type="password"
                className="signup-input"
                onChange={(event)=> SetEmail(event.target.value)}
                value={email}
              />
            </div>
          </main>
          <div className="login-btn-container-rel">
            <button className="signup-btn login-btn-form">Login</button>
            {/* {loader ? (
              <div className="spinner-abs">
                <Spinner />
              </div>
            ) : null} */}
          </div>
        </form>
      </main>
    </Fragment>
  );
};

export default PreRegistration;
