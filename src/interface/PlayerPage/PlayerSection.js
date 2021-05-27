import React, { useEffect, useRef, useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useCaptionGetter } from '../../utils/useCaptionGetter';

import ToggleButton from '../../components/ToggleButton';
import ToggleSlider from '../../components/ToggleSlider';
import PrimaryButton from '../../components/PrimaryButton';
import Player from '../../components/Player';

import PlayerTitle from './PlayerTitle';
import PlayerProgress from './PlayerProgress';
import SentenceSection from './SentenceSection';

import { color, gradient } from '../../constant/color';
import { Youtube as YoutubeIcon } from '@styled-icons/boxicons-logos';
import { Play, Pause, Plus, Loader } from '@styled-icons/boxicons-regular';

const PlayerSection = ({ hide=false, id }) => {
  const sliderRef = useRef(null);
  const playerRef = useRef(null);
  const listRef = useRef(null);
  const [ play, setPlay ] = useState(false);
  const [ ready, setReady ] = useState(false);
  const [ videoData, setVideoData ] = useState(null);

  const captions = useCaptionGetter(id);

  function handleCheckApplicationReady(data) {
    setVideoData(data);
    if (captions) setReady(true);
  }

  const MainButtonStatus = useMemo(() => {
    let status;
    // 在介面 | 已播放
    if (!hide && play) status = 'clickToSave';
    // 不在介面 | 已播放
    if (hide && play) status = 'clickToPause';

    // 在介面 | 已暫停
    if (!hide && !play) status = 'clickToPlay';
    // 不在介面 | 已暫停
    if (hide && !play) status = 'clickToPlay';
    
    return status
  }, [hide, play]);

  function handleClickMainButton() {

    switch (MainButtonStatus) {
      case 'clickToPlay': handleVideoPlay();
        break;

      case 'clickToPause': handleVideoPause();
        break;

      case 'clickToSave': handleSaveCurrentTimeData();
        break;
    
      default: handleVideoPlay();
        break;
    }

  }
  
  function handleSaveCurrentTimeData() {
    const time = playerRef.current.getCurrentTime();
    listRef.current.addItemBySec(time);
  }

  function handleVideoMove(e) {
    const { sec } = e.currentTarget.dataset;
    playerRef.current.seekTo(sec);
  }

  function handleVideoPlay() {
      playerRef.current.playVideo();
      setPlay(true);
  }

  function handleVideoPause() {
    playerRef.current.pauseVideo();
    setPlay(false);
  }

  function handleTogglePlayer() {
    sliderRef.current.toggle();
  }
  
  return (
    <Root>
      <Application hide={hide}>
        <PlayerHead>
          <PlayerTitle title={videoData?.title} />
          <PlayerToggleButton onClick={handleTogglePlayer}><YoutubeIcon size="16" /></PlayerToggleButton>
        </PlayerHead>
        <PlayerWrapper>
          <ToggleSlider ref={sliderRef}>
            <Player className="player" ref={playerRef} onReady={handleCheckApplicationReady} id={id} />
          </ToggleSlider>
        </PlayerWrapper>
        {/* <PlayerProgress duration={videoData?.duration} /> */}
        { !ready && <div>prepare the caption.</div> }
        { ready && <>
          <SentenceWrapper>
            <SentenceSection status={MainButtonStatus} captions={captions} ref={listRef} onReplayClick={handleVideoMove} />
          </SentenceWrapper>
        </> }
      </Application>
      <ButtonWrapper>
        <MainButton status={MainButtonStatus} disabled={!ready} onClick={handleClickMainButton}>
          { !ready && <Loader size="24" />  }
          { (ready && MainButtonStatus === 'clickToPlay') && <Play size="24" /> }
          { (ready && MainButtonStatus === 'clickToSave') && <Plus size="24" /> }
          { (ready && MainButtonStatus === 'clickToPause') && <Pause size="24" /> }
        </MainButton>
      </ButtonWrapper>
    </Root>
  );
}

const Root = styled.div`
  background: ${color.black.normal};
`

const Application = styled.div`
  padding: 16px;
  padding-top: 36px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  color: ${color.white.normal};
  ${({ hide }) => hide && css`
    position: fixed;
    opacity: 0;
    z-index: -1;
  `}
`

const PlayerHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 16px;
  padding-top: 12px;
  background: ${color.black.normal};
  box-shadow: 0px 4px 4px ${color.black.dark};
  box-sizing: border-box;
  z-index: 1;
`

const PlayerWrapper = styled.div`
  margin-bottom: 12px;
`

const SentenceWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 80px;
  overflow-y: auto;
`

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 480px;
  max-width: 100%;
  z-index: 1;
`

const rotationAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`
const MainButton = styled(PrimaryButton)`
  position: fixed;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%, -50%);
  &:disabled svg {
    animation: ${rotationAnimation} 3s linear;
  }
`

const PlayerToggleButton = styled(ToggleButton)`
  margin-right: 4px;
  padding: 2px 4px;
  color: ${color.white.normal};
`

export default PlayerSection;
