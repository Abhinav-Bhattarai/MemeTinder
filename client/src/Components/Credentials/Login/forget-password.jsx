import React, { Fragment, useRef } from 'react';
import { TimesIcon } from '../Signup/signup';
import '../Signup/signup.scss';
import { Error } from '../Login/login';

const ForgetPassword = ({ value, set_value, submit, exit, error }) => {

    const ref = useRef(null);
    let input_error = null;
    if(error){
        input_error = <Error error_msg = { error }/>
        ref.current.style.border = '1px solid #ff385c';
    }

    return (
        <Fragment>
            <main className='signup-container login-container forget-container'>
                <header className='signup-header'>
                    <span onClick={ exit }><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}> Forgot Password ?</div>
                </header>
                <form onSubmit={ submit }>
                    <main className='signup-input-container'>
                        <label>SECRET NUMBER</label>
                        <div className='signup-input-rel'>
                            <input type='text' spellCheck='false' ref={ ref } autoFocus className='signup-input' value={ value } onChange={ set_value }/>
                            { input_error }
                        </div> 
                    </main>
                    <button className='signup-btn'>AUTHENTICATE</button>
                </form>
            </main>
        </Fragment>
    )
}

export default ForgetPassword;
