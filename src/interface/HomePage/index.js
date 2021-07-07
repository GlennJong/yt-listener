import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import videoData from '../../store/videoData';
import InputerSection from './InputerSection'
import VideoItem from '../../components/VideoItem';

const HomePage = ({ currentPage, onIdReady }) => {
  const dispatch = useDispatch(videoData);
  const { id: currentId, history } = useSelector(state => state.videoData);

  function handleGetUrl(url) {
    let videoId = url.split('v=')[1] || url.split('youtu.be/')[1];
    if (videoId) {
      const ampersandPosition = videoId.indexOf('&');
      if (ampersandPosition != -1) {
        videoId = videoId.substring(0, ampersandPosition);
      }

      addVideoList(videoId)
    }
    else {
      alert('wrong youtube link')
    }
  }

  function addVideoList(id) {
    const currentHistory = [...history];
    if (currentHistory.findIndex(video => video === id) === -1) {
      currentHistory.push(id);
      dispatch(videoData.actions.updateVideoHistory(currentHistory));
    }
  }

  function applyVideoData(id) {
    if (currentId === id) {
      onIdReady();
    }
    else {
      dispatch(videoData.actions.clearVideoId());
      setTimeout(() => {
        dispatch(videoData.actions.updateVideoId(id));
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
        <HistorySection>
          <List>
            { history?.map((item, i) =>
              <li key={i}><VideoItem id={item} onClick={applyVideoData} /></li>
            ) }
          </List>
        </HistorySection>
      </Root>
    }
    </>
  )
}

const Root = styled.div`
  position: relative;
  padding: 16px;
  padding-top: 148px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  ${'' /* color: ${color.white.normal}; */}
  ${'' /* background: ${color.black.normal}; */}
`
const HistorySection = styled.div`
  padding-top: 12px;
`

const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  li + li {
    margin-bottom: 12px
  }
`


export default HomePage;
