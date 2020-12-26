import React, { Fragment, useContext } from 'react';
import './signup.scss';
import { IconContext } from 'react-icons';
import { FaTimes } from 'react-icons/fa';
import LandingPageContext from '../../../Containers/LandingPage/landingpage-context';

export const TimesIcon = ()=>{
    return (
        <IconContext.Provider value={{className:'cross-icon'}}>
            <FaTimes/>
        </IconContext.Provider>
    )
}

const Signup = () => {

    const Context = useContext(LandingPageContext);

    return (
        <Fragment>
            <main className='signup-container'>
                <header className='signup-header'>
                    <span><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Sign up</div>
                </header>
                <form>
                <main className='signup-input-container'>
                    <label>Username</label>
                    <div className='signup-input-rel'>
                        <input type='text' autoFocus spellCheck='false' className='signup-input' onChange={Context.ChangeSignupUsername} value={Context.signup_username}/>
                    </div>    
                    <label>Password</label>
                    <div className='signup-input-rel'>
                        <input type='password' className='signup-input' onChange={Context.ChangeSignupPassword} value={Context.signup_password}/>
                    </div>
                    <label>Confirm Password</label>
                    <div className='signup-input-rel'>
                        <input type='password' className='signup-input' onChange={Context.ChangeSignupConfirm} value={Context.signup_confirm}/>
                    </div>
                    <label>Email</label>
                    <div className='signup-input-rel'>
                        <input type='email' spellCheck='false' className='signup-input' onChange={Context.ChangeSignupEmail} value={Context.signup_confirm}/>
                    </div>
                </main>
                <button className='signup-btn'>Continue</button>
                </form>                
            </main>
        </Fragment>
    )
}

export default Signup
