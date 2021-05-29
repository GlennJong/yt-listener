import React, { useState, useRef } from 'react';
import styled, {css} from 'styled-components';
import { useDispatch } from 'react-redux';
import wordLibrary from '../../store/wordLibrary';
import { color } from '../../constant/color';
import { BookBookmark } from '@styled-icons/boxicons-regular';
import { handleGetTranslate } from '../../utils/useTranslateGetter';

const WordSection = ({ data }) => {
  const NoteRef = useRef(null);
  const dispatch = useDispatch(wordLibrary);

  const [ active, setActive ] = useState(false);
  const [ isTranslated, setIsTranslated ] = useState(false);
  
  function handleFocusNote() {
    setActive(true);
    setIsTranslated(false);
  }
  
  function handleSaveNote() {
    setActive(false);
    const note = NoteRef.current.value;
    const item = {...data, note: note};
    dispatch(wordLibrary.actions.updateItemToLibrary(item));
  }

  function handleClickTranslateButton(e) {
    const { word } = e.currentTarget.dataset;
    (async function() {
      try {
        const content = await handleGetTranslate(word);
        NoteRef.current.value = content[0].translations[0].text;
        setIsTranslated(true);
      }
      catch (err) { alert('translate false'); }
    })()
  }
  
  return (
    <Root>
      <Word>{ data.content }</Word>
      <Note active={active} ref={NoteRef} type="text" onFocus={handleFocusNote} defaultValue={data.note} />
      { (active && !isTranslated) && <Button><BookBookmark data-word={data.content} onClick={handleClickTranslateButton} size="14" /></Button> }
      { active && <CheckMask onClick={handleSaveNote} /> }
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

const Button = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 0 6px;
  border-radius: 2px;
  margin-left: 4px;
  color: ${color.white.normal};
  background: ${color.primary};
  z-index: 2;
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