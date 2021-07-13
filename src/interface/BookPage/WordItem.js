import React, { useState, useRef } from 'react';
import styled, {css} from 'styled-components';
import { color } from '../../constant/color';
import { handleGetTranslate } from '../../utils/useTranslateGetter';
import { Check } from '@styled-icons/boxicons-regular';
import { Cool } from '@styled-icons/boxicons-solid';

const WordItem = ({ advance=false, data, onUpdate }) => {
  const NoteRef = useRef(null);

  const [ active, setActive ] = useState(false);
  const [ check, setCheck ] = useState(false);
  const [ isTranslating, setIsTranslating ] = useState(false);
  
  function handleFocusNote() {
    setActive(true);
    setIsTranslating(false);
  }
  
  function handleSaveNote() {
    setActive(false);
    const note = NoteRef.current.value;
    const item = {...data, note: note};
    onUpdate(item);
  }

  function handleClickTranslateButton(e) {
    const { word } = e.currentTarget.dataset;
    setIsTranslating(true);
    (async function() {
      try {
        const content = await handleGetTranslate(word);
        NoteRef.current.value = content[0].translations[0].text;
        setIsTranslating(false);
        setActive(false);
        handleSaveNote();
      }
      catch (err) { alert('translate false'); }
    })()
  }

  function handleClickCheckButton() {
    setCheck(true);
    const note = NoteRef.current.value;
    const item = {...data, note: note, check: true};
    setTimeout(() => onUpdate(item), 1000);
  }

  return (
    <Root>
      <Word>{ data.content }</Word>
      <Note active={active} ref={NoteRef} type="text" onFocus={handleFocusNote} defaultValue={data.note} />
      { active &&
        <Button disabled={isTranslating} data-word={data.content} onClick={handleClickTranslateButton} >中</Button>
      }
      {
        (advance && !active) &&
        <CheckButton disabled={check} check={check} onClick={handleClickCheckButton} >
          { !check && <Check size="16" /> }
          { check && <Cool size="16" /> }
        </CheckButton>
      }
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
  margin-left: 6px;
  color: ${color.white.normal};
  background: ${color.primary};
  z-index: 3;
`
const CheckButton = styled(Button)`
  background: ${color.black.normal};
  ${({check}) => check && css`
    background: ${color.black.normal};
  `}
`

const CheckMask = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`

const Note = styled.input`
  position: relative;
  border: 0;
  border-radius: 0;
  border-bottom: 1px solid ${color.gray.normal};
  padding: 2px 4px;
  background: transparent;
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
`


export default WordItem;