import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WordItem from './WordItem';

const WordList = forwardRef(({ captions, onItemClick }, ref) => {
  const [data, setData] = useState([]);
  const dataRef = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current = {
        addItemBySec: handleAddItem
      }
    }
  }, []);

  useEffect(() => {
    if (dataRef) {
      dataRef.current = data;
    }
  }, [data])
  
  function handleAddItem(sec) {
    const caption = handleGetCurrentCaption(sec);
    const currentData = [...dataRef.current];
    currentData.push(caption);
    setData(currentData);
  }

  function handleGetCurrentCaption(sec) {
    let content;
    const blurSec = sec - 0.5;
    captions.forEach(caption => {
      const start = Number(caption.start);
      const end =  start + Number(caption.dur);
      if (blurSec > start && blurSec <= end) {
        content = { 
          start: start,
          end: end,
          content: caption.content,
          spot: blurSec,
          timestamp: new Date()
        };
        return;
      }
    });
    return content;
  }
  
  return (
    <Root>
      { data.length === 0 &&
        <Hint>尚未紀錄句子</Hint>
      }
      <List>
        { data?.map((item, i) =>
          <WordItem onClick={onItemClick} key={i} data={item} />
        ) }
      </List>
    </Root>
  )
})

const Root = styled.div`
  
`

const Hint = styled.div`

`

const List = styled.ul`
  
`


export default WordList;