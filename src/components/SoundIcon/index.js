import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import { color } from '../../constant/color';

const SoundIcon = ({ status='', ...props }) => {
  return (
    <Root status={status} {...props}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </Root>
  )
}

const animations = [];
for (let i = 0; i < 5; i++) {
  animations.push(keyframes`
    from { transform: scaleY(${Math.random()/2}); background: hsla(210, 80%, 70%, 1);}
    to { transform: scaleY(1); background: hsla(190, 100%, 60%, 1);}
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
    ${'' /* background: ${color.middle}; */}
    ${animations.map((animation, i) => (
      css`
        &:nth-child(${i+1}) {
          animation: ${animation} ${0.3 + Math.random()*0.3}s linear infinite alternate;
        }
      `
    ))}
  }
`


export default SoundIcon;