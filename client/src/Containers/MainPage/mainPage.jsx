import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';

import SideBar from '../../Components/SiderBar/sidebar';
import SidebarHeader from '../../Components/SiderBar/SideBar-Header/sidebar-header';
import SidebarNav from '../../Components/SiderBar/Sidebar-Nav/sidebar-nav';
import Nodata from '../../Components/UI/NoData/no-data';
import LoadSpinner from '../../Components/UI/LoadSpinner/load-spinner';
import PeopleListContainer from '../../Components/PeopleListContainer/people-list-container';
import PeopleListCard from '../../Components/PeopleListCard/people-list-card';
import RequestBar from '../../Components/RequestBar/request-bar';
import RequestListContainer from '../../Components/RequestListContainer/request-container';
import RequestHeader from '../../Components/RequestBar/RequestHeader/request-header';

const MainPage = ({ authenticate }) => {

    const [ people_list, SetPeopleList ] = useState( null );
    const [ spinner, SetSpinner ] = useState( false );
    const [ request_spinner, SetRequestSpinner ] = useState( false );
    const [ requests, SetRequests ] = useState( null );

    const TriggerMessageNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
    }

    const TriggerMatchNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
    }

    const FetchMatches = ()=>{
        axios.get(`/matches/${localStorage.getItem('Username')}`).then((response)=>{
            const error = {error_type: 'Username', message: 'Wrong Username'}
            const no_match = {no_matches: true}
            if(JSON.stringify(response.data) !== JSON.stringify(error)){
                if(JSON.stringify(response.data) === JSON.stringify(no_match)){
                    SetPeopleList('use-default-page');
                }else{
                    SetPeopleList(response.data.data);
                }
            }else{
                SetPeopleList('use-default-page');
            }
            SetSpinner(false);
        })
    }

    const FetchFriendrequest = ()=>{
        axios.get(`/friend-requests/${ localStorage.getItem('Username') }`).then((response)=>{
            const error = {no_requests: true}
            if(JSON.stringify(response.data) !== JSON.stringify(error)){
                SetRequests(response.data.data);
            }else{
                // default no requset section
                SetRequests('use-default-page')
            }
            SetRequestSpinner(false)
        })
    }

    useEffect(()=>{
        SetSpinner(true);
        SetRequestSpinner(true);
        // this fetches all the matches with sorted data;
        FetchMatches();
        // this fetches all the requests;
        FetchFriendrequest();
    }, []);


    let people_list_jsx = null;
    if(people_list){
        if( people_list === 'use-default-page' ){
            people_list_jsx = <Nodata/>
        }else{
            people_list_jsx = (
                <PeopleListContainer>

                    {
                        people_list.map((user)=>{
                            return (
                                <PeopleListCard 
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

    let request_list_jsx = null;
    if(requests){
        if( requests === 'use-default-page' ){
            // use Default page
            request_list_jsx = <Nodata/>
        }else{
            request_list_jsx = (
                <RequestListContainer>
                    
                </RequestListContainer>
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
                { ( spinner ) ? <LoadSpinner/> : people_list_jsx }
            </SideBar>
            <RequestBar>
                <RequestHeader/>
                { (request_spinner) ? <LoadSpinner/> : request_list_jsx }
            </RequestBar>
        </Fragment>
    )
}

export default MainPage
