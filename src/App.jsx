import React, { useState } from 'react';
import GlobalStyle from './components/GlobalStyle';
import MobileGuideMask from './components/MobileGuideMask';
import HowToUseBoard from './components/HowToUseBoard';
import Interface from './interface/Main';
import PlayerPage from './interface/PlayerPage';
import HomePage from './interface/HomePage';
import BookPage from './interface/BookPage';
import ConfigPage from './interface/ConfigPage';
import BottomMenu from './interface/BottomMenu';

function App() {
  const [ currentPage, setCurrentPage ] = useState('home');

  function handleGetCurrentPage(page) {
    setCurrentPage(page);
  }

  function handleAutoJumpToPlayerPage() {
    setCurrentPage('player');
  }

  
  return (
    <div className="App">
      <GlobalStyle />
        <MobileGuideMask />
        <HowToUseBoard />
        <Interface>
          <HomePage   currentPage={currentPage} onIdReady={handleAutoJumpToPlayerPage} />
          <PlayerPage currentPage={currentPage} />
          <BookPage   currentPage={currentPage} />
          <ConfigPage currentPage={currentPage} />
        </Interface>
        <BottomMenu currentPage={currentPage} onButtonClick={handleGetCurrentPage} /> 
    </div>
  );
}

export default App;
