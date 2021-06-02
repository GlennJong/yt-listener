import React, { useState, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import WordItem from './WordItem';
import wordLibrary from '../../store/wordLibrary';
import { color } from '../../constant/color';

const WordLibrarySection = () => {
  const { libraryData: data } = useSelector(state => state.wordLibrary);

  console.log(data)

  const collectionData = useMemo(() => data, [data]);

  const dispatch = useDispatch(wordLibrary);

  function handleUpdateWordContent(collectionIndex, wordIndex, wordData) {
    const currentLibrary = JSON.parse(JSON.stringify(collectionData));
    currentLibrary[collectionIndex].words[wordIndex] = wordData;
    
    dispatch(wordLibrary.actions.updateLibraryData(currentLibrary));
  }


  return (
    <Root>
      <Title>My Vocabulary</Title>
      <Wrapper>
        <List>
          { collectionData?.map((collection, i) => 
            <Item key={i}>
              { collection.words.map((word, j) => 
                !word.check &&
                <WordItem key={j} data={word} advance onUpdate={data => handleUpdateWordContent(i, j, data)} /> )
              }
            </Item>
          ) }
        </List>
      </Wrapper>
    </Root>
  )
};

const Root = styled.div`
  padding: 0 36px;
  padding-top: 40px;
  padding-bottom: 160px;
  height: 100%;
  overflow-y: auto;
  background: ${color.black.light};
  box-sizing: border-box;
`

const Title = styled.div`
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 600;
`

const Wrapper = styled.div`
`

const List = styled.ul`

`
const Item = styled.li`

`


export default WordLibrarySection;