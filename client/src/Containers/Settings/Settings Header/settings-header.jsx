import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaCog, FaPlus } from 'react-icons/fa';
import './settings-header.scss';
import { BackIcon } from '../../../Components/Messages/MessageHeader/message-header';
import { withRouter } from 'react-router';

const SettingsIcon = ()=>{
    return (
        <IconContext.Provider value={{
            style: {
                fontSize: '47px',
                color: '#fff',
                marginLeft: '3%'
            }
        }}>
            <FaCog/>
        </IconContext.Provider>
    )
}

export const AddIcon = ()=>{
    return (
        <IconContext.Provider value={{
            style: {
                fontSize: '30px',
                color: '#fff',
                position: 'absolute',
                bottom: '0px',
                left: '45%',
                padding: '10px 10px',
                borderRadius: '50%',
                backgroundColor:'#ff385c',
                cursor: 'pointer'
            }
        }}>
            <FaPlus/>
        </IconContext.Provider>
    )
}

const SettingsHeader = ({ history }) => {

    const BackClick = ()=>{
        history.push('/main-app')
    }

    return (
        <Fragment>
            <main className='settings-header'>
                <span onClick = { BackClick }><BackIcon/></span>
                <SettingsIcon/>
                <div>Settings</div>
            </main>
        </Fragment>
    )
}

export default withRouter (SettingsHeader);
