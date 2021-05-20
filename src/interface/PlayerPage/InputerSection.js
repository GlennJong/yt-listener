import React, { useRef } from 'react';

const InputerSection = ({ onGetUrl }) => {

  const inputRef = useRef(null);

  function handleClickToGetInput() {
    onGetUrl(inputRef.current.value);
  }
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClickToGetInput}>send</button>
    </div>
  )
}

export default InputerSection;