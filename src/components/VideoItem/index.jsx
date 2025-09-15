import React from 'react';
import styled, {keyframes} from 'styled-components';
import { color } from '../../constant/color';
import { useYoutubeIFrameApi } from '../../utils/useYoutubeIFrameApi';
import { Loader } from '@styled-icons/boxicons-regular';

const VideoItem = ({id, onClick, ...props}) => {
  const data = useYoutubeIFrameApi(id);

  function handleClickVideoItem() {
    onClick(id);
  }
  
  return (
    <>{
      data ?
      <Root {...props} onClick={handleClickVideoItem}>
        <img src={data.cover} alt="" />
        <div className="title">{data.title}</div>
      </Root>
      :
      <PlaceHolder><Loader size={24} /></PlaceHolder>
    }</>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  height: 90px;
  img {
    display: block;
    max-width: 120px;
    width: 50%;
    height: auto;
  }
  .title {
    margin-left: 12px;
    color: ${color.white.normal};
  }
`


const rotationAnimation = keyframes`
  from { transform: rotate(0deg) }
  to { transform: rotate(360deg) }
`

const PlaceHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  svg {
    color: ${color.white.normal};
    animation: ${rotationAnimation} 3s linear infinite;
  }
`

export default VideoItem;