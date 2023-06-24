import React from 'react';
import videoSource4 from '../../../video/video4.mp4';

function VideoBackground() {
  return (
    <div className="video-background">
      <video className="video" autoPlay loop muted>
        <source src={videoSource4} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content-overlay">
        <div className="overlay-text">Hello</div>
      </div>
    </div>
  );
}


export default VideoBackground;