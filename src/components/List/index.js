import React, { forwardRef, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Item from '../Item';

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
    <Root>
      {
        data?.map((item, i) =>
          <Item onClick={onItemClick} key={i} data={item} />
        )
      }
    </Root>
  )
})

const Root = styled.ul`
  
`


export default List;