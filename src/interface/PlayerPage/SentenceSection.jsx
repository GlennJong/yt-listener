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

    captions.forEach(caption => {
      const start = Number(caption.start);
      const end =  start + Number(caption.dur);
      if (sec > start) {
        content = { 
          start: start,
          end: end,
          content: caption.content,
          spot: sec,
          timestamp: new Date()
        };
      }
      else if (sec > end) {
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

    dispatch(wordLibrary.actions.addItemToCurrentData(item));
  }

  function handleRemoveWordData(word, full) {
    const item = {
      origin: full,
      content: word,
    };

    dispatch(wordLibrary.actions.removeItemFromCurrentData(item));
  }


  
  return (
    <Root>
    
      { sentenceData.length === 0 &&
        <Hint>
          { status === 'clickToReplay' && <span>Press ↺ to replay again 🤔</span> }
          { status === 'clickToSave' && <span>Great! Press <img src="/images/icon-add.svg" alt="" /> to add first sentence 🎉</span> }
          { status === 'clickToPlay' && <span>Hi! Press <img src="/images/icon-play.svg" alt="" /> to start your listening 👍</span>}
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
  span, img {
    display: inline-block;
    vertical-align: middle;
  }
  img {
    margin-bottom: 2px;
  }
`

const List = styled.ul`
  
`


export default SentenceSection;