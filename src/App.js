import React from 'react';
import GlobalStyle from './components/GlobalStyle';
import Interface from './interface/Main';
import PlayerPage from './interface/PlayerPage';

function App() {
  
  return (
    <div className="App">
      <GlobalStyle />
      <Interface>
        <PlayerPage />
      </Interface>
    </div>
  );
}

export default App;
