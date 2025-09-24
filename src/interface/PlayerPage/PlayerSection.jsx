import React, { useEffect, useRef, useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useCaptionGetter } from '../../utils/useCaptionGetter';

import ToggleButton from '../../components/ToggleButton';
import ToggleSlider from '../../components/ToggleSlider';
import PrimaryButton from '../../components/PrimaryButton';
import Player from '../../components/Player';

import PlayerTitle from './PlayerTitle';
import PlayerController from './PlayerController';
import SentenceSection from './SentenceSection';

import { color } from '../../constant/color';
import { Youtube as YoutubeIcon } from '@styled-icons/boxicons-logos';
import { Play, Pause, Plus, Loader, Reset } from '@styled-icons/boxicons-regular';

const PlayerSection = ({ hide=false, id }) => {
  const prevId = useRef();
  const playerSliderRef = useRef(null);
  const controllerSliderRef = useRef(null);
  const appRef = useRef(null);
  
  const playerRef = useRef(null);
  const listRef = useRef(null);
  const controllerRef = useRef(null);
  const timerRef = useRef(null);

  const [ isPlay, setIsPlay ] = useState(false);
  const isPlayRef = useRef(false);
  const [ isFinish, setIsFinish ] = useState(false);
  const [ videoData, setVideoData ] = useState(null);

  const { data: captions, status} = useCaptionGetter(id);

  function handleCheckApplicationReady(data) {
    setVideoData(data);
  }
  
  useEffect(() => {
    isPlayRef.current = isPlay;
  }, [isPlay])

  useEffect(() => {
    if (id !== prevId.current) {
      setIsPlay(false);
      setIsFinish(false);
    }
  }, [id])

  useEffect(() => {
    if (playerRef.current && !hide) {
      const isFinish = playerRef.current.getCurrentTime() / playerRef.current.getDuration() >= 0.99;
      isFinish && setIsFinish(true);
    }
  }, [playerRef, hide]);

  useEffect(() => {
    if (controllerRef.current) {
      if (hide) {
        controllerRef.current.deSync();
      }
      else {
        if (prevId.current === id) {
          controllerRef.current.sync()
        }
        else {
          prevId.current = id;
          controllerRef.current.deSync();
        }
      }
    }
  }, [hide])

  const MainButtonStatus = useMemo(() => {
    let result;
    // 在介面 | 已播放
    if (!hide && isPlay) result = 'clickToSave';
    // 不在介面 | 已播放
    if (hide && isPlay) result = 'clickToPause';
    // 不在介面 | 已播放
    
    // 在介面 | 已暫停
    if (!hide && !isPlay) result = 'clickToPlay';
    // 不在介面 | 已暫停
    if (hide && !isPlay) result = 'clickToPlay';
    
    if (!isPlay && isFinish) result = 'clickToReplay';

    return result
  }, [hide, isPlay, isFinish]);

  useEffect(() => {
    updateFinishTimer(isPlay ? 'play' : 'stop');
  }, [isPlay]);

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
    
    if (appRef.current.scrollHeight - appRef.current.offsetHeight === appRef.current.scrollTop) {
      setTimeout(() => appRef.current.scrollTop = 9999, 300);
    }
  }

  function handleVideoMove(e) {
    const { sec } = e.currentTarget.dataset;
    playerRef.current.seekTo(sec);
  }

  function handleVideoPlay() {
    playerRef.current.playVideo();
    if (!hide) controllerRef.current.sync();
    setIsPlay(true);
  }

  function handleVideoReplay() {
    playerRef.current.playVideo();
    if (!hide) controllerRef.current.sync();
    setIsFinish(false);
    setIsPlay(true);
  }

  function handleVideoPause() {
    playerRef.current.pauseVideo();
    controllerRef.current.deSync();
    setIsPlay(false);
  }

  function handleTogglePlayerSlider() {
    playerSliderRef.current.toggle();
  }

  function handleToggleControllerSlider() {
    controllerSliderRef.current.toggle();
  }

  function updateFinishTimer(playStatus='play') {
    clearTimeout(timerRef.current);

    if (playStatus === 'play') {
      const delta = playerRef.current.getDuration() - playerRef.current.getCurrentTime();
      timerRef.current = setTimeout(() => {
        setIsPlay(false);
        setIsFinish(true);
      }, delta * 1000);
    }
  }

  const isReady = status === 'success' && status !== 'error';
  const isPending = status === 'pending' || status === 'generating';
  
  return (
    <Root>
      <Application ref={appRef} hide={hide}>
        <PlayerHead>
          <PlayerTitle status={isPlay} title={videoData?.title} onClick={handleToggleControllerSlider} />
          <PlayerToggleButton onClick={handleTogglePlayerSlider}><YoutubeIcon size="16" /></PlayerToggleButton>
        </PlayerHead>
        <PlayerWrapper>
          <ToggleSlider ref={playerSliderRef}>
            <PauseMask onClick={handleVideoPause} />
            <Player className="player" ref={playerRef} onReady={handleCheckApplicationReady} id={id} />
          </ToggleSlider>
        </PlayerWrapper>
        <ControllerWrapper>
          <ToggleSlider ref={controllerSliderRef}>
            <PlayerController ref={controllerRef} player={playerRef.current} onProgress={() => updateFinishTimer()} />
          </ToggleSlider>
        </ControllerWrapper>
        { status === 'error' && <div>Oh no! Something went wrong, please choose another video.</div> }
        { !isReady &&
          <div>
            preparing the caption.<br />
            { isPending && 'it may take a minute or two, check other videos. 😉' }
          </div>
        }
        { isReady && captions && <>
          <SentenceWrapper>
            <SentenceSection status={MainButtonStatus} captions={captions} ref={listRef} onReplayClick={handleVideoMove} />
          </SentenceWrapper>
        </> }
      </Application>
      <ButtonWrapper>
        <MainButton status={MainButtonStatus} disabled={!isReady} onClick={handleClickMainButton}>
          { !isReady && <Loader size="24" />  }
          { (isReady && MainButtonStatus === 'clickToPlay')   && <Play size="24" /> }
          { (isReady && MainButtonStatus === 'clickToReplay') && <Reset size="24" /> }
          { (isReady && MainButtonStatus === 'clickToSave')   && <Plus size="24" /> }
          { (isReady && MainButtonStatus === 'clickToPause')  && <Pause size="24" /> }
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
  position: relative;
`
const PauseMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const SentenceWrapper = styled.div`
  position: relative;
  padding-bottom: 120px;
`


const ButtonWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 120px;
  left: 0;
  width: 100%;
  height: 0;
  max-width: 100%;
  z-index: 2;
`

const rotationAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`

const bounceAnimation = keyframes`
  0% { transform: scale(1) }
  30% { transform: scale(0.9) }
  80% { transform: scale(0.9) }
  90% { transform: scale(1.1) }
  100% { transform: scale(1.1) }
`

const MainButton = styled(PrimaryButton)`
  margin: 0 auto;
  &:disabled svg {
    animation: ${rotationAnimation} 3s linear infinite;
  }
  ${({ status }) => status === 'clickToPlay' && css`
    animation: ${bounceAnimation} 1s ease infinite;
  `}
`

const PlayerToggleButton = styled(ToggleButton)`
  margin-right: 4px;
  padding: 2px 4px;
  color: ${color.white.normal};
`

export default PlayerSection;
