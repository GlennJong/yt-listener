import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useCaptionGetter } from '../../utils/useCaptionGetter';
import Player from '../Player';
import List from '../List';

const Main = () => {
  const playerRef = useRef(null);
  const listRef = useRef(null);

  const captions = useCaptionGetter('MBRqu0YOH14');
  
  function handleSaveCurrentTimeData() {
    const time = playerRef.current.getCurrentTime();
    const caption = handleGetCurrentCaption(time);
    listRef.current.addItem(caption);
  }

  function handleGetCurrentCaption(sec) {
    let content;
    captions.forEach(caption => {
      const start = Number(caption.start);
      const end =  start + Number(caption.dur);
      if (sec > start && sec <= end) {
        content = { start: start, end: end, content: caption.content };
        return;
      }
    });
    return content;
  }

  function handleVideoMove(e) {
    const { sec } = e.currentTarget.dataset;
    playerRef.current.seekTo(sec);
  }
  
  
  return (
    <Root>
      {
        captions &&
        <>
          <Player ref={playerRef} id='MBRqu0YOH14' />
          <button onClick={handleSaveCurrentTimeData}>Click</button>
          <List ref={listRef} onItemClick={handleVideoMove} />
        </>
      }
    </Root>
  );
}

const Root = styled.div`
  margin: 0 auto;
  width: 480px;
  max-width: 100%;
`

export default Main;
