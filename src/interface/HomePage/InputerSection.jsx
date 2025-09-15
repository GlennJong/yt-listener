import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { color } from '../../constant/color';
import { Search } from '@styled-icons/boxicons-regular';
import PrimaryButton from '../../components/PrimaryButton';
import { checkYoutubeCaptionAvailiable } from '../../utils/useCaptionGetter';
import { useSelector } from 'react-redux';

const InputerSection = ({ onResult }) => {
  const inputRef = useRef(null);
  const { youtubeKey } = useSelector(state => state.configData);
  const [ message, setMessage ] = useState(null);
  const [ active, setActive ] = useState(false);

  // Input content checker
  function handleCheckInputAvailiable() {
    const value = inputRef.current.value;

    if (checkYoutubeType(value)) {
      handleCheckUrlAvailiable(value);
    }
    else {
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
  
  function handleCheckUrlAvailiable(url) {
    if (url.length === 0) {
      setActive(false);
      setMessage(null);
    }
    else {
      let video_id = (url.split('v=')[1] || url.split('youtu.be/')[1]) || null;
      
      if (video_id && video_id.length >= 11) {
        const ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
          video_id = video_id.substring(0, ampersandPosition);
        }
        
        handleCheckCaption(video_id);
      }
      else {
        setMessage('Hmm... 請輸入正確的影片網址 😮')
        setActive(false);
      }
    }
  }

  function handleCheckCaption(id) {
    checkYoutubeCaptionAvailiable(id).then(res => {
      if (res === false) {
        setMessage('Oops! 這支影片沒有提供可用字幕 😓')
        setActive(false);
      }
      else {
        setMessage(null);
        setActive(true);
      }
    });
  }


  async function handleClickSearch() {
    const value = inputRef.current.value;

    if (checkYoutubeType(value)) {
      const videoId = getVideoId(value);
      onResult([videoId])
    }
    else {
      const results = await searchByKeyword(value);
      onResult(results)
    }
  }
  
  async function searchByKeyword(value) {
    let keyword = value.replace(/\s/, '+');
    return new Promise((resolve) => {
      axios.get(`https://www.googleapis.com/youtube/v3/search?q=${keyword}&key=${youtubeKey}&maxResults=10`)
      .then(res => {
        filterVideoHasCaption(res.data.items).then(res => resolve(res));
        setMessage(null)
      })
      .catch(_ => setMessage('Oops！請檢查 Youtube Key 是否正確'))
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
  

  function filterVideoHasCaption(data) {
    const currentData = [];
    let count = 0;
    let max = 5;
    return new Promise((resolve) => {

      data.forEach(item => {
        checkYoutubeCaptionAvailiable(item?.id?.videoId).then(res => {
          count += 1;
          res && currentData.push(item.id.videoId);
          if (count === data.length) resolve(currentData);
        });
      })
    })
  }

  
  return (
    <Root>
      <InputWrap>
        <Input ref={inputRef}
          onChange={handleCheckInputAvailiable}
          type="text"
          placeholder="貼上 Youtube 影片網址或輸入關鍵字" />
        { message && <Msg><p>{ message }</p></Msg> }
      </InputWrap>
      <ButtonWrap active={active}>
        <Button disabled={!active} onClick={handleClickSearch}><Search size="24" /></Button>
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