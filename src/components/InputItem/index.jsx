import React, { useState, useRef } from 'react';
import styled, {css} from 'styled-components';
import { color } from '../../constant/color';
import { Check } from '@styled-icons/boxicons-regular';

const InputItem = ({ label, disabled, value, type="text", frame='bottom', onUpdate }) => {
  const inputerRef = useRef(null);
  const [ active, setActive ] = useState(false);
  
  function handleFocusInputer() {
    setActive(true);
  }
  
  function handleSaveInputer() {
    setActive(false);
    const value = inputerRef.current.value;
    onUpdate(value);
  }
  return (
    <Root>
      <Label>{ label }</Label>
      <Wrap>
        <Inputer disabled={disabled} frame={frame} active={active} ref={inputerRef} type={type} onFocus={handleFocusInputer} defaultValue={value} />
        { active &&
          <CheckButton onClick={handleSaveInputer} ><Check size="16" /></CheckButton>
        }
        { active && <CheckMask onClick={handleSaveInputer} /> }
      </Wrap>
    </Root>
  )
};

const Root = styled.div`
`

const Label = styled.div`
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 12px;
  color: ${color.white.normal};
`

const Wrap = styled.div`
  display: flex;
  margin-bottom: 12px;
`

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 0 6px;
  border-radius: 2px;
  margin-left: 6px;
  color: ${color.white.normal};
  background: ${color.primary};
  z-index: 3;
`
const CheckButton = styled(Button)`
  background: ${color.primary};
`

const CheckMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const Inputer = styled.input`
  position: relative;
  border: 0;
  border-radius: 0;
  ${({ frame }) => frame === 'bottom' && css`
    border-bottom: 1px solid ${color.gray.normal};
  `}
  ${({ frame }) => frame === 'full' && css`
    border: 1px solid ${color.gray.normal};
  `}
  padding: 2px 4px;
  background: transparent;
  width: 85%;
  z-index: 0;
  color: ${color.white.normal};
  &:focus {
    outline: none;
  }
  ${({ active }) => active && css`
    background: ${color.white.normal};
    color: ${color.black.normal};
    z-index: 3;
  `}
  ${({ disabled }) => disabled && css`
    color: ${color.gray.normal};
  `}
`


export default InputItem;