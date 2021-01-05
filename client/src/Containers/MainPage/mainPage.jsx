import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import socket_client from 'socket.io-client';

import '../../Components/PostContainer/post-container.scss';

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
import TestImage from '../../assets/bg.jpg';
import ImageContainer from '../../Components/ImageContainer/image-container';
import Dropdown from '../../Components/UI/Dropdown/dropdown';
import RequestCard from '../../Components/RequestCard/request-card';
import ImageConfig from '../../Components/Credentials/ImageConfig/image-config';

const MainPage = ({ authenticate }) => {

    const [ people_list, SetPeopleList ] = useState( null );
    const [ requests, SetRequests ] = useState( null );
    const [ my_profile_pic, SetMyProfilePic ] = useState( null )
    const [ post_list, SetPostList ] = useState( null );
    const [ current_index, SetCurrentIndex ] = useState( 0 );
    const [ current_sidebar_value, SetSideBarValue ] = useState( 0 );
    const [ current_request_bar_value, SetRequestBarValue ] = useState( 0 );
    const [ dropdown_info, SetDropdownInfo ] = useState( false );
    const [ socket, SetSocket ] = useState( null );
    const [ profile_alert, SetProfileAlert ] = useState( false );
    const [ api_limiter, SetApiLimiter ] = useState( false );

    const TriggerDropdown = ()=>{
        SetDropdownInfo(!dropdown_info);
    }

    const TriggerMessageNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
        SetSideBarValue(1);
    }

    const TriggerMatchNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
        SetSideBarValue(0);
    }

    const TriggerNotificationNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
        SetRequestBarValue(1);
    }
 
    const TriggerRequestNav = (event, ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
        SetRequestBarValue(0);
    }

    const TriggerProfileAlert = ()=>{
        SetProfileAlert(!profile_alert)
    }

    const SendMatchRequest = (friend_name)=>{
        const context = {
            YourName: localStorage.getItem('Username'),
            YourProfile: my_profile_pic,
            FriendName: friend_name,
        };
        axios.put('/friend-requests', context).then(()=>{});
    };

    const LeftClickHandler = ()=>{
        SetCurrentIndex(current_index + 1);
    };

    const FetchNewPost = ()=>{
        axios.get(`/post/0/${localStorage.getItem('Username')}`).then((response)=>{
            const no_post = { no_posts: true }
            if(JSON.stringify(no_post) !== JSON.stringify(response.data)){
                if(response.data.length >= 1){
                    const dummy = [...post_list];
                    let i = 0;
                    for(i of response.data){
                        dummy.push(i);
                    };
                    SetPostList(dummy);
                }else{
                    SetApiLimiter( true );
                }
            }
        })
    }

    const CenterClickHandler = ()=>{
        const dummy = [...post_list];
        if(current_index <= dummy.length - 1){
            const FriendName = dummy[current_index].Username;
            const MyName = localStorage.getItem('Username');
            SendMatchRequest(FriendName);
            if(current_index !== dummy.length - 1) SetCurrentIndex(current_index + 1); 
            if( api_limiter === false ){
                if(Math.floor(dummy.length / 2) - 1 === current_index){
                    FetchNewPost();
                }
            }
            // realtime request
            socket.emit('Send-Friend-Request', FriendName, MyName, my_profile_pic);
        }
    };

    const RightClickHandler = ()=>{
        const dummy = [...post_list];
        if(current_index <= dummy.length - 1){
            const FriendName = dummy[current_index].Username;
            const MyName = localStorage.getItem('Username');
            SendMatchRequest(FriendName);
            if(current_index !== dummy.length - 1) SetCurrentIndex(current_index + 1); 
            if( api_limiter === false ){
                if(Math.floor(dummy.length / 2) - 1 === current_index){
                    FetchNewPost();
                }
            }
            // realtime request
            socket.emit('Send-Friend-Request', FriendName, MyName, my_profile_pic);
        }
    };

    const LogoutHandler = ()=>{
        authenticate(true);
    }

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

        axios.post('/friend-requests', context).then(()=>{})
    }

    const AddToMatchesBackend = (match_username, match_image)=>{
        const context = {
            FriendName: match_username,
            YourName: localStorage.getItem('Username'),
            FriendProfilePic: match_image,
            YourProfilePic: my_profile_pic
        }

        axios.post('/matches', context).then(()=>{})
    }

    const SendSocketMatch = (username)=>{
        socket.emit('accept-request', username)
    }

    const AcceptMatchRequest = (e, profile_image, username)=>{
        // the username here is the person who requested
        RemoveRequestSectionBackend(username);
        RemoveRequestData(username);
        AddMatchData(profile_image, username);
        AddToMatchesBackend(username, profile_image);
        SendSocketMatch(username);
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
        })
    }

    const FetchFriendrequest = ()=>{
        axios.get(`/friend-requests/${ localStorage.getItem('Username') }`).then((response)=>{
            const error = {no_requests: true}
            if(JSON.stringify(response.data) !== JSON.stringify(error)){
                SetRequests(response.data.data);
            }
        })
    }

    const GetProfilePic = ()=>{
        axios.get(`/profile/${localStorage.getItem('Username')}`).then((response)=>{
            if(response.data.length >= 1){
                SetMyProfilePic(response.data);
            }else{
                SetMyProfilePic( TestImage );
                SetProfileAlert( true );
            }
        })
    };
    
    const FetchPosts = ()=>{
        axios.get(`/post/0/${localStorage.getItem('Username')}`).then((response)=>{
            const no_post = { no_posts: true }
            if(JSON.stringify(no_post) !== JSON.stringify(response.data)){
                SetPostList(response.data);
            }else{
                // default no-post page;
                SetPostList([]);
            }
        })
    }

    const JoinSocketRoom = ()=>{
        const io = socket_client.connect(process.env.PROXY);
        io.emit('join-room', localStorage.getItem('Username'));
        SetSocket(io);
    }

    useEffect(()=>{

        // this fetches posts;
        FetchPosts();

        // this fetches all the matches with sorted data;
        FetchMatches();

        // this fetches all the requests;
        FetchFriendrequest();

        // this fetches my profile picture;
        GetProfilePic();
        
        // join my_sockek_room
        JoinSocketRoom();
    }, []);

    useEffect(()=>{
        if(socket){
            // socket operations;
            socket.on('client-request-finder', ( sender, ProfilePicture )=>{
                // adding it to the request_list with unshift;
                const dummy = [...requests];
                const data = { sender, ProfilePicture }
                dummy.unshift(data);
                SetRequests(dummy);
            })

            socket.on('match', (alert)=>{
                // axios call to reconsider the match requests;
                axios.get(`/matches/${localStorage.getItem('Username')}`).then((response)=>{
                    const error = {error_type: 'Username', message: 'Wrong Username'}
                    const no_match = {no_matches: true}
                    if(JSON.stringify(response.data) !== JSON.stringify(error)){
                        if(JSON.stringify(response.data) !== JSON.stringify(no_match)){
                            SetPeopleList(response.data.data);
                        }
                    }
                })
            })

            socket.on('receive-message', (sender, message)=>{})

            return ()=>{
                socket.removeAllListeners();
            }
        }
    })

    let people_list_jsx = null;
    if(people_list){
        if( people_list === 'use-default-page' ){
            people_list_jsx = <Nodata/>
        }else{
            if(current_sidebar_value === 0){
                people_list_jsx = (
                    <PeopleListContainer>
    
                        {
                            people_list.map((user, i)=>{
                                return (
                                    <PeopleListCard 
                                        key={i}
                                        profile_picture= { user.Profile_Picture } 
                                        username = { user.username } 
                                    />
                                )
                            })
                        }
    
                    </PeopleListContainer>
                );
            }else{
                people_list_jsx = (
                    <PeopleListContainer>
    
                        {
                            people_list.map((user, i)=>{
                                return (
                                    <PeopleListCard 
                                        key={i}
                                        profile_picture= { user.Profile_Picture } 
                                        username = { user.username } 
                                    />
                                )
                            })
                        }
    
                    </PeopleListContainer>
                );
            }
        }
    }

    let request_list_jsx = null;
    if(requests){
        if( requests.length === 0 ){
            // use Default page
            request_list_jsx = <Nodata/>;
        }else{
            const request_list = [...requests]
            if(current_request_bar_value === 0){
                request_list_jsx = (
                    <RequestListContainer>
                        { 
                            request_list.map((request, i)=>{
                                return (
                                    <RequestCard
                                        key={i}
                                        sender={ request.sender }
                                        profile_picture= { request.ProfilePicture }
                                        AcceptRequest={ (e, profile_image, username)=> AcceptMatchRequest(e, profile_image, username) }
                                        DeclineRequest={ (e, username)=> RejectMatchRequest(e, username) }
                                    />
                                )
                            })
                        }
                    </RequestListContainer>
                );
            }else{
                request_list_jsx = (
                    <RequestListContainer>
                        
                    </RequestListContainer>
                );
            }
        }
    }

    let post_area_jsx = null;
    if(post_list){
        if(post_list.length >= 1){
            // main cards along with Interaction;
            const post_data = [...post_list];
            const required_data = post_data[current_index];
            post_area_jsx = (
                <PostContainer blur={ ( profile_alert ) ? '5px' : '0px' }>
                    <ImageContainer
                        ProfilePicture={ required_data.ProfilePicture }
                        MainPost={ required_data.MainPost }
                        Username={ required_data.Username }
                    />
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

            <SideBar blur={ ( dropdown_info || profile_alert ) ? '5px' : '0px' }>
                <SidebarHeader
                    profile_picture= { my_profile_pic }
                    TriggerDropdown={ TriggerDropdown }
                />
                <SidebarNav 
                    TriggerMessageNav={ (e, ref)=>TriggerMessageNav(e, ref) } 
                    TriggerMatchNav= { (e, ref)=>TriggerMatchNav(e, ref) }
                />
                { ( !people_list_jsx ) ? <LoadSpinner/> : people_list_jsx }
            </SideBar>

            {
                (dropdown_info) ? 
                    <Dropdown 
                        profile={ my_profile_pic }
                        TriggerDropdown={ TriggerDropdown }
                        TriggerLogout={ LogoutHandler }
                    /> :
                    null
            }

            { ( post_area_jsx ) ? post_area_jsx : 
                <main className='main-post-container'>
                    <LoadSpinner/>
                </main>
            }

            <RequestBar blur={ ( profile_alert ) ? '5px' : '0px' }>
                <RequestHeader/>
                <RequestNav
                    TriggerNotificationNav={ (e, ref)=> TriggerNotificationNav(e, ref) }
                    TriggerRequestNav= { (e, ref)=>TriggerRequestNav(e, ref) }
                />
                { ( !request_list_jsx ) ? <LoadSpinner/> : request_list_jsx }
            </RequestBar>

            { ( profile_alert ) ? <ImageConfig RemoveProfileCard={ TriggerProfileAlert }/> : null }

        </Fragment>
    )
}

export default MainPage;
