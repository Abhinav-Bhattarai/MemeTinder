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
import RequestNav from '../../Components/RequestBar/RequestNav/request-nav';
import Interactions from '../../Components/Interactions/Interactions';
import NoPost from '../../Components/UI/Default-No-Post/no-post';
import PostContainer from '../../Components/PostContainer/post-container';

const MainPage = ({ authenticate }) => {

    const [ people_list, SetPeopleList ] = useState( null );
    const [ spinner, SetSpinner ] = useState( false );
    const [ request_spinner, SetRequestSpinner ] = useState( false );
    const [ requests, SetRequests ] = useState( null );
    const [ my_profile_pic, SetMyProfilePic ] = useState( null )
    const [ post_list, SetPostList ] = useState( null );
    const [ current_index, SetCurrentIndex ] = useState( 0 );

    const TriggerMessageNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
    }

    const TriggerMatchNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
    }

    const TriggerNotificationNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
    }
 
    const TriggerRequestNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
    }

    const SendMatchRequest = (friend_profile, friend_name)=>{
        const context = {
            YourName: localStorage.getItem('Username'),
            YourProfile: my_profile_pic,
            FriendName: friend_name,
            FriendProfile: friend_profile
        };
        axios.put('/friend-requests', context).then(()=>{});
    };

    const LeftClickHandler = ()=>{
        SetCurrentIndex(current_index + 1);
    };

    const CenterClickHandler = ()=>{
        const dummy = [...post_list];
        const FriendName = dummy[current_index].Username;
        const FriendProfile = dummy[current_index].ProfilePicture;
        SetCurrentIndex(current_index + 1);
        SendMatchRequest(FriendProfile, FriendName);
        // realtime request
    };

    const RightClickHandler = ()=>{
        const dummy = [...post_list];
        const FriendName = dummy[current_index].Username;
        const FriendProfile = dummy[current_index].ProfilePicture;
        SetCurrentIndex(current_index + 1);
        SendMatchRequest(FriendProfile, FriendName);
        // realtime request;
    };

    const RemoveRequestData = (username)=>{
        const friend_req_list = [...requests];
        const index = friend_req_list.findIndex((element)=>{
            return element.Username === username;
        });
        friend_req_list.splice(index, 1);
        SetRequests(friend_req_list);
    }

    const AddMatchData = (pp, username)=>{
        const match_data = [...people_list];
        match_data.unshift({username: username, Profile_Picture: pp});
        SetPeopleList(match_data);
    }

    const RemoveRequestSectionBackend = (username)=>{
        const context = {
            YourName: localStorage.getItem('Username'),
            FriendName: username
        }

        axios.post('/friend-requests', context).then((response)=>{})
    }

    const AddToMatchesBackend = (match_username, match_image)=>{
        const context = {
            FriendName: match_username,
            YourName: localStorage.getItem('Username'),
            FriendProfilePic: match_image,
            YourProfilePic: my_profile_pic
        }

        axios.post('/matches', context).then((response)=>{})
    }

    const AcceptMatchRequest = (profile_image, username)=>{
        // the username here is the person who requested
        RemoveRequestSectionBackend(username);
        RemoveRequestData(username);
        AddMatchData(profile_image, username);
        AddToMatchesBackend(username, profile_image);
    }

    const RejectMatchRequest = (username)=>{
        // the username here is the person who requested
        RemoveRequestSectionBackend(username);
        RemoveRequestData(username);
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

    const GetProfilePic = ()=>{
        axios.get(`/profile/${localStorage.getItem('Username')}`).then((response)=>{
            if(response.data.length >= 1){
                SetMyProfilePic(response.data);
            }else{
                SetMyProfilePic(false);
            }
        })
    }
    
    const FetchPosts = ()=>{
        axios.get('/post/0').then((response)=>{
            const no_post = { no_posts: true }
            if(JSON.stringify(no_post) !== JSON.stringify(response.data)){
                SetPostList(response.data);
            }else{
                // default no-post page;
            }
        })
    }

    useEffect(()=>{
        SetSpinner(true);
        SetRequestSpinner(true);
        // this fetches all the matches with sorted data;
        FetchMatches();
        // this fetches all the requests;
        FetchFriendrequest();
        // this fetches my profile picture;
        GetProfilePic();
        // this fetches posts;
        FetchPosts();
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
                                    profile_picture= { user.Profile_Picture } 
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

    let post_area_jsx = null;
    if(post_list){
        if(post_list.length >= 1){
            // main cards along with Interaction;
            post_area_jsx = (
                <PostContainer>
                    <Interactions
                        LeftClick={ LeftClickHandler }
                        RightClick={ RightClickHandler }
                        CenterClick={ CenterClickHandler }
                    />
                </PostContainer>
            )
        }else{
            post_area_jsx = <NoPost/>;
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

            { post_area_jsx }

            <RequestBar>
                <RequestHeader/>
                <RequestNav
                    TriggerNotificationNav={ (e, ref)=> TriggerNotificationNav(e, ref) }
                    TriggerRequestNav= { (e, ref)=>TriggerRequestNav(e, ref) }
                />
                { (request_spinner) ? <LoadSpinner/> : request_list_jsx }
            </RequestBar>

        </Fragment>
    )
}

export default MainPage;
