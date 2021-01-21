import React, { Fragment } from 'react';
import './message-header.scss';
import { IconContext } from 'react-icons';
import { FaAngleLeft } from 'react-icons/fa';
import { withRouter } from 'react-router';

export const BackIcon = ()=>{
    return (
        <IconContext.Provider value={{
            style: {
                fontSize: '30px',
                color: '#fff',
            }
        }}>
            <FaAngleLeft/>
        </IconContext.Provider>
    )
}

const MessageHeader = ({ Username, ProfilePicture, history }) => {
    return (
        <Fragment>
            <header className='message-header'>
                <span 
                    onClick={
                        () => history.push('/main')
                    }
                    style = {{ marginRight: '2%', marginTop: '5px' }}

                > <BackIcon/> </span>
                <img src= { ProfilePicture } alt= ' profile '/>
                <div> { Username } </div>
            </header>
        </Fragment>
    )
}

export default withRouter(MessageHeader);
