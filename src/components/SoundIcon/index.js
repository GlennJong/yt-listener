import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { color } from '../../constant/color';

const SoundIcon = ({ status, ...props }) => {
  return (
    <Root play={status} {...props}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </Root>
  )
}

const playAnimations = [];
for (let i = 0; i < 5; i++) {
  playAnimations.push(keyframes`
    from { transform: scaleY(${Math.random()/2}); background: hsla(210, 80%, 70%, 1);}
    to { transform: scaleY(1); background: hsla(190, 100%, 60%, 1);}
  `)
}

const pauseAnimations = [];
for (let i = 0; i < 5; i++) {
  pauseAnimations.push(keyframes`
    from { transform: scaleY(${Math.random()/2}); background: ${color.primary};}
    to { transform: scaleY(0.33); background: ${color.primary};}
  `)
}


const Root = styled.div`
  span {
    display: inline-block;
    vertical-align: middle;
    margin: 0 1px;
    margin-top: -2px;
    width: 1px;
    height: 10px;
    ${({play}) => {
      const animations = play ? playAnimations : pauseAnimations;
      return animations.map((animation, i) => (
        css` &:nth-child(${i+1}) {
          animation: ${animation} ${0.3 + Math.random()*0.3}s linear infinite alternate;
        }`
      ))
    }
  }
`


export default SoundIcon;