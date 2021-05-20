import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Play } from '@styled-icons/boxicons-regular';
import ToggleButton from '../../components/ToggleButton';
import { color, gradient } from '../../constant/color';

const Item = ({ data, onClick, ...props}) => {

  function getSplitSentence(str) {
    const splitSentence = str.split(/(\s+)(\w+)/g);
    const result = splitSentence.map(item => {
      if (item.match(/\w+/)) {
        return { type: 'button', content: item }
      }
      else {
        return item;
      }
    })

    return result;
  }

  function handleClickToMarkWord(e) {
  }
  
  return (
    <Root {...props}>
      <PlayButton data-sec={data.start} onClick={onClick}>
        <Play size={16} />
      </PlayButton>
      <Sentence>
        {
          getSplitSentence(data.content).map((item, i) =>
            item.type === 'button' ?
            <WordButton data-word={item.content} key={i} onClick={handleClickToMarkWord}>{ item.content }</WordButton>
            :
            <span key={i}>{ item }</span>
          )
        }
      </Sentence>
    </Root>
  )
}

const Root = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 12px;
`

const PlayButton = styled.button`
  margin-right: 12px;
  border: 2px solid ${color.middle};
  border-radius: 50%;
  padding: 0;
  width: 24px;
  height: 24px;
  background: transparent;
  color: ${color.white.normal};
  svg {
    margin-top: -2px;
  }
`

const Sentence = styled.div`
  width: calc(100% - 36px);
`

const WordButton = styled(ToggleButton)`
  margin-left: -1px;
  margin-right: -1px;
  color: ${color.pureWhite};
`

export default Item;