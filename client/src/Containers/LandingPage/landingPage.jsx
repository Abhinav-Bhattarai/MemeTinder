import React, { Fragment, useState } from 'react';
import Background from '../../assets/bg.jpg';
import Login from '../../Components/Credentials/Login/login';
import Signup from '../../Components/Credentials/Signup/signup';
import Navbar from '../../Components/Navbar/LandiingPage/navbar';
import Logo from '../../Components/UI/Logo/logo';
import LandingPageContext from './landingpage-context';

import './landingPage.scss';

const LandingPage = () => {

    const [signup_card, SetSignupCard] = useState(false);
    const [login_card, SetLoginCard] = useState(false);
    const [signup_username, SetSignupUsername] = useState('')
    const [signup_password, SetSignupPassword] = useState('')
    const [signup_confirm, SetSignupConfirm] = useState('')
    const [signup_email, SetSignupEmail] = useState('')
    const [signin_username, SetSigninUsername] = useState('')
    const [signin_password, SetSigninPassword] = useState('')

    const SignupCardHandler = ()=>{
        SetSignupCard(!signup_card)
    }

    const LoginCardHandler = ()=>{
        SetLoginCard(!login_card)
    }

    const ChangeSignupUsername = (event)=>{
        const value = event.target.value
        SetSignupUsername(value)
    }
    const ChangeSignupPassword = (event)=>{
        const value = event.target.value
        SetSignupPassword(value)
    }

    const ChangeSignupConfirm = (event)=>{
        const value = event.target.value
        SetSignupConfirm(value)
    }

    const ChangeSignupEmail = (event)=>{
        const value = event.target.value
        SetSignupEmail(value)
    }

    const ChangeSigninUsername = (event)=>{
        const value = event.target.value
        SetSigninUsername(value)
    }

    const ChangeSigninPassword = (event)=>{
        const value = event.target.value
        SetSigninPassword(value)
    }

    return (
        <Fragment>
            <main onClick={
                ()=>{
                    if(signup_card){
                        SignupCardHandler()
                    }
                    else if(login_card){
                        LoginCardHandler()
                    }
                }
            }>
                <Navbar 
                    TriggerLogin={SetLoginCard}
                />
                <main className='background-image-container' style={{height: '100%'}}>
                    <img src={Background} alt='background'/>
                </main>
                <main className='landingpage-middle-flex'>
                    <Logo type='LandingPage'/>
                    <button id='middle-flex-btn' onClick={SignupCardHandler}>CREATE ACCOUNT</button>
                </main>
            </main>
            {(signup_card || login_card)?
            (
                <LandingPageContext.Provider value={{
                    signup_username,
                    signup_password,
                    signup_confirm,
                    signup_email,
                    signin_username,
                    signin_password,
                    ChangeSignupUsername: (e)=>ChangeSignupUsername(e),
                    ChangeSignupPassword: (e)=>ChangeSignupPassword(e),
                    ChangeSignupConfirm: (e)=>ChangeSignupConfirm(e),
                    ChangeSignupEmail: (e)=>ChangeSignupEmail(e),
                    ChangeSigninUsername: (e)=>ChangeSigninUsername(e),
                    ChangeSigninPassword: (e)=>ChangeSigninPassword(e)
                }}>
    
                    {(signup_card)?<Signup/>:null}
                    {(login_card)?<Login/>:null}
    
                </LandingPageContext.Provider>
            )
            :null}
        </Fragment>
    )
}

export default LandingPage
