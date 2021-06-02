import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import videoId from '../../store/videoId';
import InputerSection from './InputerSection'
import RecommandSection from './RecommandSection'

const HomePage = ({ currentPage, onIdReady }) => {
  const dispatch = useDispatch(videoId);
  const { id: currentId } = useSelector(state => state.videoId);

  function handleGetUrl(url) {
    let video_id = url.split('v=')[1] || url.split('youtu.be/')[1];
    if (video_id) {
      const ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }

      applyVideoId(video_id);
    }
    else {
      alert('wrong youtube link')
    }
  }

  function applyVideoId(id) {
    if (currentId === id) {
      onIdReady();
    }
    else {
      dispatch(videoId.actions.clearVideoId());
      setTimeout(() => {
        dispatch(videoId.actions.updateVideoId(id));
        onIdReady();
      }, 300);
    }
  }
  
  return (
    <>
    {
      currentPage === 'home' &&
      <Root>
        <InputerSection onGetUrl={handleGetUrl} />
        <RecommandSection />
      </Root>
    }
    </>
  )
}

const Root = styled.div`
  position: relative;
  padding: 16px;
  padding-top: 36px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  ${'' /* color: ${color.white.normal}; */}
  ${'' /* background: ${color.black.normal}; */}
`

export default HomePage;
