
import React from 'react';
import styled from 'styled-components';
import SoundIcon from '../../components/SoundIcon'

const PlayerTitle = ({ title, status, onClick, ...props }) => {
  
  return (
    <Root onClick={onClick} {...props}>
      <SoundIcon status={status} className="icon" />
      <Title className="title">{ title }</Title>
    </Root>
  );
}

const Root = styled.div`
  display: block;
  border: 0;
  padding: 6px 0;
  background: transparent;
  white-space: nowrap;
  overflow: hidden;
  > .icon, > .title {
    display: inline-block;
    vertical-align: middle;
  }
  > .icon {
    width: 22px;
    margin-right: 6px;
  }
  > .title {
    width: calc(100% - 28px);
  }
`

const Title = styled.p`
  ${'' /* color: ${color.white}; */}
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
`
export default PlayerTitle;
