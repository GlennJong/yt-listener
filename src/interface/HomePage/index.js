import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import videoData from '../../store/videoData';
import InputerSection from './InputerSection'
import VideoItem from '../../components/VideoItem';
import { color } from '../../constant/color';

const HomePage = ({ currentPage, onIdReady }) => {
  const dispatch = useDispatch(videoData);
  const { id: currentId, history, search } = useSelector(state => state.videoData);
  
  function handleGetVideoData(data) {
    dispatch(videoData.actions.updateSearchResult(data));
  }

  function addVideoToHistoryList(id) {
    const currentHistory = [...history];
    if (currentHistory.findIndex(video => video === id) === -1) {
      currentHistory.push(id);
      const reduceHistory = currentHistory.slice(currentHistory.length-4, currentHistory.length);
      dispatch(videoData.actions.updateVideoHistory(reduceHistory));
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

    // add to history
    addVideoToHistoryList(id);
  }

  function orderDataByLatest(data) {
    const currentData = [...data];
    const reverseData = currentData.reverse();
    return reverseData;
  }

  
  return (
    <>
    {
      currentPage === 'home' &&
      <Root>
        <HeadingTools>
          <InputerSection onResult={handleGetVideoData} />
        </HeadingTools>
        { search &&
          <SearchSection key={search}>
            <Title>搜尋結果</Title>
            { search.length === 0 &&
              <NotFound>
                找不到影片，請嘗試其他關鍵字。<br />
                或直接貼上影片連結。
              </NotFound>
            }
            <List>
              { search?.map((item, i) =>
                <li key={i}><VideoItem id={item} onClick={applyVideoData} /></li>
              ) }
            </List>
          </SearchSection>
        }
        { (history && history.length !== 0) &&
          <HistorySection>
            <Title>觀看紀錄</Title>
            <List>
              { orderDataByLatest(history)?.map((item, i) =>
                <li key={i}><VideoItem id={item} onClick={applyVideoData} /></li>
              ) }
            </List>
          </HistorySection>
        }
      </Root>
    }
    </>
  )
}

const Root = styled.div`
  position: relative;
  padding: 16px;
  padding-top: 0;
  padding-bottom: 120px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`

const HeadingTools = styled.div`
  margin: 0 -16px;
`

const HistorySection = styled.div`
  padding-top: 48px;
`

const SearchSection = styled.div`
  padding-top: 48px;
`

const List = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  li + li {
    margin-bottom: 12px
  }
`
const Title = styled.div`
  margin-bottom: 12px;
  color: ${color.white.normal};
  font-size: 18px;
`
const NotFound = styled.div`
  margin-bottom: 12px;
  color: ${color.gray.normal};
  font-size: 14px;
`
export default HomePage;
