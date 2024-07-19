'use client';
import { Coin, useWatchlistStore } from '@/lib/store';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { useDrop } from 'react-dnd';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import CoinRow from './CoinRow';
import Link from 'next/link';

export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-right">Coin</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.small}
          alt={row.original.name}
          className="h-6 w-6 rounded-full"
        />
        {row.original.symbol}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const price = row.original.data.price;

      // Format the price as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: 'market_cap',
    header: () => <div className="text-right">Market Cap</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.data.market_cap}
        </div>
      );
    },
  },
  {
    accessorKey: 'total_volume',
    header: () => <div className="text-right">Total Volume</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          {row.original.data.total_volume}
        </div>
      );
    },
  },
];

const Watchlist: React.FC = () => {
  const { watchlist, addToWatchlist } = useWatchlistStore();
  const recentWatchlist =
    watchlist.length > 5 ? watchlist.slice(0, 5) : watchlist;
  const table = useReactTable({
    data: recentWatchlist,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [, drop] = useDrop(() => ({
    accept: 'COIN',
    drop: (item: { coin: Coin }) => {},
  }));
  // ref={drop as unknown as React.RefObject<HTMLDivElement>}
  return (
    <div
      className="max-w-md h-[373px] md:mt-[-24px] mt-5 w-full"
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Watch List</h1>
        <Link href="/watchlist">View More</Link>
      </div>
      <div className="rounded-md border h-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table
                .getRowModel()
                .rows.map((row) => (
                  <CoinRow
                    row={row}
                    coin={row.original}
                    addToWatchlist={addToWatchlist}
                    key={row.id}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Watchlist;
