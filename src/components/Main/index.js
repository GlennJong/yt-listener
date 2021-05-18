import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useCaptionGetter } from '../../utils/useCaptionGetter';
import SoundIcon from '../SoundIcon'
import ToggleButton from '../ToggleButton';
import Player from '../Player';
import List from '../List';
import { color } from '../../constant/color';
import { Youtube as YoutubeIcon } from '@styled-icons/boxicons-logos';

const Main = ({ id }) => {
  const playerRef = useRef(null);
  const listRef = useRef(null);
  const [ toggle, setToggle ] = useState(false);

  const captions = useCaptionGetter(id);
  
  function handleSaveCurrentTimeData() {
    const time = playerRef.current.getCurrentTime();
    const caption = handleGetCurrentCaption(time);
    listRef.current.addItem(caption);
  }

  function handleGetCurrentCaption(sec) {
    let content;
    const blurSec = sec - 0.5;
    captions.forEach(caption => {
      const start = Number(caption.start);
      const end =  start + Number(caption.dur);
      if (blurSec > start && blurSec <= end) {
        content = { 
          start: start,
          end: end,
          content: caption.content,
          spot: blurSec,
          timestamp: new Date()
        };
        return;
      }
    });
    return content;
  }

  function handleVideoMove(e) {
    const { sec } = e.currentTarget.dataset;
    playerRef.current.seekTo(sec);
  }

  function handleVideoPlay(e) {
    // const { sec } = e.currentTarget.dataset;
    playerRef.current.playVideo();
  }

  function handleTogglePlayer() {
    setToggle(!toggle)
  }
  
  
  return (
    <Root>
      {
        captions &&
        <>
          <PlayerHead>
            <PlayerTitle>
              <SoundIcon className="icon" />
              <Title className="title">Video Title</Title>
            </PlayerTitle>
            <PlayerToggleButton onClick={handleTogglePlayer}><YoutubeIcon size="16" /></PlayerToggleButton>
          </PlayerHead>
          
          <PlayerWrapper active={toggle}>
            <div className="wrap"><Player className="player" ref={playerRef} id={id} /></div>
          </PlayerWrapper>
          <SaveButton onClick={handleSaveCurrentTimeData}>Save</SaveButton>
          <button onClick={handleVideoPlay}>Play</button>
          <List ref={listRef} onItemClick={handleVideoMove} />
        </>
      }
    </Root>
  );
}

const Root = styled.div`
  margin: 0 auto;
  padding: 25px;
  width: 480px;
  max-width: 100%;
  box-sizing: border-box;
`
const SaveButton = styled.button`
  ${'' /* border: 0;
  background: transparent; */}
`
const PlayerHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const PlayerTitle = styled.div`
  display: block;
  border: 0;
  padding: 6px 0;
  background: transparent;
  > .icon {
    display: inline-block;
    vertical-align: middle;
    margin-right: 6px;
  }
  > .title {
    display: inline-block;
    vertical-align: middle;
    color: ${color.white};
    font-size: 13px;
    font-weight: 600;
  }
`
const PlayerToggleButton = styled(ToggleButton)`
  margin-right: 4px;
  padding: 2px 4px;
  color: ${color.white};
`
const Title = styled.p`
  display: inline-block;
`

const PlayerWrapper = styled.div`
  max-height: 0px;
  overflow: hidden;
  transition: max-height .3s ease;
  ${({ active }) => active && css`
    max-height: 50vh;
  `}
  .wrap {
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
    }
  }
`

export default Main;
