import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerSection from './PlayerSection';

const PlayerPage = ({ currentPage }) => {

  const {id} = useSelector(state => state.videoId);
  
  return (
    <Page>
      { !id && '尚未添加任何影片' }
      { id && <PlayerSection hide={ currentPage !== 'player' } id={id} /> }
    </Page>
  )
}

const Page = styled.div`
  
`


export default PlayerPage;