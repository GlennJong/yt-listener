import React, { useRef } from 'react';

const Inputer = ({ getUrl }) => {

  const inputRef = useRef(null);

  function handleClickToGetInput() {
    getUrl(inputRef.current.value);
  }
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClickToGetInput}>send</button>
    </div>
  )
}

export default Inputer;