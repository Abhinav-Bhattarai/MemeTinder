import React, { Fragment, useEffect, useRef } from "react";
import "./video-container.scss";

const VideoContainer = ({ my_stream, peer_stream }) => {
  const MyVideoElement = useRef(null);
  const PeerVideoElement = useRef(null);

  useEffect(() => {
    if (MyVideoElement) {
      MyVideoElement.current.srcObject = my_stream;
    }

    if (PeerVideoElement) {
      PeerVideoElement.current.srcObject = peer_stream;
    }
  }, [my_stream, peer_stream]);

  return (
    <Fragment>
      <main className="video-outer-container">
        <main className="video-inner-container">
          <video className="video-self" autoPlay ref={MyVideoElement} />
          <video className="video-other" autoPlay ref={PeerVideoElement} />
        </main>
      </main>
    </Fragment>
  );
};

export default VideoContainer;
