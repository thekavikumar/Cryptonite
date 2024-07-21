'use client';
import { Coin } from '@/lib/store';
import { useDrag } from 'react-dnd';
import { TableCell, TableRow } from './ui/table';
import { flexRender } from '@tanstack/react-table';
import { useRouter } from 'next/navigation';

const CoinRow: React.FC<{
  coin: Coin;
  row?: any;
  addToWatchlist: (coin: Coin) => void;
}> = ({ coin, addToWatchlist, row }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'COIN',
    item: { coin },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        addToWatchlist(item.coin);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const navigate = useRouter();

  return (
    <TableRow
      key={row?.id}
      onClick={() => {
        navigate.push(`/trending/${row.original.id}`);
      }}
      ref={drag as unknown as React.RefObject<HTMLTableRowElement>}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="w-full cursor-pointer"
      data-state={row?.getIsSelected() && 'selected'}
    >
      {row?.getVisibleCells().map((cell: any) => (
        <TableCell key={cell?.id}>
          {flexRender(cell?.column?.columnDef?.cell, cell?.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};

export default CoinRow;
