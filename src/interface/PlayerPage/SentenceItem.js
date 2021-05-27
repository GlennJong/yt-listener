import React from 'react';
import styled from 'styled-components';
import { Play } from '@styled-icons/boxicons-regular';
import ToggleButton from '../../components/ToggleButton';
import { color } from '../../constant/color';

const SentenceItem = ({ data, onReplayClick, onWordClick, ...props}) => {

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

  function handleClickToMarkWord({event, active}) {
    const { word } = event.currentTarget.dataset;
    const status = active ? 'add' : 'remove';
    onWordClick({ word, status, origin: data.content })
  }
  
  return (
    <Root {...props}>
      <PlayButton data-sec={data.start} onClick={onReplayClick}>
        <Play size={14} />
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
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
  border: 2px solid ${color.middle};
  border-radius: 50%;
  padding: 0;
  width: 22px;
  height: 22px;
  background: transparent;
  color: ${color.white.normal};
`

const Sentence = styled.div`
  width: calc(100% - 36px);
`

const WordButton = styled(ToggleButton)`
  margin-left: -1px;
  margin-right: -1px;
  color: ${color.pureWhite};
`

export default SentenceItem;