import React from 'react';
import styled, { css } from 'styled-components';
import { color } from '../../constant/color';
import { Home, Headphone, Book, Cog } from '@styled-icons/boxicons-regular';

function BottomMenu({ currentPage, onButtonClick }) {

  const handleClickMenuButton = (e) => {
    const { current } = e.currentTarget.dataset;
    onButtonClick(current);
  }
  
  return (
    <Root>
      <div className="left">
        <MenuButton active={currentPage === 'home'} data-current="home" onClick={handleClickMenuButton} ><Home size="32" /></MenuButton>
        <MenuButton active={currentPage === 'player'} data-current="player" onClick={handleClickMenuButton} ><Headphone size="32" /></MenuButton>
      </div>
      <div className="right">
        <MenuButton active={currentPage === 'book'} data-current="book" onClick={handleClickMenuButton} ><Book size="32" /></MenuButton>
        <MenuButton active={currentPage === 'config'} data-current="config" onClick={handleClickMenuButton} ><Cog size="32" /></MenuButton>
      </div>
    </Root> 
  );
}

const Root = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 12px 20px;
  width: 100vw;
  height: 90px;
  background: ${color.black.light};
  box-sizing: border-box;
  > .left, > .right {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    width: 35%
  }
`

const MenuButton = styled.button`
  background: transparent;
  border: 0;
  color: ${color.gray.normal};
  ${(props) => props.active && css`color: ${color.white.normal};`}
`

export default BottomMenu;
