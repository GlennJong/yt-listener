import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
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

  function addVideoToHistoryList(video) {
    const { id } = video;
    const currentHistory = [...history];
    if (currentHistory.findIndex(_video => _video.id === id) === -1) {
      currentHistory.push(video);
      let reduceHistory;
      if (currentHistory.length > 10) {
        reduceHistory = currentHistory.slice(currentHistory.length - 10, currentHistory.length);
      } else {
        reduceHistory = currentHistory;
      }
      dispatch(videoData.actions.updateVideoHistory(reduceHistory));
    }
  }

  function applyVideoData(data) {
    if (currentId === data.id) {
      onIdReady();
    }
    else {
      dispatch(videoData.actions.updateVideoId(data.id));
      onIdReady();
    }

    // add to history
    addVideoToHistoryList(data);
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
              { search?.map((item) =>
                <li key={item.id}>
                  <VideoItem
                    id={item.id}
                    cover={item.cover}
                    title={item.title}
                    onClick={() => applyVideoData(item)}
                  />
                </li>
              ) }
            </List>
          </SearchSection>
        }
        { (history && history.length !== 0) &&
          <HistorySection>
            <Title>觀看紀錄</Title>
            <List>
              { orderDataByLatest(history)?.map((item) =>
                <li key={item.id}>
                  <VideoItem
                    id={item.id}
                    cover={item.cover}
                    title={item.title}
                    onClick={() => applyVideoData(item)}
                  />
                </li>
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
