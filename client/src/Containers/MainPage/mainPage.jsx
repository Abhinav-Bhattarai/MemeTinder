import React, { Fragment, Suspense, useEffect, useState } from 'react';
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
import { Route, Switch, withRouter } from 'react-router';
import HomeContainer from '../../Components/HomeContainer/home-container';
import Logout from '../../Components/Credentials/Logout/logout';

const AsyncMessageRoute = React.lazy(()=>{
    return import('../../Components/Messages/messages')
})

const MainPage = ({ authenticate, history }) => {

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
    const [ temp_post_list, SetTempPostList ] = useState( null );
    const [ logout_popup, SetLogoutPopup ] = useState( false );
    const [ messageInput, SetMessageInput ] = useState( '' );
    const [ recent_messages, SetRecentMessages ] = useState( null );
    const [ message_info, SetMessageInfo ] = useState( null );
    const [ current_post_api_call, SetCurrentPostApiCall ] = useState( 0 );

    const TriggerDropdown = ()=>{
        SetDropdownInfo(!dropdown_info);
    }

    const TriggerMessageNav = (ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
        SetSideBarValue(1);
    }

    const TriggerMatchNav = (ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
        SetSideBarValue(0);
    }

    const TriggerNotificationNav = (ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(160%)";
        SetRequestBarValue(1);
    }
 
    const TriggerRequestNav = (ref)=>{
        ref.style.transition = '0.3s';
        ref.style.transform = "translateX(25%)";
        SetRequestBarValue(0);
    }

    const TriggerProfileAlert = ()=>{
        SetProfileAlert(!profile_alert)
    }

    const PeopleCardMessageClick = (username)=>{
        // socket emit to that person room
        const dummy = [...people_list]
        const user_index = dummy.findIndex((element)=>{
            return element.username === username;
        })
        if(user_index !== -1){
            const MessageData = dummy[user_index].Messages;
            const MessageInfo = { Username: username, Profile: dummy[user_index].Profile_Picture };
            SetMessageInfo(MessageInfo);
            SetRecentMessages(MessageData);
            history.push(`/message/${username}`);
        }
    }

    const AddMessage = (Match_name, Message, self)=>{
        const date = new Date(parseInt(Date.now())).toLocaleTimeString();
        const dummy = [...people_list];
        const match_index = dummy.findIndex((element)=>{
            return element.username === Match_name
        })
        dummy[match_index].Messages.push({data: Message, self, Date: date});
        SetPeopleList(dummy)
    }

    const AddMessagetoBackend = (receiver)=>{
        const context = {
            Message: messageInput,
            Sender: localStorage.getItem('Username'),
            Receiver: receiver
        }

        axios.put('/message', context).then((response)=>{
        });
    }

    const SendMessageHandler = (Match_name)=>{
        // axios request;
        AddMessage( Match_name, messageInput, true );
        socket.emit('receive-message-server', localStorage.getItem('Username'), Match_name, messageInput);
        AddMessagetoBackend(Match_name);
        SetMessageInput('');
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

    // Message Route
    const ChangeMessageInput = (event)=>{
        const value = event.target.value;
        SetMessageInput( value );
    }

    const FetchNewPost = ()=>{

        axios.get(`/post/${current_post_api_call + 1}/${localStorage.getItem('Username')}`).then((response)=>{
            const no_post = { no_posts: true }
            if(JSON.stringify(no_post) !== JSON.stringify(response.data)){
                if(response.data.length >= 1){
                    const dummy = [...post_list];
                    let i = 0;
                    for(i of response.data){
                        dummy.push(i);
                    };
                    SetTempPostList(dummy);
                    if(response.data.length === 20){
                        SetCurrentPostApiCall( current_post_api_call + 1 );
                    }
                }else{
                    SetApiLimiter( true );
                    SetPostList( [] );
                }
            }
        })

    };

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

    const TriggerLogoutPopup = ()=>{
        SetLogoutPopup( !logout_popup );
        SetDropdownInfo( false );
    };

    const ConfirmLogoutHandler = ()=>{
        authenticate(true);
    };

    const RemoveRequestData = (username)=>{
        const friend_req_list = [...requests];
        const index = friend_req_list.findIndex((element)=>{
            return element.Username === username;
        });
        friend_req_list.splice(index, 1);
        SetRequests(friend_req_list);
    };

    const AddMatchData = (pp, username)=>{
        const match_data = [...people_list];
        const current_date = Date.now();
        match_data.unshift({username: username, Profile_Picture: pp, Messages: [], LastInteraction: current_date, fresh: true});
        SetPeopleList(match_data);
    };

    const RemoveRequestSectionBackend = ()=>{
        const context = {
            MyName: localStorage.getItem('Username')
        }
        axios.post('/friend-requests', context).then((response)=>{
        })
    };

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
        socket.emit('accept', localStorage.getItem('Username'), my_profile_pic, username);
    }

    const AcceptMatchRequest = (e, profile_image, username)=>{
        // the username here is the person who requested
        RemoveRequestSectionBackend(username);
        RemoveRequestData();
        AddMatchData(profile_image, username);
        AddToMatchesBackend(username, profile_image);
        SendSocketMatch(username)
    }

    const RejectMatchRequest = (username)=>{
        // the username here is the person who requested
        RemoveRequestSectionBackend(username);
        RemoveRequestData();
    }

    const FetchMatches = ()=>{
        axios.get(`/matches/${localStorage.getItem('Username')}`).then((response)=>{
            const error = {error_type: 'Username', message: 'Wrong Username'};
            const no_res = {no_matches: true};
            if(JSON.stringify(response.data) !== JSON.stringify(error)){
                if(JSON.stringify(response.data) !== JSON.stringify(no_res)){
                    SetPeopleList(response.data.data);
                }else{
                    SetPeopleList([]);
                }
            }else{
                SetPeopleList([]);
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
                if(response.data.length >= 1){
                    SetTempPostList(response.data);
                }else{
                    SetPostList([]);
                }
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
        if(temp_post_list && people_list){
            // O(n.log(n));
            const post_list = [...temp_post_list]; // Username
            const dummy_list = [...post_list]; // username
            const matches = [...people_list];
            let deletion_num = 0
            if(post_list.length >= 1 && matches.length >= 1){
                let match = 0;
                for(match of matches){
                    let PostListLowerIndex = 0;
                    let PostListGreatestIndex = post_list.length - 1;

                    while ( PostListLowerIndex <= PostListGreatestIndex ){ 
  
                        // Find the mid index 
                        const PostListMidIndex = Math.floor((PostListLowerIndex + PostListGreatestIndex) / 2);
                        const MidIndexUsername = post_list[PostListMidIndex].Username; 
                        // If element is present at mid, return True 
                        if (MidIndexUsername === match.username){
                            dummy_list.splice(PostListMidIndex - deletion_num, 1);
                            deletion_num ++
                            break;
                        }
                  
                        // Else look in left or right half accordingly 
                        else if (Math.sign(MidIndexUsername.localeCompare(match.username)) === -1){  
                            PostListLowerIndex = PostListMidIndex + 1; 
                        }

                        else{
                            PostListGreatestIndex = PostListMidIndex - 1; 
                        }
                    } 
                }
                SetPostList(dummy_list);
                SetTempPostList(null);
            }else{
                SetPostList(temp_post_list);
                SetTempPostList(null);
            }
        }
    }, [ temp_post_list, people_list ])

    useEffect(()=>{
        if(socket){
            // socket operations;
            socket.on('client-request-finder', ( sender, ProfilePicture )=>{
                // adding it to the request_list with unshift;
                const dummy = [...requests];
                const data_redundancy = dummy.findIndex((element)=>{
                    return element.sender === sender;
                })
                if(data_redundancy === -1){
                    const data = { sender, ProfilePicture }
                    dummy.unshift(data);
                    SetRequests(dummy);
                }
            })

            socket.on('match', (username, Profile_Picture)=>{
                // axios call to reconsider the match requests;
                AddMatchData(Profile_Picture, username);
            })

            socket.on('receive-message-client', (sender, message)=>{
                // Message Socket Receiver;
                AddMessage(sender, message, false);
            })

            return ()=>{
                socket.removeAllListeners();
            }
        }
    })

    let people_list_jsx = null;
    if(people_list){
        if( people_list.length === 0 ){
            people_list_jsx = <Nodata/>
        }else{
            if(current_sidebar_value === 0){
                people_list_jsx = (
                    <PeopleListContainer>
    
                        {
                            people_list.map((user, i)=>{
                                const UpdateDate = new Date(parseInt(user.LastInteraction)).toLocaleDateString();
                                return (
                                    <PeopleListCard 
                                        key={i}
                                        profile_picture = { user.Profile_Picture } 
                                        username = { user.username } 
                                        lastupdate = { UpdateDate }
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
                                const UpdateDate = new Date(parseInt(user.LastInteraction)).toLocaleDateString();
                                return (
                                    <PeopleListCard 
                                        key={i}
                                        profile_picture= { user.Profile_Picture } 
                                        username = { user.username } 
                                        lastupdate = { UpdateDate }
                                        click = { ( username )=>PeopleCardMessageClick( username ) }
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
            const request_list = [...requests];
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
                <PostContainer blur={ ( profile_alert || logout_popup ) ? '5px' : '0px' }>
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
            post_area_jsx = (
                <NoPost 
                    blur={ ( profile_alert || logout_popup ) ? '5px' : '0px' }
                />
            );
        }
    }

    return (
        <Fragment>

            <SideBar blur={ ( dropdown_info || profile_alert || logout_popup ) ? '5px' : '0px' }>
                <SidebarHeader
                    profile_picture= { my_profile_pic }
                    TriggerDropdown={ TriggerDropdown }
                />
                <SidebarNav 
                    TriggerMessageNav={ (ref)=>TriggerMessageNav(ref) } 
                    TriggerMatchNav= { (ref)=>TriggerMatchNav(ref) }
                />
                { ( !people_list_jsx ) ? <LoadSpinner/> : people_list_jsx }
            </SideBar>

            {
                (dropdown_info) ? 
                    <Dropdown 
                        profile = { my_profile_pic }
                        TriggerDropdown = { TriggerDropdown }
                        TriggerLogoutPopup = { TriggerLogoutPopup }
                    /> :
                    null
            }

            {
                ( logout_popup ) ? 
                    <Logout
                        TriggerLogoutPopup = { TriggerLogoutPopup }
                        ConfirmLogout = { ConfirmLogoutHandler }
                    />
                : null
            }

            { ( post_area_jsx ) ? 
                (
                    <Switch>

                        <Route exact path='/message/:user' render={()=>{
                            return (
                                <Suspense fallback={ <LoadSpinner/> }>
                                    <AsyncMessageRoute 
                                        blur={ ( profile_alert || logout_popup ) ? '5px' : '0px' }
                                        MessageInputValue = { messageInput }
                                        ChangeMessageInput = { (e)=>ChangeMessageInput(e) }
                                        RecentMessages = { recent_messages }
                                        Username = { message_info.Username }
                                        Profile = { message_info.Profile }
                                        SendMessage = { (username)=>SendMessageHandler(username) }
                                    />
                                </Suspense>
                            )
                        }}/>

                        <Route exact path='/home' render={()=>{
                            return <HomeContainer 
                                        jsx = { post_area_jsx }
                                        LeftClick = { LeftClickHandler }
                                        RightClick = { RightClickHandler }
                                        CenterClick = { CenterClickHandler }
                                        post_list = { post_list }
                                        current_sidebar_value = { current_sidebar_value }
                                        current_index = { current_index }
                                    />}
                        }/>

                        <Route render={()=>{
                            return <HomeContainer 
                                        jsx = { post_area_jsx }
                                        LeftClick = { LeftClickHandler }
                                        RightClick = { RightClickHandler }
                                        CenterClick = { CenterClickHandler }
                                        post_list = { post_list }
                                        current_sidebar_value = { current_sidebar_value }
                                        current_index = { current_index }
                                    />}
                        }/>
                    </Switch>
                )
            : 
                <main className='main-post-container'>
                    <LoadSpinner/>
                </main>
            }

            <RequestBar blur={ ( profile_alert || logout_popup ) ? '5px' : '0px' }>
                <RequestHeader/>
                <RequestNav
                    TriggerNotificationNav={ (ref)=> TriggerNotificationNav(ref) }
                    TriggerRequestNav= { (ref)=>TriggerRequestNav(ref) }
                />
                { ( !request_list_jsx ) ? <LoadSpinner/> : request_list_jsx }
            </RequestBar>

            { ( profile_alert ) ? <ImageConfig RemoveProfileCard={ TriggerProfileAlert }/> : null }

        </Fragment>
    )
}

export default withRouter( MainPage );
