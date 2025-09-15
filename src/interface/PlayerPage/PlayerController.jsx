import React, { useRef, useEffect, forwardRef, useState } from 'react';
import styled from 'styled-components';
import { Rewind, FastForward } from '@styled-icons/boxicons-regular';
import { color } from '../../constant/color';

const PlayerController = forwardRef(({ player, onProgress }, ref) => {
  const progressBarRef = useRef(null);
  const progressTouchMoveRef = useRef(null);
  const timerRef = useRef();
  
  useEffect(() => {
    if (ref && player) {
      ref.current = {
        sync: handleSyncPlayTime,
        deSync: handleDeSyncPlayTime,
      };
    }
  }, [ref, player])

  function handleSyncPlayTime() {
    const timer = setInterval(() => {
      // console.log('sync')
      handleUpdateProgress(player.getCurrentTime() / player.getDuration());

      if (player.getCurrentTime() / player.getDuration() >= 0.99) {
        handleDeSyncPlayTime();
      }
    }, 300);

    timerRef.current = timer;
    
    setTimeout(() => onProgress(), 300);
  }

  function handleDeSyncPlayTime() {
    // console.log('clear')
    clearInterval(timerRef.current);
  }

  function handleUpdateProgress(count) {
    const percent = Math.min(Math.max(count, 0), 1);
    progressBarRef.current.style.width = `${percent * 100}%`;
  }

  function handleStartDragProgress() {
    handleDeSyncPlayTime();
  }
  function handleDragProgress(e) {
    const { x: progressOffsetX, width: progressWidth } = e.currentTarget.getBoundingClientRect();
    const { clientX } = e.touches[0];
    progressTouchMoveRef.current = (clientX - progressOffsetX) / progressWidth;
    handleUpdateProgress((clientX - progressOffsetX) / progressWidth);
  }

  function handleApplyProgress() {
    player.seekTo(progressTouchMoveRef.current * player.getDuration());
    handleSyncPlayTime();
  }

  function handleClickRewind() {
    player.seekTo(player.getCurrentTime() - (player.getDuration()/30));
    setTimeout(() => onProgress(), 300);

  }

  function handleClickForward() {
    player.seekTo(player.getCurrentTime() + (player.getDuration()/30));
    setTimeout(() => onProgress(), 300);

  }
  
  return (
    <Root>
      <Button onClick={handleClickRewind}><Rewind size="18" /></Button>
      <Progress 
        onTouchStart={handleStartDragProgress} 
        onTouchMove={handleDragProgress} 
        onTouchEnd={handleApplyProgress}>
        <div ref={progressBarRef} className="bar"></div>
      </Progress>
      <Button onClick={handleClickForward}><FastForward size="18" /></Button>
    </Root>
  )
})

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  padding: 6px 0;
  width: 100%;
`
const Progress = styled.div`
  display: block;
  width: calc(100% - 76px);
  background: ${color.black.light};
  box-sizing: border-box;
  .bar {
    width: 0;
    height: 100%;
    background: ${color.primary};
  }
`
const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 6px 6px;
  width: 30px;
  border-radius: 3px;
  color: ${color.white.normal};
  background: ${color.black.light};
  z-index: 2;
  p {
    transform: scale(0.65);
    font-size: 14px;
  }
`


export default PlayerController;