import React, { Fragment, useRef } from 'react';
import '../Signup/signup.scss';
import { TimesIcon } from '../Signup/signup';

const PasswordChange = ({ SubmitChange, password, confirm, ChangePasswordValue, ChangeConfirmValue, Cancel }) => {

    const UsernameRef = useRef(null);
    const PasswordRef = useRef(null);

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
                        </div>
                    
                    </main>
                    <button className='signup-btn login-btn-form'>Change Password</button>

                </form>
            </main>
        </Fragment>
    )
}

export default PasswordChange;
