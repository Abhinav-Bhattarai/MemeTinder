import React, { Fragment } from 'react';
import { IconContext } from 'react-icons';
import { FaCodeBranch, FaPhone } from 'react-icons/fa';
import './phone-interaction.scss';

const AcceptCallIcon = ()=>{
    return (
        <IconContext.Provider value= {{style: {
            fontSize: '40px',
            color: '#fff',
            padding: '15px 15px',
            borderRadius: '50%',
            backgroundColor: '#27da8f'
        }}}>
            <FaPhone/>
        </IconContext.Provider>
    )
};

const RejectCallIcon = ()=>{
    return (
        <IconContext.Provider value= {{style: {
            fontSize: '40px',
            color: '#fff',
            padding: '15px 15px',
            borderRadius: '50%',
            backgroundColor: '#ff385c'
        }}}>
            <FaCodeBranch/>
        </IconContext.Provider>
    )
}

const PhoneInteraction = ({ Answer, Decline }) => {
    return (
        <Fragment>
            <main className='phone-interaction-container'>
                <span onClick = { Answer }><AcceptCallIcon/></span>
                <span onClick = { Decline }><RejectCallIcon/></span>
            </main>
        </Fragment>
    )
}

export default PhoneInteraction;
