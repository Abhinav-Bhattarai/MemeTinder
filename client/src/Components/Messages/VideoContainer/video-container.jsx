import React, { Fragment, useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import './video-container.scss';

const VideoContainer = ({ Connected_User, socket }) => {

    const MyVideoElement = useRef(null);
    const PeerVideoElement = useRef(null);
    const [ my_stream, SetMyStream ] = useState(null);

    const CallInitiator = ()=>{
        const peer = new Peer({
            initiator: true,
            trickle: true,
            config: {

                iceServers: [
                    {
                        urls: "stun:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    },
                    {
                        urls: "turn:numb.viagenie.ca",
                        username: "sultan1640@gmail.com",
                        credential: "98376683"
                    }
                ]
            },
            stream: my_stream
        })

        peer.on("signal", data => {
            const context = {
                from: localStorage.getItem('Username'),
                to: Connected_User,
                streamdata: data
            }
            socket.emit('call-user', context)
        });

        peer.on("stream", stream =>{
            PeerVideoElement.current.srcObject = stream;
        });
    }
    
    useEffect(()=>{
        socket.on("incoming-call", ()=>{
            
        })  
    })

    useEffect(() => {
        if(MyVideoElement){
            navigator.getUserMedia({
                video: {
                    frameRate: 30,
                    aspectRatio: 1.333
                }
            }, (stream)=>{
                if(stream && MyVideoElement){
                    SetMyStream(stream);
                    MyVideoElement.current.srcObject = stream;
                }
            }, err => {})
        }
    });

    return (
        <Fragment>
            <main className='video-outer-container'>
            <main className='video-inner-container'>
                <video className='video-self' autoPlay ref={ MyVideoElement }/>
                <video className='video-other' autoPlay ref={ PeerVideoElement }/>
            </main>
            </main>
        </Fragment>
    )
}

export default VideoContainer;
