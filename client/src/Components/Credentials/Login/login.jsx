import React, { Fragment, useContext, useRef } from 'react';
import { IconContext } from 'react-icons';
import { FaExclamationCircle } from 'react-icons/fa';
import LandingPageContext from '../../../Containers/LandingPage/landingpage-context';
import Spinner from '../../UI/Spinner/spinner';
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

export const Error = ({ error_msg })=>{
    return (
        <div className='error-message'>
            <ExclamationIcon/>
            <div style={{marginLeft: '2%'}}> { error_msg } </div>
        </div>
    )
} 

const Login = ({LoginCardHandler, ErrorContainer, Logger, forget_password, loader }) => {

    const Context = useContext(LandingPageContext);
    const UsernameRef = useRef(null);
    const PasswordRef = useRef(null);

    let username_error = null;
    let password_error = null;
    let invalid_cred = null;
    // checking for error to add through jsx;
    if(ErrorContainer.length >= 1){
        let i = 0;
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
            }else{
                if(UsernameRef && PasswordRef){
                    UsernameRef.current.style.border = '1px solid red';
                    PasswordRef.current.style.border = '1px solid red';
                    invalid_cred = <div className='invalid-cred-error'>Invalid Credentials</div>
                }
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
                { invalid_cred }
                <form onSubmit={ Logger }>
                    <main className='signup-input-container'>
                        <label>Username</label>
                        <div className='signup-input-rel'>
                            <input type='username' spellCheck='false' autoFocus className='signup-input' onChange={ Context.ChangeSigninUsername } value={ Context.signin_username } ref={UsernameRef}/>
                        </div> 
                        {username_error}   
                        <label>Password</label>
                        <div className='signup-input-rel'>
                            <input type='password' className='signup-input' onChange={ Context.ChangeSigninPassword } value={ Context.signin_password } ref={PasswordRef}/>
                        </div>
                        {password_error}
                    </main>
                    <div className='login-btn-container-rel'>
                        <button className='signup-btn login-btn-form'>
                            Login
                        </button>
                        { (loader) ? <div className='spinner-abs'> <Spinner/> </div> : null}          
                    </div>
                </form>
                <div
                    onClick = { forget_password.bind(this, false) }
                    style = {{
                        display: 'block',
                        padding: '15px 3%',
                        textAlign: 'center',
                        fontWeight: '500',
                        color: '#000',
                        backgroundColor: ' rgb(187, 186, 186)',
                        margin: '5px auto 30px auto',
                        width: '82%',
                        borderRadius: '10px',
                        cursor: 'pointer'
                }}>
                    Forgot password ?
                </div>
            </main>
        </Fragment>
    )
}

export default Login;
