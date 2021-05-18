import React, { forwardRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';

const opts = {
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
    playsinline: 1,
    fs: 0
  },
};

const YoutubePlayer = forwardRef(({ id, ...props }, ref) => {

  const [ video, setVideo ] = useState(null);
  
  useEffect(() => {
    if (ref) {
      ref.current = video;
    }
  }, [video])

  useEffect(() => {

    
  }, [])
  
  function handleListenPlayer(item) {
    setVideo(item.target);
    console.log(item.target)
  }
  
  return (
    <Root {...props}>
      <YouTube videoId={id} opts={opts} onReady={handleListenPlayer} />
    </Root>
  )
})

const Root = styled.div`
  > div {
    width: 100%;
    height: 100%;
    iframe {
      width: 100% !important;
      height: 100% !important;
    }
  }
`

export default YoutubePlayer;