import { useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import axios from 'axios';
import { color } from '../../constant/color';
import { Loader, Search } from '@styled-icons/boxicons-regular';
import PrimaryButton from '../../components/PrimaryButton';
import { useSelector } from 'react-redux';
import { getMockFetchData } from '../../mock';

const isDemo = import.meta.env.VITE_IS_DEMO;

const InputerSection = ({ onResult }) => {
  const inputRef = useRef(null);
  const { youtubeKey } = useSelector(state => state.configData);
  const [ message, setMessage ] = useState(null);
  const [ isFetching, setIsFetching ] = useState(false);
  const [ active, setActive ] = useState(false);

  // Input content checker
  function handleCheckInputAvailiable() {
    const value = inputRef.current.value;

    if (!isDemo) {
      handleCheckKeywordAvailiable(value);
    }
  }

  function handleCheckKeywordAvailiable(keyword) {
    setMessage(null);

    if (youtubeKey) {
      if (keyword && active === false) {
        setActive(true);
      }
      if (keyword === '' && active === true) {
        setActive(false);
      }
    }
    else {
      setMessage('Oops！請檢查 Youtube Key 是否正確')
    }

  }

  function checkYoutubeType(url) {
    let result = false;
    
    if (url.indexOf('https://') !== -1) result = true;
    if (url.indexOf('http://') !== -1) result = true;

    return result;
  }

  async function handleClickSearch() {
    const value = inputRef.current.value;

    if (checkYoutubeType(value)) {
      const videoId = getVideoId(value);
      onResult([videoId])
    }
    else {
      setIsFetching(true);
      const searchResult = isDemo ?
        await getMockFetchData('search', 3000)
        : 
        await searchByKeyword(value);

      const result = searchResult.map(item => {
        return ({
          id: item.id.videoId,
          cover: item.snippet.thumbnails.medium.url,
          title: item.snippet.title,
          description: item.snippet.description
        })
      }).filter(item => item);
      
      
      onResult(result);
      setIsFetching(false);
    }
  }
  
  async function searchByKeyword(value) {
    let keyword = value.replace(/\s/, '+');
    return new Promise((resolve) => {
      const url = `https://www.googleapis.com/youtube/v3/search` +
        `?q=${keyword}` +
        `&key=${youtubeKey}` +
        `&part=snippet` +
        `&videoCaption=closedCaption` +
        `&videoSyndicated=true` +
        `&relevanceLanguage=en` +
        `&maxResults=20` +
        `&type=video`;
      axios.get(url)
      .then(res => {
        resolve(res.data.items);
        setMessage(null)
      })
      .catch((err) => {
        console.err(err);
        setMessage('Oops！請檢查 Youtube Key 是否正確');
      })
    })
  }

  function getVideoId(url) {
    let videoId = url.split('v=')[1] || url.split('youtu.be/')[1];
    const ampersandPosition = videoId.indexOf('&');
    
    if (ampersandPosition != -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    
    return videoId;
  }
  
  return (
    <Root>
      <InputWrap>
        <Input ref={inputRef}
          onChange={handleCheckInputAvailiable}
          type="text"
          placeholder="輸入關鍵字" />
        { message && <Msg><p>{ message }</p></Msg> }
      </InputWrap>
      <ButtonWrap active={active}>
        <Button disabled={!active || isFetching} onClick={handleClickSearch}>
          { isFetching ?
            <RotationAnimation>
              <Loader size="24" />
            </RotationAnimation>
            :
            <Search size="24" />
          }
        </Button>
      </ButtonWrap>
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  padding: 24px;
  padding-top: 32px;
  padding-bottom: 72px;
  width: 100%;
  background: ${color.black.light};
  box-sizing: border-box;
`

const InputWrap = styled.div`
  position: relative;
`

const Msg = styled.div`
  position: absolute;
  top: calc(100% + 12px);
  width: 100%;
  text-align: center;
  > p {
    position: relative;
    display: inline-block;
    border-radius: 4px;
    padding: 6px 12px 8px;
    color: ${color.white.normal};
    background: ${color.primary};
    &:before {
      content: "";
      position: absolute;
      bottom: 99%;
      left: 50%;
      width: 0;
      height: 0; 
      border-bottom: 6px solid ${color.primary};
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      transform: translateX(-50%);
    }

  }
`

const rotationAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`

const RotationAnimation = styled.div`
  svg {
    animation: ${rotationAnimation} 3s linear infinite;
  }
`

const Input = styled.input`
  width: 100%;
  border: 0;
  padding: 12px;
  background: ${color.black.dark};
  color: ${color.white.normal};
  box-sizing: border-box;
`

const ButtonWrap = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  transform: scale(0.5);
  transition: transform .3s cubic-bezier(.59,.01,.59,2.04);
  ${({ active }) => active && css`
    transform: scale(1);
  `}
`
const Button = styled(PrimaryButton)`
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translate(-50%, -50%);
`

export default InputerSection;