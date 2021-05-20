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

const YoutubePlayer = forwardRef(({ id, onReady=null, ...props }, ref) => {
  const [ video, setVideo ] = useState(null);
  
  useEffect(() => {
    if (ref) {
      ref.current = video;
    }
  }, [video])

  function handleListenPlayer(item) {
    setVideo(item.target);
    onReady && onReady();
  }
  
  return (
    <Root {...props}>
      <YouTube className="player" videoId={id} opts={opts} onReady={handleListenPlayer} />
    </Root>
  )
})

const Root = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  .player {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    iframe {
      width: 100% !important;
      height: 100% !important;
    }
  }

`

export default YoutubePlayer;