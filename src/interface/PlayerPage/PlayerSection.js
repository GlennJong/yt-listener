import React, { useEffect, useRef, useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useCaptionGetter } from '../../utils/useCaptionGetter';

import ToggleButton from '../../components/ToggleButton';
import ToggleSlider from '../../components/ToggleSlider';
import PrimaryButton from '../../components/PrimaryButton';
import Player from '../../components/Player';

import PlayerTitle from './PlayerTitle';
import PlayerProgress from './PlayerProgress';
import PlayerController from './PlayerController';
import SentenceSection from './SentenceSection';

import { color, gradient } from '../../constant/color';
import { Youtube as YoutubeIcon } from '@styled-icons/boxicons-logos';
import { Play, Pause, Plus, Loader, Reset } from '@styled-icons/boxicons-regular';

const PlayerSection = ({ hide=false, id }) => {
  const playerSliderRef = useRef(null);
  const controllerSliderRef = useRef(null);
  
  const playerRef = useRef(null);
  const listRef = useRef(null);
  const controllerRef = useRef(null);
  const timerRef = useRef(null);

  const [ play, setPlay ] = useState(false);
  const [ finish, setFinish ] = useState(false);
  const [ ready, setReady ] = useState(false);
  const [ videoData, setVideoData ] = useState(null);

  const captions = useCaptionGetter(id);

  function handleCheckApplicationReady(data) {
    setVideoData(data);
    if (captions) setReady(true);
  }

  useEffect(() => {
    if (playerRef.current && !hide) {
      const isFinish = playerRef.current.getCurrentTime() / playerRef.current.getDuration() >= 0.99;
      isFinish && setFinish(true);
    }
  }, [playerRef, hide]);

  const MainButtonStatus = useMemo(() => {
    let status;
    // 在介面 | 已播放
    if (!hide && play) status = 'clickToSave';
    // 不在介面 | 已播放
    if (hide && play) status = 'clickToPause';
    // 不在介面 | 已播放
    
    // 在介面 | 已暫停
    if (!hide && !play) status = 'clickToPlay';
    // 不在介面 | 已暫停
    if (hide && !play) status = 'clickToPlay';
    
    if (!play && finish) status = 'clickToReplay';

    return status
  }, [hide, play, finish]);

  useEffect(() => {
    updateFinishTimer(play ? 'play' : 'stop');
  }, [play]);

  function handleClickMainButton() {
    switch (MainButtonStatus) {
      case 'clickToPlay': handleVideoPlay();
        break;

      case 'clickToReplay': handleVideoReplay();
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
    controllerRef.current.sync();
    setPlay(true);
  }

  function handleVideoReplay() {
    playerRef.current.playVideo();
    controllerRef.current.sync();
    setFinish(false);
    setPlay(true);
  }

  function handleVideoPause() {
    playerRef.current.pauseVideo();
    controllerRef.current.deSync();
    setPlay(false);
  }

  function handleTogglePlayerSlider() {
    playerSliderRef.current.toggle();
  }

  function handleToggleControllerSlider() {
    controllerSliderRef.current.toggle();
  }

  function updateFinishTimer(status='play') {
    clearTimeout(timerRef.current);

    if (status === 'play') {
      const delta = playerRef.current.getDuration() - playerRef.current.getCurrentTime();
      timerRef.current = setTimeout(() => {
        setPlay(false);
        setFinish(true);
      }, delta * 1000);
    }
  }
  
  return (
    <Root>
      <Application hide={hide}>
        <PlayerHead>
          <PlayerTitle status={play} title={videoData?.title} onClick={handleToggleControllerSlider} />
          <PlayerToggleButton onClick={handleTogglePlayerSlider}><YoutubeIcon size="16" /></PlayerToggleButton>
        </PlayerHead>
        <PlayerWrapper>
          <ToggleSlider ref={playerSliderRef}>
            <Player className="player" ref={playerRef} onReady={handleCheckApplicationReady} id={id} />
          </ToggleSlider>
        </PlayerWrapper>
        <ControllerWrapper>
          <ToggleSlider ref={controllerSliderRef}>
            <PlayerController ref={controllerRef} player={playerRef.current} onProgress={updateFinishTimer} />
          </ToggleSlider>
        </ControllerWrapper>
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
          { (ready && MainButtonStatus === 'clickToPlay')   && <Play size="24" /> }
          { (ready && MainButtonStatus === 'clickToReplay') && <Reset size="24" /> }
          { (ready && MainButtonStatus === 'clickToSave')   && <Plus size="24" /> }
          { (ready && MainButtonStatus === 'clickToPause')  && <Pause size="24" /> }
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
  padding-top: 48px;
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
  z-index: 2;
`

const ControllerWrapper = styled.div`
  margin-bottom: 12px;
`

const PlayerWrapper = styled.div`
`

const SentenceWrapper = styled.div`
  position: relative;
  padding-bottom: 80px;
`

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 480px;
  max-width: 100%;
  z-index: 2;
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
