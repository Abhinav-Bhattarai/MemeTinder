import React, { Fragment, useContext } from 'react';
import LandingPageContext from '../../../Containers/LandingPage/landingpage-context';
import { TimesIcon } from '../Signup/signup';
import '../Signup/signup.scss';

const Login = () => {

    const Context = useContext(LandingPageContext);

    return (
        <Fragment>
            <main className='signup-container login-container'>
                <header className='signup-header'>
                    <span><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Login to Continue</div>
                </header>
                <form>
                <main className='signup-input-container'>
                    <label>Email</label>
                    <div className='signup-input-rel'>
                        <input type='email' spellCheck='false' autoFocus className='signup-input' onChange={Context.ChangeSigninUsername} value={Context.signin_username}/>
                    </div>    
                    <label>Password</label>
                    <div className='signup-input-rel'>
                        <input type='password' className='signup-input' onChange={Context.ChangeSigninPassword} value={Context.signin_password}/>
                    </div>
                </main>
                <button className='signup-btn'>Login</button>
                </form>
                 <div style={{
                    fontWeight: '500',
                    fontSize: '14px',
                    textAlign: 'center'
                }}>OR</div>
            </main>
        </Fragment>
    )
}

export default Login
