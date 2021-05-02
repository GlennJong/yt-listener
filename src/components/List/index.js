import React, { forwardRef, useEffect, useRef, useState } from 'react';

const Item = ({ data, onClick, ...props}) => {

  function getSplitSentence(str) {
    const splitSentence = str.split(/(\s+)(\w+)/g);
    const result = splitSentence.map(item => {
      if (item.match(/\w+/)) {
        return { type: 'button', content: item }
      }
      else {
        return item;
      }
    })

    return result;
  }
  
  return (
    <li {...props}>
      <div>
        {
          getSplitSentence(data.content).map((item, i) =>
            item.type === 'button' ?
            <button key={i}>{ item.content }</button>
            :
            <span key={i}>{ item }</span>
          )
        }
      </div>
      <button data-sec={data.start} onClick={onClick}>move</button>
    </li>
  )
}

const List = forwardRef(({ onItemClick }, ref) => {
  const [data, setData] = useState([]);
  const dataRef = useRef(null);

  useEffect(() => {
    if (ref) {
      ref.current = {
        addItem: handleAddItem
      }
    }
  }, []);

  useEffect(() => {
    if (dataRef) {
      dataRef.current = data;
    }
  }, [data])
  
  function handleAddItem(item) {
    const currentData = [...dataRef.current];
    currentData.push(item);
    setData(currentData);
  }
  
  return (
    <ul>
      {
        data?.map((item, i) =>
          <Item onClick={onItemClick} key={i} data={item} />
        )
      }
    </ul>
  )
})

export default List;