import React, { Fragment, useState } from 'react';
import axios from 'axios';

import Background from '../../assets/bg.jpg';
import Login from '../../Components/Credentials/Login/login';
import Signup from '../../Components/Credentials/Signup/signup';
import Navbar from '../../Components/Navbar/LandiingPage/navbar';
import Logo from '../../Components/UI/Logo/logo';
import LandingPageContext from './landingpage-context';

import './landingPage.scss';
import ForgetPassword from '../../Components/Credentials/Login/forget-password';
import PasswordChange from '../../Components/Credentials/PasswordChange/password-change';

const LandingPage = ({ authenticate }) => {

    const [ signup_card, SetSignupCard ] = useState( false );
    const [ login_card, SetLoginCard ] = useState( false );
    const [ forget_password_card, SetForgetCard ] = useState( false );
    const [ signup_username, SetSignupUsername ] = useState( '' );
    const [ signup_password, SetSignupPassword ] = useState( '' );
    const [ signup_confirm, SetSignupConfirm ] = useState( '' );
    const [ signup_email, SetSignupEmail ] = useState( '' );
    const [ signup_gender, SetSignupGender ] = useState( null )
    const [ signin_username, SetSigninUsername ] = useState( '' );
    const [ signin_password, SetSigninPassword ] = useState( '' );
    const [ forget_number, SetForgetNumber ] = useState( '' );
    const [ signin_cred_error, SetSigninCredError ] = useState( [] );
    const [ signup_cred_error, SetSignupCredError ] = useState( [] );
    const [ forget_cred_error, SetForgetCredError ] = useState( null );
    const [ new_password_popup, SetNewPasswordPopup ] = useState( false );
    const [ new_password_password, SetNewPassword ] = useState( '' );
    const [ new_password_confirm, SetPasswordConfirm ] = useState( '' );
    const [ new_password_err, SetNewPasswordErr ] = useState( null );
    const [ login_loader, SetLoginLoader ] = useState( false );
    const [ signup_loader, SetSignupLoader ] = useState( false );
    const [ password_change_loader, SetPasswordChangeLoader ] = useState( false );

    const SignupCardHandler = ()=>{
        SetSignupCard(!signup_card)
    };

    const LoginCardHandler = ()=>{
        SetLoginCard(!login_card)
    };

    const ChangeSignupUsername = (event)=>{
        const value = event.target.value;
        SetSignupUsername(value)
    };

    const ChangeSignupPassword = (event)=>{
        const value = event.target.value;
        SetSignupPassword(value)
    };

    const ChangeSignupConfirm = (event)=>{
        const value = event.target.value;
        SetSignupConfirm(value)
    };

    const ChangeSignupEmail = (event)=>{
        const value = event.target.value;
        SetSignupEmail(value)
    };

    const ChangeSigninUsername = (event)=>{
        const value = event.target.value;
        SetSigninUsername(value)
    };

    const ChangeSigninPassword = (event)=>{
        const value = event.target.value;
        SetSigninPassword(value)
    };

    const ChangeForgetNumber = (event)=>{
        const value = event.target.value;
        SetForgetNumber(value)
    };

    const ChangeSignupGender = (event)=>{
        const value = event.target.value;
        SetSignupGender(value)
    };

    const ChangeNewPassword = (event)=>{
        const value = event.target.value;
        SetNewPassword(value);
    }

    const ChangeNewPasswordConfirm = (event)=>{
        const value = event.target.value;
        SetPasswordConfirm(value);
    }

    const SubmitNewPassword = (event)=>{
        event.preventDefault();
        if(new_password_password === new_password_confirm && new_password_password.length > 7){
            const number_regex = /[0-9]/;
            if(number_regex.exec(new_password_password) !== null){
                const context = {
                    Username: signin_username,
                    Password: new_password_password,
                    Confirm: new_password_confirm
                }
                SetPasswordChangeLoader(true);
                axios.put('/forget', context).then((response)=>{
                    const data = response.data;
                    const required_data = {password_changed: true};
                    if(JSON.stringify(data) === JSON.stringify(required_data)){
                        SetNewPasswordPopup(false);
                    }else{ 
                        // error's;
                        SetPasswordChangeLoader(false);
                        SetNewPasswordErr('Cred');
                    }
                });
            }else{
                SetNewPasswordErr('Number');
            }
        }else{

            if(new_password_password.length < 8){
                SetNewPasswordErr('length');
            }

            else if(new_password_confirm !== new_password_password){
                SetNewPasswordErr('no match');
            }
        }
    }

    const LoginCredentialSubmitHandler = (event)=>{
        event.preventDefault();
        
        if(signin_username.length > 3 && signin_password.length > 7){
            const number_regex = /[0-9]/;
            const value = signin_password
            if(number_regex.exec(value) !== null){
                // further axis request;
                const context = {
                    Username: signin_username,
                    Password: signin_password
                }
                SetLoginLoader(true);
                axios.post('/login', context).then((response)=>{
                    const username_err = {error_type: 'Password', message: 'Password Do not match'};

                    const password_err = {error_type: 'Username', message: 'No such Username registered'};

                    const data = response.data;

                    if(JSON.stringify(data) === JSON.stringify(username_err) || JSON.stringify(data) === JSON.stringify(password_err)){
                        // error handling in the form bootstrap invalid one;
                        const dummy = [];
                        dummy.push({error_type: 'Invalid', message: 'Invalid Credentials'});
                        SetLoginLoader(false);
                        SetSigninCredError(dummy);
                    }else{
                        // storing jwt token and other cred information;
                        localStorage.setItem('user-data', JSON.stringify(response.data.data));
                        localStorage.setItem('auth-token', response.data.token);
                        localStorage.setItem('auth-status', true);
                        localStorage.setItem('Username', response.data.data.Username);
                        authenticate(false)
                        // changing the parent class authentication state to true;
                    }
                })
            }
        }else{
            // Change UX state for form user-experience to show type of error;
            const dummy = [...signin_cred_error]
            if(signin_username.length < 4){
                dummy.push({error_type: 'Username', message: 'The username should be atleast 4 characters'})
            }
            if(signin_password.length < 8){
                dummy.push({error_type: 'Password', message: 'Password must contain number and should be atleast 8 characters'})
            }

            SetSigninCredError(dummy);
        }
    };

    const SignupCredentialSubmitHandler = (event)=>{
        event.preventDefault();
        if(signup_username.length > 3 && signup_password.length >= 8 && signup_email.length >= 11 && signup_password === signup_confirm && signup_gender){
            const number_regex = /[0-9]/;
            if(number_regex.exec(signup_password) !== null){
                // further axios request
                const context = {
                    Username: signup_username,
                    Email: signup_email,
                    Password: signup_password,
                    Confirm: signup_confirm,
                    Gender: signup_gender
                };
                SetSignupLoader(true);
                axios.post('/register', context).then((response)=>{
                    const error = {error_type: "Username", message: "Username Already exists"}
                    if(JSON.stringify(response.data) !== JSON.stringify(error)){
                        // storing jwt token, auth-status cred information;
                        localStorage.setItem('user-data', JSON.stringify(response.data.data));
                        localStorage.setItem('auth-token', response.data.token);
                        localStorage.setItem('auth-status', true);
                        localStorage.setItem('Username', response.data.data.Username);
                        authenticate(false);
                        // changing the parent class authentication state to true;
                    }else{
                        SetSignupLoader(false);
                        SetSignupCredError([error])
                    }
                })
            }
        }else{
            // Change UX state for form user-experience to show type of error;
            const dummy = [...signup_cred_error];
            if(signup_username.length < 4){
                dummy.push({error_type: 'Username', message: 'The username should be atleast 4 characters'})
            }

            if(signup_password.length < 8){
                dummy.push({error_type: 'Password', message: 'Password must contain number and should be atleast 8 characters'})
            }

            if(signup_password !== signup_confirm){
                dummy.push({error_type: 'Confirm', message: 'Password do not match'})
            }
            
            if(signup_email.length < 11){
                dummy.push({error_type: 'Email', message: 'Invalid Email credentials'})
            }
            SetSignupCredError(dummy)
        }
    };

    const TriggerForgetPassword = (type)=>{
        if(type === false && signin_username.length >= 4){
            // axios request to get pass-token;
            // triggering get request to receive the token and later comparing thenumber in the token for sort of OTP checking via Email;
            axios.get(`/forget/${signin_username}`).then((response)=>{
                const data = response.data;
                const error = {error_type: 'Username', error: 'Username not found'}
                if(JSON.stringify(data) !== JSON.stringify(error)){
                    localStorage.setItem('pass-token', data.pass_token);
                    SetLoginCard(false)
                    SetForgetCard(true);
                }else{
                    // error about invalid username 
                    const dummy = [];
                    dummy.push({error_type: 'Username', message: 'Username not found'})
                    SetSigninCredError(dummy);
                }
            })
        }else{
            const dummy = [];
            dummy.push({error_type: 'Username', message: 'Enter your username first'})
            SetSigninCredError(dummy);
        }
    };

    const FrogetPasswordSubmit = (event)=>{
        // this executes and checks the OTP verifications and access;
        event.preventDefault();
        if(forget_number.length === 5){
            const context = {
                token: localStorage.getItem('pass-token'),
                number: forget_number
            };
            axios.post('/forget', context).then((response)=>{
                const condition = {access: true} 
                if(JSON.stringify(response.data) === JSON.stringify(condition)){
                    SetForgetCard(false);
                    SetNewPasswordPopup(true);
                }else{
                    SetForgetCredError('Wrong OTP entered, re-enter the OTP');
                }
            })
        }else{
            SetForgetCredError('The OTP length should be 5 characters');
        }
    };

    return (
        <Fragment>
            <main onClick={
                ()=>{

                    if(signup_card){
                        SignupCardHandler();
                        SetSignupCredError([]);
                    }

                    else if(login_card){
                        LoginCardHandler();
                        SetSigninCredError([]);
                    }

                    else if(forget_password_card){
                        TriggerForgetPassword(true)
                    }

                    else if(new_password_popup){
                        SetNewPasswordPopup(false);
                    }

                }
            }>
                <Navbar 
                    blur = { (login_card || signup_card || forget_password_card || new_password_popup) ? true : false }
                    TriggerLogin={ SetLoginCard }
                />
                <main className='background-image-container' style={
                    (login_card || signup_card || forget_password_card || new_password_popup) ? { height: '100%', filter: `blur(5px)` } : { height: '100%' }
                }>

                    <img
                        src = { Background }
                        alt = 'background'
                    />

                </main>
                <main className='landingpage-middle-flex' style={(login_card || signup_card || forget_password_card || new_password_popup) ? { filter: `blur(5px)` } : {  }}>
                    <Logo type='LandingPage'/>
                    <button id='middle-flex-btn' onClick={ SignupCardHandler }>CREATE ACCOUNT</button>
                </main>
            </main>

            {(signup_card || login_card || forget_password_card || new_password_popup)?
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
                    ChangeSigninPassword: (e)=>ChangeSigninPassword(e),
                }}>
    
                    {
                        (signup_card)?
                            <Signup 
                                ErrorContainer= { signup_cred_error } 
                                SignupCardHandler= { SignupCardHandler } 
                                Register= { SignupCredentialSubmitHandler }
                                ChangeRadio = { (e)=>ChangeSignupGender(e) }
                                loader = { signup_loader }
                            />
                        :null
                    
                    }

                    {
                        ( login_card )?
                            <Login 
                                ErrorContainer={ signin_cred_error } 
                                LoginCardHandler={ LoginCardHandler } 
                                Logger={ LoginCredentialSubmitHandler }
                                forget_password={ (condition) => TriggerForgetPassword(condition) }
                                loader = { login_loader }
                            />
                        :null
                    }

                    {
                        ( forget_password_card ) ? 
                            <ForgetPassword
                                value = { forget_number } 
                                set_value = { (e)=>ChangeForgetNumber(e) } 
                                submit = { (e)=>FrogetPasswordSubmit(e) } 
                                exit = { TriggerForgetPassword }
                                error = { forget_cred_error } 
                            />:null

                    }

                    {
                        ( new_password_popup ) ? 
                            <PasswordChange
                                password = { new_password_password }
                                confirm = { new_password_confirm }
                                ChangePasswordValue = { (e) => ChangeNewPassword(e) }
                                ChangeConfirmValue = { (e) => ChangeNewPasswordConfirm(e) }
                                SubmitChange = { (e) => SubmitNewPassword(e) }
                                Cancel = { ()=> SetNewPasswordPopup(false) }
                                error = { new_password_err }
                                loader = { password_change_loader }
                            />
                        : null
                    }
    
                </LandingPageContext.Provider>
            )
            :null}
        </Fragment>
    )
}

export default LandingPage;