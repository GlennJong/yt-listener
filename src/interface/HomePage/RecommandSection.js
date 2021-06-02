import React, { useEffect, useRef } from 'react';

const InputerSection = ({ onGetUrl }) => {

  useEffect(() => {
    // fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=bbc+learning+english&maxResults=10&order=viewCount&key=AIzaSyBpHzkztUGk60xVK7quXoj7R6sijBJ5aMY`, {
    //   method: 'GET',
    // })
    // .then(res => {
    //   console.log(res.json())
    // })
  }, [])
  
  
  const inputRef = useRef(null);

  function handleClickToGetInput() {
    onGetUrl(inputRef.current.value);
  }
  
  return (
    <div>
    </div>
  )
}

export default InputerSection;