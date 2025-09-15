import React from 'react'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import configData from '../../store/configData';
import InputItem from '../../components/InputItem';
import { color } from '../../constant/color';

const ConfigPage = ({ currentPage }) => {
  const { translatorKey, youtubeKey } = useSelector(state => state.configData);
  
  const dispatch = useDispatch(configData);

  function handleSaveTranslatorKey(value) {
    dispatch(configData.actions.updateTranslatorKey(value));
  }

  function handleSaveYoutubeKey(value) {
    dispatch(configData.actions.updateYoutubeKey(value));
  }
  
  return (
    <>
    { currentPage === 'config' &&
      <Root>
        <Title>Config</Title>
        <List>
          <li><InputItem type="password" frame="full" label="Translator Key" onUpdate={handleSaveTranslatorKey} value={translatorKey} /></li>
          <li><InputItem type="password" frame="full" label="Youtube Key" onUpdate={handleSaveYoutubeKey} value={youtubeKey} /></li>
        </List>
      </Root>
    }
    </>
  )
}

const Root = styled.div`
  position: relative;
  padding: 16px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
`

const Title = styled.div`
  margin-bottom: 48px;
  color: ${color.white.normal};
`

const List = styled.ul`
  > li {
    margin-bottom: 24px;
  }
`

export default ConfigPage;
