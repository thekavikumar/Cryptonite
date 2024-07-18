import React from 'react';
import { useDrag } from 'react-dnd';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const DraggableTable = ({ rowData }) => {
  const columns = [
    { headerName: 'Name', field: 'name' },
    { headerName: 'Price', field: 'price' },
    { headerName: 'Market Cap', field: 'marketCap' },
  ];

  const RowRenderer = (props) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: 'coin',
      item: props.data,
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }));

    return (
      <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
        {props.children}
      </div>
    );
  };

  return (
    <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columns}
        frameworkComponents={{ rowRenderer: RowRenderer }}
      ></AgGridReact>
    </div>
  );
};

export default DraggableTable;
