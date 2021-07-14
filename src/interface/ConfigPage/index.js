import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import configData from '../../store/configData';
import InputItem from '../../components/InputItem';

const ConfigPage = () => {
  const { translatorKey } = useSelector(state => state.configData);
  
  const dispatch = useDispatch(configData);

  function handleSaveTranslatorCode(value) {
    dispatch(configData.actions.updateTranslatorKey(value));
  }
  
  return (
    <Root>
      <InputItem label="Translator Key" onUpdate={handleSaveTranslatorCode} value={translatorKey} />
    </Root>
  )
}

const Root = styled.div`
  position: relative;
  padding: 16px;
  padding-top: 48px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`

export default ConfigPage;
