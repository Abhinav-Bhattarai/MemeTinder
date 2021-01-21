import React, { Fragment, useRef, useState } from 'react';
import axios from 'axios';

import './image-config.scss';
import { Route, Switch, withRouter } from 'react-router';
import ProfilePicture from './ProfilePicture/profile-picture';
import MainPost from './MainPost/main-post';

const ImageConfig = ({ history, RemoveProfileCard, SetNewProfile }) => {

    // state is manage from here;
    const [ profile_pic, SetProfilePic ] = useState( null );
    const [ main_post, SetMainPost ] = useState( null );
    const profile_input_ref = useRef( null );
    const main_input_ref = useRef( null );

    const ProfilePictureChange = (event)=>{
        if(event.target.files){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = ()=>{
                SetProfilePic( reader.result );
            }
            reader.readAsDataURL(file);
        }
    }

    const MainPostChange = (event)=>{
        if(event.target.files){
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onloadend = ()=>{
                SetMainPost( reader.result );
            }
            reader.readAsDataURL(file);
        }
    }

    const TriggerProfileRef = ()=>{
        profile_input_ref.current.click();
    }

    const TriggerMainPostRef = ()=>{
        main_input_ref.current.click();
    }

    const FinalizeProfile = (event)=>{
        event.preventDefault();
        if(profile_pic){
            SetNewProfile(profile_pic);
            history.push('/forms/mainpost')
        }else{
            // error
        }
    }

    const SubmitProfiles = (event)=>{
        event.preventDefault();
        // axios submit;
        if(main_post && profile_pic){
            const context = {
                ProfilePicture: profile_pic,
                MainPost: main_post
            }
            axios.post(`http://locahost:8000/profile-confirm/${localStorage.getItem('Username')}`, context).then(()=>{})
            RemoveProfileCard();
        }
    }

    return (
        <Fragment>
            <main className='image-config-container'>
                <header className='image-config-header'>
                    <div style={{
                        fontWeight: '700',
                        fontSize: '18px'
                    }}>Image Configuration</div>
                </header>
                <input ref={ profile_input_ref } type='file' hidden onChange={ ProfilePictureChange }/>
                <input ref={ main_input_ref } type='file' hidden onChange={ MainPostChange }/>

                <main className='image-change-container'>
                    <Switch>
                        <Route path='/forms/mainpost' exact render={ ()=>{
                            return (
                                <MainPost 
                                    TriggerMainPost={ TriggerMainPostRef }
                                    main_post={ main_post }
                                    SubmitPost={ (e)=>SubmitProfiles(e) }
                                />
                            )
                        } }/>
                        <Route render={ ()=>{
                            return (
                                <ProfilePicture 
                                    TriggerProfile={ TriggerProfileRef }    
                                    ProfilePicture={ profile_pic }
                                    Submit={ (e)=>FinalizeProfile(e) }
                                />
                            )
                        } }/>
                    </Switch>
                </main>
            </main>
        </Fragment>
    )
}

export default withRouter( ImageConfig );
