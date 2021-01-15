import React, { Fragment, useRef } from 'react';
import '../Signup/signup.scss';
import { TimesIcon } from '../Signup/signup';
import { Error } from '../Login/login';

const PasswordChange = ({ SubmitChange, password, confirm, ChangePasswordValue, ChangeConfirmValue, Cancel, error }) => {

    const UsernameRef = useRef(null);
    const PasswordRef = useRef(null);

    let password_error_jsx = null;
    let confirm_error_jsx = null;
    let cred_error_jsx = null

    if(error){
        if(error === 'length'){
            UsernameRef.current.style.border = '1px solid #ff385c';
            password_error_jsx = <Error error_msg = 'Password should be atleast 8 characters long'/>
        }
        else if(error === 'Number'){
            UsernameRef.current.style.border = '1px solid #ff385c';
            password_error_jsx = <Error error_msg = 'Password should contain number'/>
        }

        else if(error === 'no match'){
            PasswordRef.current.style.border = '1px solid #ff385c';
            confirm_error_jsx = <Error error_msg = "Password's do not match"/>
        }
        else{
            UsernameRef.current.style.border = '1px solid #ff385c';
            PasswordRef.current.style.border = '1px solid #ff385c'
            cred_error_jsx = <div className='invalid-cred-error'>Invalid Credentials</div>;
        }
    }

    return (
        <Fragment>
            <main className='signup-container login-container'>
                <header className='signup-header'>
                    <span onClick={ Cancel }><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Login to Continue</div>
                </header>
                { cred_error_jsx }
                <form onSubmit = { SubmitChange }>

                    <main className='signup-input-container'>
                        <label>New Password</label>
                        <div className='signup-input-rel'>
                            <input 
                                type='password'
                                spellCheck='false'
                                autoFocus
                                className='signup-input' 
                                onChange={ ChangePasswordValue }
                                value={ password } 
                                ref={ UsernameRef }
                            />
                            { password_error_jsx }
                        </div> 
                    
                        <label>Confirm Password</label>
                        <div className='signup-input-rel'>
                            <input
                                type='password'
                                className='signup-input' 
                                onChange={ ChangeConfirmValue} 
                                value={ confirm } 
                                ref={ PasswordRef }
                            />
                            { confirm_error_jsx }
                        </div>
                    
                    </main>
                    <button className='signup-btn login-btn-form'>Change Password</button>

                </form>
            </main>
        </Fragment>
    )
}

export default PasswordChange;
