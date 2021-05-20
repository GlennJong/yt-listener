
import React from 'react';
import styled from 'styled-components';
import SoundIcon from '../../components/SoundIcon'

const PlayerTitle = ({ title }) => {
  
  return (
    <Root>
      <SoundIcon className="icon" />
      <Title className="title">{ title }</Title>
    </Root>
  );
}

const Root = styled.div`
  display: block;
  border: 0;
  padding: 6px 0;
  background: transparent;
  > .icon, > .title {
    display: inline-block;
    vertical-align: middle;
  }
  > .icon {
    margin-right: 6px;
  }
`

const Title = styled.p`
  ${'' /* color: ${color.white}; */}
  font-size: 13px;
  font-weight: 600;
`
export default PlayerTitle;
