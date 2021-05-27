import React, { useState, useRef } from 'react';
import styled, {css} from 'styled-components';
import { useDispatch } from 'react-redux';
import wordLibrary from '../../store/wordLibrary';
import { color } from '../../constant/color';

const WordSection = ({ data }) => {
  const NoteRef = useRef(null);
  const dispatch = useDispatch(wordLibrary);

  const [ active, setActive ] = useState(false);
  
  function handleFocusNote() {
    setActive(true);
  }
  
  function handleSaveNote() {
    setActive(false);
    const note = NoteRef.current.value;
    const item = {...data, note: note};
    dispatch(wordLibrary.actions.updateItemToLibrary(item));
  }
  
  return (
    <Root>
      <Word>{ data.content }</Word>
      <Note active={active} ref={NoteRef} type="text" onFocus={handleFocusNote} defaultValue={data.note} />
      {active && <CheckMask onClick={handleSaveNote} />}
    </Root>
  )
};

const Root = styled.div`
  display: flex;
  margin-bottom: 12px;
`

const Word = styled.p`
  display: block;
  min-width: 35%;
`

const CheckMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`

const Note = styled.input`
  position: relative;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid ${color.gray.normal};
  padding: 2px 4px;
  background: ${color.black.normal};
  z-index: 0;
  color: ${color.white.normal};
  &:focus {
    outline: none;
  }
  ${({ active }) => active && css`
    background: ${color.white.normal};
    color: ${color.black.normal};
    z-index: 2;
  `}
`


export default WordSection;