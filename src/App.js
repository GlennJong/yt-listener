import React, { useState } from 'react';
import Main from './components/Main';
import GlobalStyle from './components/GlobalStyle';
import Inputer from './components/Inputer';

function App() {
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
    <div className="App">
      <GlobalStyle />
      <Inputer getUrl={handleGetUrl} />
      { youtubeId && <Main id={youtubeId} /> }
      
    </div>
  );
}

export default App;
