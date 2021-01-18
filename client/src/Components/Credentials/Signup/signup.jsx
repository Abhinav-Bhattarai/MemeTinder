import React, { Fragment, useContext, useRef } from 'react';
import './signup.scss';
import { IconContext } from 'react-icons';
import { FaTimes, FaExclamationCircle } from 'react-icons/fa';
import LandingPageContext from '../../../Containers/LandingPage/landingpage-context';
import Spinner from '../../UI/Spinner/spinner';

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

// showing jsx for any error in form validations;
const Error = ({ error_msg })=>{
    return (
        <div className='error-message'>
            <ExclamationIcon/>
            <div style={{marginLeft: '2%'}}> { error_msg } </div>
        </div>
    )
} 

const Signup = ({ SignupCardHandler, ErrorContainer, Register, ChangeRadio, loader }) => {

    const Context = useContext(LandingPageContext);
    const UsernameRef = useRef(null);
    const PasswordRef = useRef(null);
    const ConfirmRef = useRef(null);
    const EmailRef = useRef(null);

    let username_error = null;
    let password_error = null;
    let confirm_error = null;
    let email_error = null;

    if(ErrorContainer.length >= 1){
        let i = 0;
        // 0(1)
        for(i of ErrorContainer){
            if(i.error_type === 'Username'){
                if(UsernameRef){
                    UsernameRef.current.style.border = '1px solid red';
                }
                username_error = <Error error_msg={i.message}/>
            }
            else if(i.error_type === 'Password'){
                if(PasswordRef){
                    PasswordRef.current.style.border = '1px solid red';
                }
                password_error = <Error error_msg={i.message}/>
            }
            else if(i.error_type === 'Confirm'){
                if(ConfirmRef){
                    ConfirmRef.current.style.border = '1px solid red';
                }
                confirm_error = <Error error_msg={i.message}/>
            }else{
                if(EmailRef){
                    EmailRef.current.style.border = '1px solid red';
                }
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
                            <input type='text' autoFocus spellCheck='false' className='signup-input' onChange={Context.ChangeSignupUsername} value={Context.signup_username} ref={UsernameRef}/>
                        </div>    
                        {username_error}
                        <label>Password</label>
                        <div className='signup-input-rel'>
                            <input type='password' className='signup-input' onChange={Context.ChangeSignupPassword} value={Context.signup_password} ref={PasswordRef}/>
                        </div>
                        {password_error}
                        <label>Confirm Password</label>
                        <div className='signup-input-rel'>
                            <input type='password' className='signup-input' onChange={Context.ChangeSignupConfirm} value={Context.signup_confirm} ref={ConfirmRef}/>
                        </div>
                        {confirm_error}
                        <label>Email</label>
                        <div className='signup-input-rel'>
                            <input type='email' spellCheck='false' className='signup-input' onChange={Context.ChangeSignupEmail} value={Context.signup_email}
                            ref={EmailRef}/>
                        </div>
                        {email_error}

                        <div className='signup-radio-container'>

                            <div className='radio-container'>
                                <header>MALE</header>
                                <input 
                                    type= 'radio'
                                    value= 'male'
                                    name= 'gender'
                                    onChange={ ChangeRadio }
                                />
                            </div>

                            <div className='radio-container'>
                                <header>FEMALE</header>
                                <input 
                                    type= 'radio'
                                    value= 'female'
                                    name= 'gender'
                                    onChange={ ChangeRadio }
                                />
                            </div>
                        </div>
                    </main>
                    <div className='login-btn-container-rel'>
                        <button className='signup-btn'>Continue</button>
                        { (loader) ? <div className='spinner-abs'> <Spinner/> </div> : null}   
                    </div>
                </form>                
            </main>
        </Fragment>
    )
}

export default Signup
