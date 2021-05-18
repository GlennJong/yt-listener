import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { color } from '../../constant/color';

const ToggleButton = ({onClick=null, children, ...props}) => {
  const [ active, setActive ] = useState(false);

  function handleClickButton() {
    setActive(!active);
    onClick && onClick();
  }
  
  return (
    <Root active={active} onClick={handleClickButton} {...props}>
      { children }
    </Root>
  )
}

const Root = styled.button`
  position: relative;
  border: 0;
  background: transparent;
  padding: 3px 0px;
  height: 100%;
  cursor: pointer;
  color: ${color.white};
  transition: transform .15s cubic-bezier(.69,-0.39,.39,2.06);
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -4px;
    border-radius: 4px;
    width: calc(100% + 8px);
    height: 100%;
    box-shadow: 2px 2px 3px hsla(0, 0%, 0%, .5);
    background: ${color.darken};
    opacity: 0;
    z-index: -1;
  }
  ${({active}) => active && css`
    color: #FFF;
    transform: scale(1.05);
    z-index: 1;
    &:before { opacity: 1; }
  `}
`

export default ToggleButton;