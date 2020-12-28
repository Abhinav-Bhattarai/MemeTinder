import React, { Fragment, useContext } from 'react';
import { IconContext } from 'react-icons';
import { FaExclamationCircle } from 'react-icons/fa';
import LandingPageContext from '../../../Containers/LandingPage/landingpage-context';
import { TimesIcon } from '../Signup/signup';
import '../Signup/signup.scss';

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

const Login = ({LoginCardHandler, ErrorContainer, Logger, forget_password}) => {

    const Context = useContext(LandingPageContext);

    let username_error = null;
    let password_error = null;

    if(ErrorContainer.length >= 1){
        let i = 0;
        for(i of ErrorContainer){
            if(i.error_type === 'Username'){
                username_error = <Error error_msg={i.message}/>
            }
            else if(i.error_type === 'Password'){
                password_error = <Error error_msg={i.message}/>
            }
        }
    }

    return (
        <Fragment>
            <main className='signup-container login-container'>
                <header className='signup-header'>
                    <span onClick={LoginCardHandler}><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Login to Continue</div>
                </header>
                <form onSubmit={Logger}>
                    <main className='signup-input-container'>
                        <label>Email</label>
                        <div className='signup-input-rel'>
                            <input type='email' spellCheck='false' autoFocus className='signup-input' onChange={Context.ChangeSigninUsername} value={Context.signin_username}/>
                        </div> 
                        {username_error}   
                        <label>Password</label>
                        <div className='signup-input-rel'>
                            <input type='password' className='signup-input' onChange={Context.ChangeSigninPassword} value={Context.signin_password}/>
                        </div>
                        {password_error}
                    </main>
                    <button className='signup-btn'>Login</button>
                </form>
                <div
                 onClick={forget_password}
                 style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    padding: '10px 7%',
                    paddingTop: '5px',
                    color: 'red',
                    cursor: 'pointer'
                }}>Forgot password ?</div>

                 <div style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>OR</div>
            </main>
        </Fragment>
    )
}

export default Login;
