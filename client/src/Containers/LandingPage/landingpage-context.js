import React from 'react';

const LandingPageContext = React.createContext({
    ChangeSignupUsername: ()=>{},
    ChangeSignupPassword: ()=>{},
    ChangeSignupConfirm: ()=>{},
    ChangeSignupEmail: ()=>{},
    ChangeSigninUsername: ()=>{},
    ChangeSigninPassword: ()=>{},
    signup_username: '',
    signup_password: '',
    signup_confirm: '',
    signup_email: '',
    signin_username: '',
    signin_password: '',
    hi: ''
});

export default LandingPageContext