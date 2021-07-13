
import React from 'react';
import styled from 'styled-components';
import { Confused } from '@styled-icons/boxicons-regular';
import { color } from '../../constant/color';


const EmptyHint = ({ ...props }) => {
  
  return (
    <Root {...props}>
      <Confused size={72} />
      <Title>Oops! there is nothing for listening.</Title>
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  border: 0;
  svg {
    margin-top: -120px;
    color: ${color.gray.normal};
  }
`

const Title = styled.p`
  color: ${color.gray.normal};
  font-size: 13px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
`
export default EmptyHint;
