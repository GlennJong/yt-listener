import styled, {keyframes} from 'styled-components';
import { color } from '../../constant/color';
import { Loader } from '@styled-icons/boxicons-regular';

const VideoItem = ({id, title, cover, onClick, ...props}) => {

  function handleClickVideoItem() {
    onClick();
  }
  
  return (
    <>{
      (cover && id && title) ?
      <Root {...props} onClick={handleClickVideoItem}>
        <img src={cover} alt="" />
        <div className="title">{title}</div>
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