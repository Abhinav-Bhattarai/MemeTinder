import React, { Fragment } from 'react';
import { TimesIcon } from '../Signup/signup';
import '../Signup/signup.scss';

const ForgetPassword = ({ value, set_value, submit, exit, error }) => {
    return (
        <Fragment>
            <main className='signup-container login-container forget-container'>
                <header className='signup-header'>
                    <span onClick={ exit }><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Forgot Password ?</div>
                </header>
                <form onSubmit={ submit }>
                    <main className='signup-input-container'>
                        <label>SECRET NUMBER</label>
                        <div className='signup-input-rel'>
                            <input type='text' spellCheck='false' autoFocus className='signup-input' value={ value } onChange={ set_value }/>
                        </div> 
                    </main>
                    <button className='signup-btn'>AUTHENTICATE</button>
                </form>
            </main>
        </Fragment>
    )
}

export default ForgetPassword;
