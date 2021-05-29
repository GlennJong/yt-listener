import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { color } from '../../constant/color';
import wordLibrary from '../../store/wordLibrary';
import SentenceItem from './SentenceItem';

const SentenceSection = forwardRef(({ captions, status, onReplayClick }, ref) => {
  const [sentenceData, setSentenceData] = useState([]);
  const sentenceDataRef = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current = {
        addItemBySec: handleAddItem
      }
    }
  }, []);

  useEffect(() => {
    if (sentenceDataRef) {
      sentenceDataRef.current = sentenceData;
    }
  }, [sentenceData])
  
  function handleAddItem(sec) {
    const caption = handleGetCurrentCaption(sec);
    const currentData = [...sentenceDataRef.current];

    // prevent input same sentence in short time.
    if (caption && (caption?.content !== currentData[currentData.length-1]?.content)) {
      currentData.push(caption);
      setSentenceData(currentData);
    }
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

  function handleClickWordButton({status, word, origin}) {
    if (status === 'add') {
      handleAddWordData(word, origin);
    }
    else if (status === 'remove') {
      handleRemoveWordData(word, origin);
    }
  }

  // Control Word Library
  const dispatch = useDispatch(wordLibrary);
  
  function handleAddWordData(word, origin) {
    const item = {
      origin: origin,
      content: word,
      timestamp: new Date(),
    };

    dispatch(wordLibrary.actions.addItemToLibrary(item));
  }

  function handleRemoveWordData(word, full) {
    const item = {
      origin: full,
      content: word,
    };

    dispatch(wordLibrary.actions.removeItemFromLibrary(item));
  }


  
  return (
    <Root>
      { sentenceData.length === 0 &&
        <Hint>
          { status === 'clickToReplay' && 'Really? Press ↺ to replay again 🤔'}
          { status === 'clickToSave' && 'Great! Press ＋ to add first sentence 🎉'}
          { status === 'clickToPlay' && 'Hi! Press ▸ to start your listening 👍'}
        </Hint>
      }
      <List>
        { sentenceData?.map((data, i) =>
          <SentenceItem onReplayClick={onReplayClick}
            onWordClick={handleClickWordButton} key={i} data={data} />
        ) }
      </List>
    </Root>
  )
})

const Root = styled.div`
  border-radius: 4px;
  padding: 16px 12px;
  background: ${color.black.light};
  box-sizing: border-box;
  
`

const Hint = styled.div`

`

const List = styled.ul`
  
`


export default SentenceSection;