import React, { useState, useMemo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import WordItem from './WordItem';
import wordLibrary from '../../store/wordLibrary';
import { color } from '../../constant/color';
import { Check, BookBookmark } from '@styled-icons/boxicons-regular';

const WordSection = () => {
  const [ isSaved, setIsSaved ] = useState(false);
  const { currentData: data } = useSelector(state => state.wordLibrary);
  const wordData = useMemo(() => data, [data]);

  const dispatch = useDispatch(wordLibrary);

  function handleUpdateWordContent(wordData) {
    dispatch(wordLibrary.actions.updateItemToCurrentData(wordData));
  }

  function handleSaveToLibrary() {
    setIsSaved(true);
    dispatch(wordLibrary.actions.archiveCurrentDataToLibrary());
    
    setTimeout(() => {
      dispatch(wordLibrary.actions.clearCurrentData());
    }, 1000);
  }


  return (
    <Root>
      {
        wordData?.length !== 0 &&
        <WordBox save={isSaved}>
          <Button disabled={isSaved} onClick={handleSaveToLibrary} >
            { isSaved ? <Check size="14" /> : <BookBookmark size="14" /> }
          </Button>
          <List>
            { wordData?.map((item, i) => 
              <Item key={i}>
                <WordItem data={item}
                  onUpdate={handleUpdateWordContent} />
              </Item>
            ) }
          </List>
        </WordBox>
      }
    </Root>
  )
};

const Root = styled.div`
  padding-top: 40px;
  padding-bottom: 120px;
`


const WordBox = styled.div`
  position: relative;
  padding: 24px 12px;
  padding-top: 36px;
  background: ${color.black.light};
  overflow: hidden;
  box-sizing: border-box;
  transition: transform .3s cubic-bezier(.56,-0.93,.39,.99) .5s;
  ${({ save }) => save && css`
    transform: scale(0);
  `}
`
const Button = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  padding: 8px 8px;
  border-radius: 2px;
  width: 30px;
  height: 30px;
  color: ${color.white.normal};
  background: ${color.black.normal};
  transition: all 1s ease;
  &:disabled {
    background: ${color.black.light};
  }
`

const List = styled.ul`

`
const Item = styled.li`

`


export default WordSection;