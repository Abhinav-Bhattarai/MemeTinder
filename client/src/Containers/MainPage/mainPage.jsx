import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import SideBar from '../../Components/SiderBar/sidebar';
import SidebarHeader from '../../Components/SiderBar/SideBar-Header/sidebar-header';
import SidebarNav from '../../Components/SiderBar/Sidebar-Nav/sidebar-nav';
import Nodata from '../../Components/UI/NoData/no-data';
import LoadSpinner from '../../Components/UI/LoadSpinner/load-spinner';
import PeopleListContainer from '../../Components/PeopleListContainer/people-list-container';

const MainPage = ({ authenticate }) => {

    const [ people_list, SetPeopleList ] = useState( null );
    const [ spinner, SetSpinner ] = useState( false )

    const TriggerMessageNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
    }

    const TriggerMatchNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
    }

    useEffect(()=>{
        SetSpinner(true);
        axios.get(`/matches/${localStorage.getItem('Username')}`).then((response)=>{
            const error = {error_type: 'Username', message: 'Wrong Username'}
            const no_match = {no_matches: true}
            if(JSON.stringify(response.data) !== JSON.stringify(error)){
                if(JSON.stringify(response.data) === JSON.stringify(no_match)){
                    SetPeopleList('use-default-page');
                }else{
                    SetPeopleList(response.data.data);
                }
                SetSpinner(false);
            }
        })
    }, []);

    let people_list_jsx = null
    if(people_list){
        if( people_list === 'use-default-page' ){
            people_list_jsx = <Nodata/>
        }else{
            people_list_jsx = (
                <PeopleListContainer>
                    {
                        people_list.map((user)=>{
                            return (
                                <MatchContainer 
                                    profile_picture= { user.ProfilePicture } 
                                    username = { user.username } 
                                />
                            )
                        })
                    }
                </PeopleListContainer>
            )
        }
    }

    return (
        <Fragment>
            <SideBar>
                <SidebarHeader/>
                <SidebarNav 
                    TriggerMessageNav={ (e, ref)=>TriggerMessageNav(e, ref) } 
                    TriggerMatchNav= { (e, ref)=>TriggerMatchNav(e, ref) }
                />
                { ( spinner ) ? <LoadSpinner/> : { people_list_jsx } }
            </SideBar>
        </Fragment>
    )
}

export default MainPage
