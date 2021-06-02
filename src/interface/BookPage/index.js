import React, { useEffect, useState } from 'react'
import styled, { css } from 'styled-components';
import WordSection from './WordSection';
import WordLibrarySection from './WordLibrarySection';
import ToggleButton from '../../components/ToggleButton';
import { color } from '../../constant/color';
import { Book } from '@styled-icons/boxicons-regular';

const BookPage = ({ currentPage }) => {
  const [openLibrary, setOpenLibrary] = useState(false);

  function handleOpenLibrary(e) {
    setOpenLibrary(e.active);
  }
  useEffect(() => {
    currentPage !== 'book' && setOpenLibrary(false);
  }, [currentPage])
  
  return (
    <>
      {
        currentPage === 'book' &&
        <Root>
          <Head>
            <p>Notebook</p>
            <LibraryToggleButton onClick={handleOpenLibrary}><Book size="18" /></LibraryToggleButton>
          </Head>
          <WordSection />
          <Sidebar open={openLibrary}>
            <WordLibrarySection open={openLibrary} />
          </Sidebar>
        </Root>
      }
    </>
  )
}

const Root = styled.div`
  position: relative;
  padding: 16px;
  padding-top: 36px;
  height: 100vh;
  max-width: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  color: ${color.white.normal};
  background: ${color.black.normal};
  overflow: hidden;
`

const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0 16px;
  padding-top: 12px;
  background: ${color.black.normal};
  box-shadow: 0px 4px 4px ${color.black.dark};
  box-sizing: border-box;
  z-index: 2;
  p {
    padding: 6px 0;
  }
`
const Sidebar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  padding-bottom: 120px;
  transform: translateX(100%);
  transition: all .3s ease;
  overflow-y: auto;
  ${({ open }) => open && css` transform: translateX(0%);`}
  z-index: 1;
`

const LibraryToggleButton = styled(ToggleButton)`
  margin-right: 4px;
  padding: 2px 4px;
  color: ${color.white.normal};
`


export default BookPage;
