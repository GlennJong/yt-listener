import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { color } from '../../constant/color';
import { useDispatch, useSelector } from 'react-redux';
import guideStatus from '../../store/guideStatus';

const HowToUseBoard = () => {
  const { show } = useSelector(state => state.guideStatus);
  const dispatch = useDispatch(guideStatus)

  const [ hide, setHide ] = useState(!show);
  const [ moveOut, setMoveOut ] = useState(false);

  function handleClickButton() {
    setMoveOut(true);
    setTimeout(() => {
      setHide(true);
      dispatch(guideStatus.actions.hideGuide());
    }, 1000);
  }

  return (
    <>
      {
        !hide &&
        <Root moveOut={moveOut}>
          <Content moveOut={moveOut}>
            <Title>How to use</Title>
            <PlayerWrapper>
              <Player>
                <iframe id="ytplayer" type="text/html" width="640" height="360"
                  src="https://www.youtube.com/embed/iKp43tXsKmc?autoplay=1"
                  frameborder="0" />
              </Player>
            </PlayerWrapper>
            <Button onClick={handleClickButton}>Got it</Button>
          </Content>
        </Root>
      }
    </>
  )
}


const bounceAnimation = keyframes`
  0% { transform: scale(1) }
  30% { transform: scale(0.9) }
  80% { transform: scale(0.9) }
  90% { transform: scale(1.1) }
  100% { transform: scale(1.1) }
`

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  transition: all .3s ease .6s;
  ${({ moveOut }) => moveOut && css`
    opacity: 0;
  `}
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${color.black.dark};
    opacity: 0.5;
    z-index: -1;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 24px;
  width: 90%;
  background: ${color.black.light};
  box-sizing: border-box;
  transition: all .6s cubic-bezier(.67,-0.51,.35,1);
  ${({ moveOut }) => moveOut && css`
    transform: translateY(100%);
    opacity: 0;
  `}
  > .icon {
    animation: ${bounceAnimation} 1s ease infinite;
  }
`

const Title = styled.div`
  margin-bottom: 12px;
  color: ${color.white.normal};
  font-size: 24px;
  font-weight: 600;
`

const PlayerWrapper = styled.div`
  width: 90%;
`
const Player = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 200%;
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100% !important;
    height: 100% !important;
  }
`

const Button = styled.button`
  margin-top: 24px;
  border: 0;
  border-radius: 6px;
  padding: 10px 16px;
  background: ${color.primary};
  color: ${color.white.normal};
  font-weight: 600;
  font-size: 16px;
`

export default HowToUseBoard;