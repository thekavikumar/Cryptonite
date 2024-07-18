'use client';
import React, { useState } from 'react';
import { ref, set, push, onValue } from 'firebase/database';
import { db } from '../../firebase';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import DraggableTable from './Draggable';

const WatchList = () => {
  const [rowData, setRowData] = useState([]);
  const sampleData = [
    { name: 'Bitcoin', price: '$29,000', marketCap: '550B' },
    { name: 'Ethereum', price: '$1,800', marketCap: '210B' },
  ];
  const columns = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Market Cap', field: 'marketCap' },
  ];

  return <div className=""></div>;
};

export default WatchList;
