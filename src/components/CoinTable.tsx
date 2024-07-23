'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Coin, useCoinStore, useWatchlistStore } from '@/lib/store';
import CoinRow from './CoinRow';
import Link from 'next/link';

const getRawPrice = (coin: Coin) => coin.data.price;

export const columns: ColumnDef<Coin>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="">Coin</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <img
          src={row.original.small}
          alt={row.original.name}
          className="h-6 w-6 rounded-full"
        />
        {row.original.name} ({row.original.symbol})
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="float-right"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const price = row.original.data.price;

      // Format the price as a dollar amount
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 5,
      }).format(price);

      return <div className="text-right font-medium">{formatted}</div>;
    },
    sortingFn: (a, b) => {
      const priceA = getRawPrice(a.original);
      const priceB = getRawPrice(b.original);
      if (priceA !== priceB) {
        return priceB - priceA;
      }
      return getRawPrice(a.original) - getRawPrice(b.original);
    },
  },
  {
    accessorKey: 'market_cap',
    header: () => <div className="text-right hidden lg:block">Market Cap</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium hidden lg:block">
          {row.original.data.market_cap}
        </div>
      );
    },
  },
  {
    accessorKey: 'total_volume',
    header: () => (
      <div className="text-right hidden lg:block">Total Volume</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium hidden lg:block">
          {row.original.data.total_volume}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const coin = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 hidden lg:block">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(coin.coin_id)}
            >
              Copy coin ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function CoinTable({ page }: { page: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { coins } = useCoinStore();

  const table = useReactTable({
    data: coins,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const { addToWatchlist } = useWatchlistStore();

  return (
    <div
      className={`w-full max-w-[340px] ${
        page == 'trending' ? 'md:max-w-3xl' : 'sm:max-w-4xl'
      } mx-auto`}
    >
      {page != 'trending' ? (
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Treading Coins</h1>
          <Link href="/trending">Explore More</Link>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Treading Coins</h1>
        </div>
      )}
      <div className="flex items-center gap-2 lg:gap-0 py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
          onChange={(event: any) =>
            table.getColumn('name')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
