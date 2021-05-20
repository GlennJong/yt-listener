import React, { forwardRef, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const ToggleSlider = forwardRef(({ children }, ref) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current = {
        open: handleOpenSlider,
        close: handleCloseSlider,
        toggle: handleToggleSlider
      }
    }
  }, []);

  function handleOpenSlider() {
    rootRef.current.classList.add('active');
  }

  function handleCloseSlider() {
    rootRef.current.classList.remove('active');
  }

  function handleToggleSlider() {
    if (rootRef.current.classList.contains('active')) {
      rootRef.current.classList.remove('active');
    }
    else {
      rootRef.current.classList.add('active');
    }
  }
  
  return (
    <Root ref={rootRef}>{children}</Root>
  )
})


const Root = styled.div`
  max-height: 0px;
  width: 100%;
  overflow: hidden;
  transition: max-height .3s ease;

  &.active { max-height: 30vh; }
`

export default ToggleSlider;