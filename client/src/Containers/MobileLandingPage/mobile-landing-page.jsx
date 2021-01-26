import React, { Fragment, useState } from "react";
import { IconContext } from "react-icons";
import { FaSadCry } from "react-icons/fa";
import PreRegistration from "../../Components/PreNotification/pre-registration";
import "./mobile-landing-page.scss";

const SadFace = () => {
  return (
    <IconContext.Provider
      value={{
        style: {
          fontSize: "250px",
          color: "#ff385c",
        },
      }}
    >
      <FaSadCry />
    </IconContext.Provider>
  );
};

const MobileLandingPage = () => {
  const [pre_registration_popup, SetPreRegistrationPopup] = useState(false);

  return (
    <Fragment>
      <main className="mobile-container">
        <header>MemeTinder</header>
        <article>
          <SadFace />
        </article>
        <div>
          Hi, I am very sorry for all the mobile users who visited the page. I
          am currently working on Native apps for both Android and IOS devices.
        </div>
        <footer>Fill up the form for pre-notification</footer>
        {
          (localStorage.getItem('pre-registered')) ? (
            <main className='submitted'>
              SUBMITTED
            </main>
          ) : 
          <main className="submit" onClick={() => SetPreRegistrationPopup(true)}>
            Pre-Register
          </main>
        }
        {
            (pre_registration_popup) ? 
            <PreRegistration 
              CancelPopup = { () => SetPreRegistrationPopup(false) }
            /> 
            : null
        }
      </main>
    </Fragment>
  );
};

export default MobileLandingPage;
