import React, { useEffect } from 'react'
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import WordSection from './WordSection';
import { color } from '../../constant/color';

const BookPage = ({ currentPage }) => {

  return (
    <>
      {
        currentPage === 'book' &&
        <Root>
          <WordSection />
        </Root>
      }
    </>
  )
}

const Root = styled.div`
  padding: 16px;
  padding-top: 36px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  color: ${color.white.normal};
  background: ${color.black.normal};
`

export default BookPage;
