import React, {
  Fragment,
  Suspense,
  useCallback,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import socket_client from "socket.io-client";
import { Route, Switch, withRouter } from "react-router-dom";
import Peer from 'peerjs';

import "../../Components/PostContainer/post-container.scss";
import VideoContainer from '../../Components/Messages/VideoContainer/video-container';
import SideBar from "../../Components/SiderBar/sidebar";
import SidebarHeader from "../../Components/SiderBar/SideBar-Header/sidebar-header";
import SidebarNav from "../../Components/SiderBar/Sidebar-Nav/sidebar-nav";
import Nodata from "../../Components/UI/NoData/no-data";
import LoadSpinner from "../../Components/UI/LoadSpinner/load-spinner";
import PeopleListContainer from "../../Components/PeopleListContainer/people-list-container";
import PeopleListCard from "../../Components/PeopleListCard/people-list-card";
import RequestBar from "../../Components/RequestBar/request-bar";
import RequestListContainer from "../../Components/RequestListContainer/request-container";
import RequestHeader from "../../Components/RequestBar/RequestHeader/request-header";
import RequestNav from "../../Components/RequestBar/RequestNav/request-nav";
import Interactions from "../../Components/Interactions/Interactions";
import NoPost from "../../Components/UI/Default-No-Post/no-post";
import PostContainer from "../../Components/PostContainer/post-container";
import TestImage from "../../assets/default-user.png";
import ImageContainer from "../../Components/ImageContainer/image-container";
import Dropdown from "../../Components/UI/Dropdown/dropdown";
import RequestCard from "../../Components/RequestCard/request-card";
import ImageConfig from "../../Components/Credentials/ImageConfig/image-config";
import HomeContainer from "../../Components/HomeContainer/home-container";
import Logout from "../../Components/Credentials/Logout/logout";
import NotificationCard from "../../Components/NotificationCard/notification-card";
import NotificationAudio from "../../assets/notification.mp3";
import MatchAlert from "../../Components/UI/MatchAlert/match-alert";
import IncomingCallPage from "../../Components/IncomingCallHandler/incoming-call-page";

const AsyncMessageRoute = React.lazy(() => {
  return import("../../Components/Messages/messages");
});

var global_peer = new Peer(`${localStorage.getItem('Username')}`, {
  port: '9000',
  path: '/'
});

const MainPage = ({ authenticate, history }) => {
  const [people_list, SetPeopleList] = useState(null);
  const [requests, SetRequests] = useState(null);
  const [my_profile_pic, SetMyProfilePic] = useState(null);
  const [post_list, SetPostList] = useState(null);
  const [current_index, SetCurrentIndex] = useState(0);
  const [current_sidebar_value, SetSideBarValue] = useState(0);
  const [current_request_bar_value, SetRequestBarValue] = useState(0);
  const [dropdown_info, SetDropdownInfo] = useState(false);
  const [socket, SetSocket] = useState(null);
  const [profile_alert, SetProfileAlert] = useState(false);
  const [api_limiter, SetApiLimiter] = useState(false);
  const [temp_post_list, SetTempPostList] = useState(null);
  const [logout_popup, SetLogoutPopup] = useState(false);
  const [messageInput, SetMessageInput] = useState("");
  const [recent_messages, SetRecentMessages] = useState(null);
  const [message_info, SetMessageInfo] = useState(null);
  const [current_post_api_call, SetCurrentPostApiCall] = useState(0);
  const [milestone, SetMileStone] = useState(0);
  const [joined_room, SetJoinedRoom] = useState(null);
  const [nav_notification, SetNavNotification] = useState(null);
  const [direct_url_access, SetDirectURLAccess] = useState(false);
  const [notification_list, SetNotificationList] = useState(null);
  const [notification_alert, SetNotificationAlert] = useState(false);
  const [match_found_timeout, SetMatchFoundTimeout] = useState(false);

  const [my_stream, SetMyStream] = useState(null);
  const [peer_stream, SetPeerStream] = useState(null);
  const [callincoming, SetCallIncoming] = useState(false);
  const [caller_name, SetCallerName] = useState(null);
  const [video_call_popup, SetVideoCallPopup] = useState(false);
  const [callerProfile, SetCallerProfile] = useState(null);

  const TriggerDropdown = () => {
    SetDropdownInfo(!dropdown_info);
  };
  // changing the sidebar and request bar pointer div;

  const TriggerMessageNav = (ref) => {
    ref.style.transition = "transform 0.3s";
    ref.style.transform = "translateX(160%)";
    SetSideBarValue(1);
  };

  const TriggerMatchNav = (ref) => {
    ref.style.transition = "transform 0.3s";
    ref.style.transform = "translateX(25%)";
    SetSideBarValue(0);
    LeaveJoinedRoom();
    SetDirectURLAccess(false);
    history.push("/main-app");
  };

  const TriggerNotificationNav = (ref) => {
    ref.style.transition = "transform 0.3s";
    ref.style.transform = "translateX(160%)";
    SetRequestBarValue(1);
    SetNotificationAlert(false);
  };

  const TriggerRequestNav = (ref) => {
    ref.style.transition = "transform 0.3s";
    ref.style.transform = "translateX(25%)";
    SetRequestBarValue(0);
  };

  const TriggerProfileAlert = () => {
    SetProfileAlert(!profile_alert);
  };

  const DeleteNotification = useCallback(
    (sender) => {
      const dummy = [...people_list];
      const findSender = dummy.findIndex((element) => {
        return element.username === sender;
      });
      if (findSender !== -1) {
        const new_data = { ...dummy[findSender], notification: null };
        dummy[findSender] = new_data;
        const nav_notification_list = [...nav_notification];
        const index = nav_notification_list.findIndex((element) => {
          return element === sender;
        });
        nav_notification_list.splice(index, 1);

        if (nav_notification_list.length === 0) {
          SetNavNotification(null);
        }

        SetPeopleList(dummy);
        SetNavNotification(nav_notification_list);
      }
    },
    [people_list, nav_notification]
  );

  const PeopleCardMessageClick = (username) => {
    // socket emit to that person room
    const dummy = [...people_list];
    const user_index = dummy.findIndex((element) => {
      return element.username === username;
    });
    // check if there is data in the main array;
    if (user_index !== -1) {
      const MessageData = dummy[user_index].Messages;
      const MessageInfo = {
        Username: username,
        Profile: dummy[user_index].Profile_Picture,
      };
      SetMessageInfo(MessageInfo);
      SetRecentMessages(MessageData);
      SetJoinedRoom(username);
      if (nav_notification) {
        DeleteNotification(username);
      }
      // shifting the route;
      history.push(`/message/${username}`);
    }
  };

  const AudioPlay = () => {
    const audio = new Audio(NotificationAudio);
    audio.play().then(() => {});
  };

  const AddMessage = (Match_name, Message, self) => {
    // adding message for real time and state update;
    const date = new Date(parseInt(Date.now())).toLocaleTimeString();
    const dummy = [...people_list];
    const match_index = dummy.findIndex((element) => {
      return element.username === Match_name;
    });
    dummy[match_index].Messages.push({ data: Message, self, Date: date });
    SetPeopleList(dummy);
  };

  const AddMessagetoBackend = (receiver) => {
    const context = {
      Message: messageInput,
      Sender: localStorage.getItem("Username"),
      Receiver: receiver,
    };
    axios.put("http://localhost:8000/message", context);
  };

  const SendMessageHandler = (Match_name) => {
    // axios request;
    if (messageInput.length >= 1) {
      AddMessage(Match_name, messageInput, true);
      socket.emit(
        "receive-message-server",
        localStorage.getItem("Username"),
        Match_name,
        messageInput
      );
      AddMessagetoBackend(Match_name);
      SetMessageInput("");
    }
  };

  const LeaveJoinedRoom = () => {
    SetJoinedRoom(null);
  };

  const SetNewProfile = (profile) => {
    SetMyProfilePic(profile);
  };
  const TwoWayMatchHandler = (context) => {
    SetMatchFoundTimeout(true);
    RemoveRequestData(context.FriendName);
    AddMatchData(context.FriendProfile, context.FriendName);
    AddToMatchesBackend(context.FriendName, context.FriendProfile);
    RemoveRequestSectionBackend(context.FriendName);
  };

  const OneWayMatchHandler = (context) => {
    axios.put("http://localhost:8000/friend-requests", context);
  };

  const MatchTypeCheck = (username) => {
    const dummy = [...requests];
    if (dummy.length >= 1) {
      const index = dummy.findIndex((element) => {
        return element.sender === username;
      });
      if (index !== -1) {
        return true;
      }
      return false;
    }
    return false;
  };

  const SendMatchRequest = (friend_name, friend_profile) => {
    const context = {
      YourName: localStorage.getItem("Username"),
      YourProfile: my_profile_pic,
      FriendName: friend_name,
      FriendProfile: friend_profile,
    };

    if (MatchTypeCheck(friend_name)) {
      TwoWayMatchHandler(context);
    } else {
      OneWayMatchHandler(context);
    }
  };

  const FetchNewPost = () => {
    // Fetch new posts after reaching half value for the total post_array;
    axios
      .get(
        `http://localhost:8000/post/${
          current_post_api_call + 1
        }/${localStorage.getItem("Username")}`
      )
      .then((response) => {
        const no_post = { no_posts: true };
        if (JSON.stringify(no_post) !== JSON.stringify(response.data)) {
          if (response.data.length >= 1) {
            const dummy = [...post_list];
            let i = 0;
            for (i of response.data) {
              dummy.push(i);
            }
            SetTempPostList(dummy);
            if (response.data.length === 20) {
              SetCurrentPostApiCall(current_post_api_call + 1);
            } else {
              SetApiLimiter(true);
            }
          } else {
            SetApiLimiter(true);
          }
        }
      });
  };

  const SetReactionBackend = (FriendName) => {
    const context = {
      MyName: localStorage.getItem("Username"),
      ReactedPersonName: FriendName,
    };

    axios.put("http://localhost:8000/post-react", context);
  };

  const LeftClickHandler = () => {
    // handles left swipe;
    const dummy = [...post_list];
    const FriendName = dummy[0].Username;
    if (api_limiter === false && current_index === milestone) {
      FetchNewPost();
    } else {
      SetCurrentIndex(current_index + 1);
    }
    dummy.splice(0, 1);
    SetPostList(dummy);
    SetReactionBackend(FriendName);
  };

  const CheckPreRequestFound = (name) => {
    const dummy = [...requests];
    if (dummy.length >= 1) {
      const index = dummy.findIndex((element) => {
        return element.sender === name;
      });
      if (index !== -1) {
        return index;
      }
      return false;
    }
    return false;
  };

  const CenterClickHandler = () => {
    // Sends Friend request SuperLike
    const dummy = [...post_list];
    // realtime request
    const FriendName = dummy[0].Username;
    const FriendProfile = dummy[0].ProfilePicture;
    const MyName = localStorage.getItem("Username");
    socket.emit("Send-Friend-Request", FriendName, MyName, my_profile_pic);

    if (api_limiter === false && current_index === milestone) {
      FetchNewPost();
    } else {
      SetCurrentIndex(current_index + 1);
    }
    dummy.splice(0, 1);
    SetPostList(dummy);
    SendMatchRequest(FriendName, FriendProfile);
    SetReactionBackend(FriendName);
  };

  const RightClickHandler = () => {
    // Sends Friend request SuperLike
    const dummy = [...post_list];
    // realtime request
    const FriendName = dummy[0].Username;
    const FriendProfile = dummy[0].ProfilePicture;
    const MyName = localStorage.getItem("Username");
    socket.emit("Send-Friend-Request", FriendName, MyName, my_profile_pic);

    if (api_limiter === false && current_index === milestone) {
      FetchNewPost();
    } else {
      SetCurrentIndex(current_index + 1);
    }

    dummy.splice(0, 1);
    SetPostList(dummy);
    SendMatchRequest(FriendName, FriendProfile);
    SetReactionBackend(FriendName);
  };

  // Message Route
  const ChangeMessageInput = (event) => {
    // message two-way binding;
    const value = event.target.value;
    SetMessageInput(value);
  };

  const TriggerLogoutPopup = () => {
    // change logout popup;
    SetLogoutPopup(!logout_popup);
    SetDropdownInfo(false);
  };

  const ConfirmLogoutHandler = () => {
    // changes authentication status to false to log out;
    authenticate(true);
  };

  const NotifyInPeopleCard = (sender) => {
    if (joined_room !== sender) {
      const dummy = [...people_list];
      const findSender = dummy.findIndex((element) => {
        return element.username === sender;
      });
      if (findSender !== -1) {
        const new_data = { ...dummy[findSender], notification: true };
        dummy[findSender] = new_data;
        SetPeopleList(dummy);
        if (nav_notification) {
          const nav_notification_list = [...nav_notification];
          nav_notification_list.push(sender);
          SetNavNotification(nav_notification_list);
        } else {
          SetNavNotification([sender]);
        }
        AudioPlay();
      }
    }
  };

  const RemoveRequestData = (username) => {
    // Removes the selected data from request array state after accept or reject;
    const friend_req_list = [...requests];
    const index = friend_req_list.findIndex((element) => {
      return element.Username === username;
    });
    friend_req_list.splice(index, 1);
    SetRequests(friend_req_list);
  };

  const AddMatchData = (pp, username) => {
    // Add to match data array after accepting match request;
    const match_data = [...people_list];
    const current_date = Date.now().toString();
    match_data.unshift({
      username: username,
      Profile_Picture: pp,
      Messages: [],
      LastInteraction: current_date,
      recent: true,
    });
    SetPeopleList(match_data);
  };

  const RemoveRequestSectionBackend = (Username) => {
    const context = {
      MyName: localStorage.getItem("Username"),
      RequestName: Username,
    };
    axios.post("http://localhost:8000/friend-requests", context);
  };

  const AddToMatchesBackend = (match_username, match_image) => {
    const context = {
      FriendName: match_username,
      YourName: localStorage.getItem("Username"),
      FriendProfilePic: match_image,
      YourProfilePic: my_profile_pic,
    };

    axios.post("http://localhost:8000/matches", context);
  };

  const SendSocketMatch = (username) => {
    // real-time for adding to match array of receiver;
    socket.emit(
      "accept",
      localStorage.getItem("Username"),
      my_profile_pic,
      username
    );
  };

  const SendSocketNotification = (username, profile) => {
    socket.emit(
      "notification-server",
      localStorage.getItem("Username"),
      username,
      profile
    );
  };

  const AddNotificationBackend = (username, profile) => {
    const context = {
      Sender: localStorage.getItem("Username"),
      Username: username,
      ProfilePicture: profile,
    };
    axios.put("http://localhost:8000/add-notification", context);
  };

  const AcceptMatchRequest = (profile_image, username) => {
    // the username here is the person who requested
    RemoveRequestSectionBackend(username);
    RemoveRequestData();
    AddMatchData(profile_image, username);
    AddToMatchesBackend(username, profile_image);
    SendSocketMatch(username);
    SendSocketNotification(username, profile_image);
    AddNotificationBackend(username, profile_image);
    const response = CheckPreRequestFound(username);
    if (response !== false) {
      const dummy = [...post_list];
      dummy.splice(response, 1);
      SetPostList(dummy);
    }
  };

  const RejectMatchRequest = (username) => {
    // the username here is the person who requested
    RemoveRequestSectionBackend(username);
    RemoveRequestData();
  };

  const AddNotification = (sender, profile) => {
    if (notification_list) {
      const dummy = [...notification_list];
      dummy.push({ sender, ProfilePicture: profile });
      SetNotificationList(dummy);
    } else {
      SetNotificationList([{ sender, ProfilePicture: profile }]);
    }
    if (current_request_bar_value === 0) {
      SetNotificationAlert(true);
    }
  };

  const FetchMatches = () => {
    axios
      .get(`http://localhost:8000/matches/${localStorage.getItem("Username")}`)
      .then((response) => {
        const error = { error_type: "Username", message: "Wrong Username" };
        const no_res = { no_matches: true };
        if (JSON.stringify(response.data) !== JSON.stringify(error)) {
          if (JSON.stringify(response.data) !== JSON.stringify(no_res)) {
            SetPeopleList(response.data);
          } else {
            SetPeopleList([]);
          }
        } else {
          SetPeopleList([]);
        }
      });
  };

  const FetchNotifications = () => {
    axios
      .get(
        `http://localhost:8000/add-notification/${localStorage.getItem(
          "Username"
        )}`
      )
      .then((response) => {
        SetNotificationList(response.data);
      });
  };

  const FetchFriendrequest = () => {
    axios
      .get(
        `http://localhost:8000/friend-requests/${localStorage.getItem(
          "Username"
        )}`
      )
      .then((response) => {
        const error = { no_requests: true };
        if (JSON.stringify(response.data) !== JSON.stringify(error)) {
          SetRequests(response.data);
        }
      });
  };

  const GetProfilePic = () => {
    axios
      .get(`http://localhost:8000/profile/${localStorage.getItem("Username")}`)
      .then((response) => {
        if (response.data.length >= 1) {
          SetMyProfilePic(response.data);
        } else {
          SetMyProfilePic(TestImage);
          SetProfileAlert(true);
        }
      });
  };

  const FetchPosts = () => {
    axios
      .get(`http://localhost:8000/post/0/${localStorage.getItem("Username")}`)
      .then((response) => {
        const no_post = { no_posts: true };
        if (JSON.stringify(no_post) !== JSON.stringify(response.data)) {
          if (response.data.length >= 1) {
            SetTempPostList(response.data);
          } else {
            SetPostList([]);
          }
        } else {
          // default no-post page;
          SetPostList([]);
        }
      });
  };

  const JoinSocketRoom = () => {
    const io = socket_client.connect("http://localhost:8000");
    io.emit("join-room", localStorage.getItem("Username"));
    SetSocket(io);
  };

  useEffect(() => {
    // this fetches posts;
    FetchPosts();

    // this fetches all the matches with sorted data;
    FetchMatches();

    // this fetches all the requests;
    FetchFriendrequest();

    // this fetches my profile picture;
    GetProfilePic();

    // fetch notifications;
    FetchNotifications();

    // join my_sockek_room
    JoinSocketRoom();
  }, []);

  useEffect(() => {
    // Check for post of the matches and deleting that from the new post list;
    if (temp_post_list && people_list) {
      // O(n.log(n));
      const post_list_dummy = [...temp_post_list]; // Username
      const dummy_list = [...post_list_dummy]; // username
      const matches = [...people_list];
      let deletion_num = 0;
      if (post_list_dummy.length >= 1 && matches.length >= 1) {
        let match = 0;
        // O(nlog(n)); WCS = 400 || BCS = O(1) === 1;
        for (match of matches) {
          let PostListLowerIndex = 0;
          let PostListGreatestIndex = post_list_dummy.length - 1;

          while (PostListLowerIndex <= PostListGreatestIndex) {
            // Find the mid index
            const PostListMidIndex = Math.floor(
              (PostListLowerIndex + PostListGreatestIndex) / 2
            );
            const MidIndexUsername = post_list_dummy[PostListMidIndex].Username;
            // If element is present at mid, return True
            if (MidIndexUsername === match.username) {
              dummy_list.splice(PostListMidIndex - deletion_num, 1);
              deletion_num++;
              break;
            }

            // Else look in left or right half accordingly
            else if (
              Math.sign(MidIndexUsername.localeCompare(match.username)) === -1
            ) {
              PostListLowerIndex = PostListMidIndex + 1;
            } else {
              PostListGreatestIndex = PostListMidIndex - 1;
            }
          }
        }
        if (post_list) {
          const posts = [...post_list];
          let new_posts = 0;
          for (new_posts of dummy_list) {
            posts.push(new_posts);
          }
          SetPostList(posts);
        } else {
          SetPostList(dummy_list);
        }
        SetTempPostList(null);
        SetMileStone(Math.floor(post_list.length / 2) + 1);
        SetCurrentIndex(0);
        if (dummy_list.length <= 20) {
          SetApiLimiter(true);
        }
      } else {
        SetPostList(dummy_list);
        SetTempPostList(null);
      }
    }
  }, [temp_post_list, people_list, post_list]);

  const FetchDirectURLMessages = useCallback(
    (username) => {
      const dummy = [...people_list];
      const user_index = dummy.findIndex((element) => {
        return element.username === username;
      });
      // check if there is data in the main array;
      if (user_index !== -1) {
        const MessageData = dummy[user_index].Messages;
        const MessageInfo = {
          Username: username,
          Profile: dummy[user_index].Profile_Picture,
        };
        SetMessageInfo(MessageInfo);
        SetRecentMessages(MessageData);
        SetJoinedRoom(username);
        if (nav_notification) {
          DeleteNotification(username);
        }
        SetDirectURLAccess(true);
      } else {
        // false username;
        history.push("/main-app");
      }
    },
    [people_list, history, DeleteNotification, nav_notification]
  );

  useEffect(() => {
    if (profile_alert === false) {
      if (
        history.location.pathname === "/" ||
        history.location.pathname === "/settings"
      ) {
        if (joined_room !== null) {
          SetJoinedRoom(null);
          SetDirectURLAccess(false);
        }
      } else {
        if (joined_room === null && people_list) {
          const username = history.location.pathname.split("/")[2];
          FetchDirectURLMessages(username);
        }
      }
    }
  }, [
    joined_room,
    history.location.pathname,
    people_list,
    FetchDirectURLMessages,
    profile_alert,
  ]);

  useEffect(() => {
    if (match_found_timeout) {
      setTimeout(() => {
        SetMatchFoundTimeout(false);
      }, 1000);
    }
  });

  useEffect(() => {
    // socket receiers in client;
    if (socket) {
      // socket operations;
      socket.on("client-request-finder", (sender, ProfilePicture) => {
        // adding it to the request_list with unshift;
        const dummy = [...requests];
        const data_redundancy = dummy.findIndex((element) => {
          return element.sender === sender;
        });
        if (data_redundancy === -1) {
          const data = { sender, ProfilePicture };
          dummy.unshift(data);
          SetRequests(dummy);
        }
      });

      socket.on("match", (username, Profile_Picture) => {
        // axios call to reconsider the match requests;
        AddMatchData(Profile_Picture, username);
      });

      socket.on("receive-message-client", (sender, message) => {
        // Message Socket Receiver;
        AddMessage(sender, message, false);
        NotifyInPeopleCard(sender);
      });

      socket.on("notification-client", (from, profile_pic) => {
        AddNotification(from, profile_pic);
      });

      return () => {
        socket.removeAllListeners();
      };
    }
  });

  const FindCallerProfile = useCallback( username => {
    if(people_list){
      const dummy = [...people_list];
      const index = dummy.findIndex((element)=>{
        return element.username === username
      });
      if(dummy !== -1){
        SetCallerProfile(dummy[index].Profile_Picture)
      }
    }
  }, [people_list]);

  useEffect(()=>{ 
    if(callincoming){
      FindCallerProfile(caller_name);
    }
  }, [ callincoming, caller_name, FindCallerProfile ]);

  useEffect(() => {
    if(socket){
      socket.on("call-incoming", caller => {
        if(video_call_popup === false){
          SetCallerName(caller);
          SetCallIncoming(true);
        }else{
          socket.emit("call-busy", caller);
        }
      });
  
      socket.on("client-busy", ()=>{
        SetMyStream(null);
        SetVideoCallPopup(false);
      })

      socket.on("call-accepted", () => {
        
      });

      global_peer.on("call", call => {
        my_stream ? call.answer(my_stream) : SetMediaStream(false, stream => {
          call.answer(stream);
        })
      })

      return () => {
        socket.removeAllListeners();
      };
    }
  });


  const SetMediaStream = (type, TriggercallCallBack, AnswerCallBack)=>{
    navigator.mediaDevices.getUserMedia({
      video: {
        frameRate: 30,
        aspectRatio: 1.5,
      },
      audio: true,
    })
    .then((stream) => {
      SetMyStream(stream);
      if(type === true){
        TriggercallCallBack(stream)
      }else{
        AnswerCallBack(stream)
      }

  })}

  const TriggerCall = ()=>{
    SetVideoCallPopup(true);
  
    SetMediaStream( true, stream => {
      console.log(stream, 'stream-data')
      socket.emit("call-user", { to: joined_room, sender: localStorage.getItem('Username') });
      global_peer.call(joined_room, stream).on("stream", ()=>{
        SetPeerStream(stream);
      });
    });
  };

  const AcceptCallRequest = () => {
    SetCallIncoming(false);
    SetVideoCallPopup(true);
  };

  const DeclineCallRequest = () => {
    SetCallIncoming(false);
  }

  // Main jsx Logic if else
  let people_list_jsx = null;
  if (people_list) {
    if (current_sidebar_value === 0) {
      if (people_list.length === 0) {
        people_list_jsx = <Nodata type="Match" />;
      } else {
        people_list_jsx = (
          <PeopleListContainer>
            {people_list.map((user, i) => {
              const UpdateDate = new Date(
                parseInt(user.LastInteraction)
              ).toLocaleDateString();
              return (
                <PeopleListCard
                  key={i}
                  profile_picture={user.Profile_Picture}
                  username={user.username}
                  lastupdate={UpdateDate}
                  fresh={user.recent ? user.recent : false}
                />
              );
            })}
          </PeopleListContainer>
        );
      }
    } else {
      if (people_list.length === 0) {
        people_list_jsx = <Nodata type="Messages" />;
      } else {
        people_list_jsx = (
          <PeopleListContainer>
            {people_list.map((user, i) => {
              const UpdateDate = new Date(
                parseInt(user.LastInteraction)
              ).toLocaleDateString();
              return (
                <PeopleListCard
                  key={i}
                  profile_picture={user.Profile_Picture}
                  username={user.username}
                  lastupdate={UpdateDate}
                  click={(username) => PeopleCardMessageClick(username)}
                  notification={user.notification ? user.notification : null}
                />
              );
            })}
          </PeopleListContainer>
        );
      }
    }
  }

  let request_list_jsx = null;
  if (requests && current_request_bar_value === 0) {
    if (requests.length === 0) {
      // use Default page
      request_list_jsx = <Nodata type="Match Request" />;
    } else {
      const request_list = [...requests];
      request_list_jsx = (
        <RequestListContainer>
          {request_list.map((request, i) => {
            return (
              <RequestCard
                key={i}
                sender={request.sender}
                profile_picture={request.ProfilePicture}
                AcceptRequest={(profile_image, username) =>
                  AcceptMatchRequest(profile_image, username)
                }
                DeclineRequest={(username) => RejectMatchRequest(username)}
              />
            );
          })}
        </RequestListContainer>
      );
    }
  }

  let notification_list_jsx = null;
  if (notification_list && current_request_bar_value === 1) {
    if (notification_list.length === 0) {
      notification_list_jsx = <Nodata type="Notification" />;
    } else {
      const notification_dummy = [...notification_list];
      notification_list_jsx = (
        <RequestListContainer>
          {notification_dummy.map((notification, i) => {
            return (
              <NotificationCard
                key={i}
                sender={notification.sender}
                profile={notification.ProfilePicture}
              />
            );
          })}
        </RequestListContainer>
      );
    }
  }

  let post_area_jsx = null;
  if (post_list) {
    if (post_list.length >= 1) {
      // main cards along with Interaction;
      const post_data = [...post_list];
      const required_data = post_data[0];
      post_area_jsx = (
        <PostContainer
          blur={
            profile_alert || logout_popup || match_found_timeout ? "5px" : "0px"
          }
        >
          <ImageContainer
            ProfilePicture={required_data.ProfilePicture}
            MainPost={required_data.MainPost}
            Username={required_data.Username}
          />
          <Interactions
            LeftClick={LeftClickHandler}
            RightClick={RightClickHandler}
            CenterClick={CenterClickHandler}
          />
        </PostContainer>
      );
    } else {
      post_area_jsx = (
        <NoPost
          blur={
            profile_alert || logout_popup || match_found_timeout ? "5px" : "0px"
          }
        />
      );
    }
  }

  return (
    <Fragment>
      <SideBar
        blur={
          dropdown_info || profile_alert || logout_popup || match_found_timeout
            ? "5px"
            : "0px"
        }
      >
        <SidebarHeader
          profile_picture={my_profile_pic}
          TriggerDropdown={TriggerDropdown}
        />
        <SidebarNav
          TriggerMessageNav={(ref) => TriggerMessageNav(ref)}
          TriggerMatchNav={(ref) => TriggerMatchNav(ref)}
          NavNotification={nav_notification}
        />
        {!people_list_jsx ? <LoadSpinner /> : people_list_jsx}
      </SideBar>

      {dropdown_info ? (
        <Dropdown
          profile={my_profile_pic}
          TriggerDropdown={TriggerDropdown}
          TriggerLogoutPopup={TriggerLogoutPopup}
        />
      ) : null}

      {logout_popup ? (
        <Logout
          TriggerLogoutPopup={TriggerLogoutPopup}
          ConfirmLogout={ConfirmLogoutHandler}
        />
      ) : null}

      {direct_url_access ? (
        <Route
          exact
          path="/message/:user"
          render={() => {
            return (
              <Suspense
                fallback={
                  <main className="main-post-container">
                    <LoadSpinner />
                  </main>
                }
              >
                {message_info ? (
                  <AsyncMessageRoute
                    blur={
                      profile_alert || logout_popup || match_found_timeout
                        ? "5px"
                        : "0px"
                    }
                    MessageInputValue={messageInput}
                    ChangeMessageInput={(e) => ChangeMessageInput(e)}
                    RecentMessages={recent_messages}
                    Username={message_info.Username}
                    Profile={message_info.Profile}
                    SendMessage={(username) => SendMessageHandler(username)}
                    TriggerVideoCallPopup = { TriggerCall }
                  />
                ) : null}
              </Suspense>
            );
          }}
        />
      ) : post_area_jsx ? (
        <Switch>
          <Route
            exact
            path="/message/:user"
            render={() => {
              return (
                <Suspense
                  fallback={
                    <main className="main-post-container">
                      <LoadSpinner />
                    </main>
                  }
                >
                  {message_info ? (
                    <AsyncMessageRoute
                      blur={
                        profile_alert || logout_popup || match_found_timeout
                          ? "5px"
                          : "0px"
                      }
                      MessageInputValue={messageInput}
                      ChangeMessageInput={(e) => ChangeMessageInput(e)}
                      RecentMessages={recent_messages}
                      Username={message_info.Username}
                      Profile={message_info.Profile}
                      SendMessage={(username) => SendMessageHandler(username)}
                      TriggerVideoCallPopup = { TriggerCall }
                    />
                  ) : null}
                </Suspense>
              );
            }}
          />

          <Route
            render={() => {
              return (
                <HomeContainer
                  jsx={post_area_jsx}
                  LeftClick={LeftClickHandler}
                  RightClick={RightClickHandler}
                  CenterClick={CenterClickHandler}
                  post_list={post_list}
                  current_sidebar_value={current_sidebar_value}
                  current_index={0}
                />
              );
            }}
          />
        </Switch>
      ) : (
        <main className="main-post-container">
          <LoadSpinner />
        </main>
      )}

      <RequestBar
        blur={
          profile_alert || logout_popup || match_found_timeout ? "5px" : "0px"
        }
      >
        <RequestHeader />
        <RequestNav
          TriggerNotificationNav={(ref) => TriggerNotificationNav(ref)}
          TriggerRequestNav={(ref) => TriggerRequestNav(ref)}
          NavNotification={notification_alert}
        />
        {!request_list_jsx && current_request_bar_value === 0 ? (
          <LoadSpinner />
        ) : (
          request_list_jsx
        )}

        {notification_list_jsx && current_request_bar_value === 1
          ? notification_list_jsx
          : null}
      </RequestBar>

      {profile_alert ? (
        <ImageConfig
          RemoveProfileCard={TriggerProfileAlert}
          SetNewProfile={(profile) => SetNewProfile(profile)}
        />
      ) : null}

      {match_found_timeout ? <MatchAlert /> : null}

      {video_call_popup === true ? (
        <VideoContainer
          my_stream = { my_stream }
          peer_stream = { peer_stream }
        />
      ) : null}
      
      {
        (callincoming) ? (
          <IncomingCallPage
            CallerName = { caller_name }
            CallerProfile = { callerProfile }
            AcceptRequest = { AcceptCallRequest }
            DeclineRequest = { DeclineCallRequest }
          />
        ) : null
      }
    </Fragment>
  );
};

export default withRouter(MainPage);
