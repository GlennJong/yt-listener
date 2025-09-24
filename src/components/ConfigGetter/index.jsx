import React, { useEffect } from 'react';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux';
import configData from '../../store/configData';

const ConfigGetter = () => {
  const { translatorKey, youtubeKey } = useSelector(state => state.configData);
  const dispatch = useDispatch(configData);

  function handleSaveTranslatorKey(value) {
    dispatch(configData.actions.updateTranslatorKey(value));
  }

  function handleSaveYoutubeKey(value) {
    dispatch(configData.actions.updateYoutubeKey(value));
  }
  
  useEffect(() => {
    const query = queryString.parse(window.location.search)
    if (query.azure && query.azure !== translatorKey) {
      handleSaveTranslatorKey(query.azure);
    }
    if (query.youtube && query.youtube !== youtubeKey) {
      handleSaveYoutubeKey(query.youtube);
    }
    window.history.replaceState({}, document.title, window.location.origin);
  }, [])
  
  return (
    <></>
  )
}

export default ConfigGetter;