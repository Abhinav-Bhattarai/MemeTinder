import React, { Fragment } from 'react';
import '../Signup/signup.scss';
import { TimesIcon } from '../Signup/signup';

const Logout = ({ TriggerLogoutPopup, ConfirmLogout }) => {
    return (
        <Fragment>
            <main className='signup-container logout-container'>
                <header className='signup-header'>
                    <span onClick={ TriggerLogoutPopup }><TimesIcon/></span>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Are you sure you want to Logout ?</div>
                </header>  
                <footer className='logout-btn-container'>
                    <button className='logout-btn' onClick={ ConfirmLogout }>YES</button> 
                    <button className='logout-btn logout-btn-neg' onClick={TriggerLogoutPopup}>NO</button>  
                </footer>               
            </main>
        </Fragment>
    )
}

export default Logout;
