"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery } from "@tanstack/react-query"
import { MyPals } from "./columns"
import { useState } from "react"
import { Input } from "../ui/input"
import { ScrollArea } from "../ui/scrollarea"

interface DataTableProps<MyPals, TValue> {
    columns: ColumnDef<MyPals, TValue>[]
}

export function DataTable<MyPals, TValue>({
    columns
}: DataTableProps<MyPals, TValue>) {
    const { data } = useQuery<MyPals[]>({
        queryKey: ['my-pals'], queryFn: () => {
            const memory = localStorage.getItem('@my-pals') ?? ''
            return JSON.parse(memory) ?? []
        }
    })

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data: data ?? [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters
        },

    })

    return (
        <div className="rounded-md border w-full">
            <div className="flex items-center py-4 px-2">
                <Input
                    placeholder="Filter pal..."
                    value={(table.getColumn("palName")?.getFilterValue() as string)
                        ?? ""}
                    onChange={(event) => {
                        table.getColumn("palName")?.setFilterValue(event.target.value)
                    }}
                    className="max-w-sm"
                />
            </div>
            <Table className="max-h-[10%]">
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody className="overflow-auto">
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
