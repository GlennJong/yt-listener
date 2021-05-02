import React, { forwardRef, useEffect, useState } from 'react';
import YouTube from 'react-youtube';

const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

const YoutubePlayer = forwardRef(({ id }, ref) => {

  const [ video, setVideo ] = useState(null);
  
  useEffect(() => {
    if (ref) {
      ref.current = video;
    }
  }, [video])
  
  function handleListenPlayer(item) {
    setVideo(item.target);
  }
  
  return (
    <YouTube videoId={id} opts={opts} onReady={handleListenPlayer}  />
  )
})

export default YoutubePlayer;