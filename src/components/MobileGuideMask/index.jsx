import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { color, gradient } from '../../constant/color';
import { Mobile } from '@styled-icons/boxicons-regular';

const MobileGuideMask = () => {
  const [ show, setShow ] = useState(false);

  useEffect(() => {
    handleDetectDevice();
    window.addEventListener('resize', handleDetectDevice);
  }, [])

  function handleDetectDevice() {
    const isDesktop = window.innerWidth > 1025;
    setShow(isDesktop);
  }

  return (
    <Root show={show}>
      <Content>
        <Mobile className="icon" color={color.white.normal} size={48} />
        <Title>請使用手機裝置體驗</Title>
      </Content>
    </Root>
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
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: ${gradient.background};
  z-index: 99;
  ${({show}) => show && css`display: flex`};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 500px;
  min-height: 200px;
  background: ${color.black.light};
  box-sizing: border-box;
  > .icon {
    animation: ${bounceAnimation} 1s ease infinite;
  }
`

const Title = styled.div`
  margin-top: 12px;
  color: ${color.white.normal};
  font-size: 18px;
`

export default MobileGuideMask;