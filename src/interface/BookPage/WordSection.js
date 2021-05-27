import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import WordItem from './WordItem';
import wordLibrary from '../../store/wordLibrary';
import { color } from '../../constant/color';

const WordSection = () => {
  const { data } = useSelector(state => state.wordLibrary);

  const wordData = useMemo(() => data, [data]);

  // const dispatch = useDispatch(wordLibrary);
  
  // function handleChangeData(word) {
  //   const currentData = [...data];
  //   const index = currentData.findIndex(item => item.timestamp === word.timestamp)
  //   currentData[index] = word;
  //   dispatch(wordLibrary.actions.updateLibrary(currentData));
  // }

  
  return (
    <Root>
      <Head>Vocabulary Notebook</Head>
      <List>
        {
          wordData?.map((item, i) => 
            <Item key={i}><WordItem data={item} /></Item>
          )
        }
      </List>
    </Root>
  )
};

const Root = styled.div`
  padding-top: 40px;
  padding-bottom: 120px;
`

const Head = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  background: ${color.black.normal};
  font-size: 20px;
  font-weight: 600;
  box-shadow: 0px 4px 4px ${color.black.dark};
  box-sizing: border-box;
  z-index: 1;

`
const List = styled.ul`

`
const Item = styled.li`

`


export default WordSection;