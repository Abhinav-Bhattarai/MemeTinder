import React, { Fragment, useContext } from 'react';
import './signup.scss';
import { IconContext } from 'react-icons';
import { FaTimes, FaExclamationCircle } from 'react-icons/fa';
import LandingPageContext from '../../../Containers/LandingPage/landingpage-context';

export const TimesIcon = ()=>{
    return (
        <IconContext.Provider value={{className:'cross-icon'}}>
            <FaTimes/>
        </IconContext.Provider>
    )
}

const ExclamationIcon = ()=>{
    return(
        <IconContext.Provider value={{style: {
            color: 'red',
            fontSize: '18px'
        }}}>
            <FaExclamationCircle/>
        </IconContext.Provider>
    )
}

const Error = ({ error_msg })=>{
    return (
        <div className='error-message'>
            <ExclamationIcon/>
            <div> { error_msg } </div>
        </div>
    )
} 

const Signup = ({SignupCardHandler, ErrorContainer, Register}) => {

    const Context = useContext(LandingPageContext);

    let username_error = null;
    let password_error = null;
    let confirm_error = null;
    let email_error = null;

    if(ErrorContainer.length >= 1){
        let i = 0;
        // 0(1)
        for(i of ErrorContainer){
            if(i.error_type === 'Username'){
                username_error = <Error error_msg={i.message}/>
            }
            else if(i.error_type === 'Password'){
                password_error = <Error error_msg={i.message}/>
            }
            else if(i.error_type === 'Confirm'){
                confirm_error = <Error error_msg={i.message}/>
            }else{
                email_error = <Error error_msg={i.message}/>
            }
        }
    }

    return (
        <Fragment>
            <main className='signup-container'>
                <header className='signup-header'>
                    <span onClick={SignupCardHandler}><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Sign up</div>
                </header>
                <form onSubmit={Register}>
                    <main className='signup-input-container'>
                        <label>Username</label>
                        <div className='signup-input-rel'>
                            <input type='text' autoFocus spellCheck='false' className='signup-input' onChange={Context.ChangeSignupUsername} value={Context.signup_username}/>
                        </div>    
                        {username_error}
                        <label>Password</label>
                        <div className='signup-input-rel'>
                            <input type='password' className='signup-input' onChange={Context.ChangeSignupPassword} value={Context.signup_password}/>
                        </div>
                        {password_error}
                        <label>Confirm Password</label>
                        <div className='signup-input-rel'>
                            <input type='password' className='signup-input' onChange={Context.ChangeSignupConfirm} value={Context.signup_confirm}/>
                        </div>
                        {confirm_error}
                        <label>Email</label>
                        <div className='signup-input-rel'>
                            <input type='email' spellCheck='false' className='signup-input' onChange={Context.ChangeSignupEmail} value={Context.signup_confirm}/>
                        </div>
                        {email_error}
                    </main>
                    <button className='signup-btn'>Continue</button>
                </form>                
            </main>
        </Fragment>
    )
}

export default Signup
