import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useCaptionGetter } from '../../utils/useCaptionGetter';

import ToggleButton from '../../components/ToggleButton';
import ToggleSlider from '../../components/ToggleSlider';
import PrimaryButton from '../../components/PrimaryButton';
import Player from '../../components/Player';

import PlayerTitle from './PlayerTitle';
import WordList from './WordList';

import { color, gradient } from '../../constant/color';
import { Youtube as YoutubeIcon } from '@styled-icons/boxicons-logos';
import { Play, Pause, Plus } from '@styled-icons/boxicons-regular';

const PlayerSection = ({ id }) => {
  const sliderRef = useRef(null);
  const playerRef = useRef(null);
  const listRef = useRef(null);
  const [ play, setPlay ] = useState(false);
  const [ ready, setReady ] = useState(false);

  const captions = useCaptionGetter(id);

  function handleCheckApplicationReady() {
    if (captions) setReady(true);
  }
  
  function handleSaveCurrentTimeData() {
    const time = playerRef.current.getCurrentTime();
    listRef.current.addItemBySec(time);
  }

  function handleVideoMove(e) {
    const { sec } = e.currentTarget.dataset;
    playerRef.current.seekTo(sec);
  }

  function handleVideoPlay(e) {
    if (!play) {
      playerRef.current.playVideo();
      setPlay(true);
    }
    else {
      playerRef.current.pauseVideo();
      setPlay(false);
    }
  }

  function handleTogglePlayer() {
    sliderRef.current.toggle();
  }
  
  
  return (
    <Root>
        <Application>
          { !ready && <div>prepare the caption.</div> }
          <PlayerHead>
            <PlayerTitle title="video player" />
            <PlayerToggleButton onClick={handleTogglePlayer}><YoutubeIcon size="16" /></PlayerToggleButton>
          </PlayerHead>
          <ToggleSlider ref={sliderRef}>
            <Player className="player" ref={playerRef} onReady={handleCheckApplicationReady} id={id} />
          </ToggleSlider>
          { ready && <>
            <WordList captions={captions} ref={listRef} onItemClick={handleVideoMove} />
            <ButtonWrapper>
              <SaveButton onClick={handleSaveCurrentTimeData}><Plus size="24" /></SaveButton>
              <PlayButton onClick={handleVideoPlay}>
                { play ? <Pause size="24" /> : <Play size="24" /> }
              </PlayButton>
            </ButtonWrapper>
          </> }
        </Application>
    </Root>
  );
}

const Root = styled.div`
  margin: 0 auto;
  padding: 25px;
  width: 480px;
  max-width: 100%;
  box-sizing: border-box;
  color: ${color.white.normal};
`

const Application = styled.div`
`

const PlayerHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 480px;
  max-width: 100%;
  z-index: 1;
`

const SaveButton = styled.button`

`
const PlayButton = styled(PrimaryButton)`
`

const PlayerToggleButton = styled(ToggleButton)`
  margin-right: 4px;
  padding: 2px 4px;
  color: ${color.white.normal};
`

export default PlayerSection;
