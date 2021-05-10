import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { RightArrow } from '@styled-icons/boxicons-regular';
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
    const target = e.currentTarget;
    target.classList.contains('active') ?
    target.classList.remove('active')
    :
    target.classList.add('active')
  }
  
  return (
    <Root {...props}>
      <PlayButton data-sec={data.start} onClick={onClick}>
        <RightArrow size={16} />
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
  border-radius: 50%;
  border: 0;
  padding: 0;
  width: 40px;
  height: 40px;
  background: ${color.middle};
  color: ${color.dark};
`

const Sentence = styled.div`

`

const WordButton = styled.button`
  position: relative;
  border: 0;
  background: transparent;
  padding: 3px 0px;
  cursor: pointer;
  color: ${color.white};
  transition: transform .15s cubic-bezier(.69,-0.39,.39,2.06);
  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: -4px;
    border-radius: 4px;
    width: calc(100% + 8px);
    height: 100%;
    box-shadow: 2px 2px 3px hsla(0, 0%, 0%, .5);
    background: ${color.darken};
    opacity: 0;
    z-index: -1;
  }
  &.active {
    color: #FFF;
    transform: scale(1.05);
    z-index: 1;
    &:before { opacity: 1; }
  }
`

export default Item;