import React, { useState } from 'react';
import styled from 'styled-components';
import InputerSection from './InputerSection';
import PlayerSection from './PlayerSection';

const PlayerPage = () => {
  const [ youtubeId, setYoutubeId ] = useState('1AElONvi9WQ');

  function handleGetUrl(url) {

    const youtubeId = (url) => {
      let video_id = url.split('v=')[1];
      const ampersandPosition = video_id.indexOf('&');
      if (ampersandPosition != -1) {
        video_id = video_id.substring(0, ampersandPosition);
      }
      return video_id;
    }
    setYoutubeId(youtubeId(url));

  }
  
  return (
    <Page>
      { !youtubeId && <InputerSection onGetUrl={handleGetUrl} /> }
      { youtubeId && <PlayerSection id={youtubeId} /> }
    </Page>
  )
}

const Page = styled.div`
  
`


export default PlayerPage;