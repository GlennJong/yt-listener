import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './index.css';
import App from './App';
import wordLibrary from './store/wordLibrary';
import videoData from './store/videoData';
import configData from './store/configData';
import guideStatus from './store/guideStatus';

const reducer = combineReducers({
  wordLibrary: wordLibrary.reducer,
  videoData: videoData.reducer,
  configData: configData.reducer,
  guideStatus: guideStatus.reducer
});

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

