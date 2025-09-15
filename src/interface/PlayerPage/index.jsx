import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import PlayerSection from './PlayerSection';
import EmptyHint from './EmptyHint';

const PlayerPage = ({ currentPage }) => {

  const {id} = useSelector(state => state.videoData);
  
  return (
    <Page>
      { (!id && currentPage === 'player') && <EmptyHint  /> }
      { id && <PlayerSection hide={ currentPage !== 'player' } id={id} /> }
    </Page>
  )
}

const Page = styled.div`
  
`


export default PlayerPage;