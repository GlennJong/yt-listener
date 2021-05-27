import React, { useState } from 'react';

import GlobalStyle from './components/GlobalStyle';
import Interface from './interface/Main';
import PlayerPage from './interface/PlayerPage';
import HomePage from './interface/HomePage';
import BookPage from './interface/BookPage';
import ConfigPage from './interface/ConfigPage';
import BottomMenu from './interface/BottomMenu';

function App() {
  const [ currentPage, setCurrentPage ] = useState('player');


  const handleGetCurrentPage = (page) => {
    setCurrentPage(page);
  }
  
  return (
    <div className="App">
      <GlobalStyle />
        <Interface>
          <HomePage   currentPage={currentPage} />
          <PlayerPage currentPage={currentPage} />
          <BookPage   currentPage={currentPage} />
          <ConfigPage currentPage={currentPage} />
        </Interface>
        <BottomMenu currentPage={currentPage} onButtonClick={handleGetCurrentPage} /> 
    </div>
  );
}

export default App;
