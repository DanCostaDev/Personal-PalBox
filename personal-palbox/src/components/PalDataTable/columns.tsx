"use client"

import { PalType } from "@/types/palTypes"
import { Column, ColumnDef } from "@tanstack/react-table"
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

export interface MyPals {
    palImage: string;
    palName: string;
    gender: string;
    palNickname: string;
    passive0: string;
    passive1: string;
    passive2: string;
    passive3: string;
}

function SortedHeader({column, name}: {column: Column<MyPals, unknown>, name: string}) {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {name}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    )
}

export const columns: ColumnDef<MyPals>[] = [
    {
        accessorKey: "palImage",
        header: "Foto",
        cell: ({ row }) => {
            const palImage = row.getValue("palImage") as unknown as string;
            return <Image src={palImage ?? ''} alt="pal" width={80} height={80} />
        },
    },
    {
        accessorKey: "palName",
        cell: ({ row }) => {
            const palName = row.getValue("palName") as unknown as string;
            return <div className="text-center w-[100%] items-center justify-center">{palName}</div>
        },
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Pal
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "palNickname",
        cell: ({ row }) => {
            const palNickname = row.getValue("palNickname") as unknown as string;
            return <div className="text-center w-[100%] items-center justify-center">{palNickname}</div>
        },
        header: ({ column }) => {
            return (
                <SortedHeader column={column} name="Nickname" />
            )
        },
    },
    {
        accessorKey: "passive0",
        cell: ({ row }) => {
            const passive0 = row.getValue("passive0") as unknown as string;
            return <div className="text-center w-[100%] items-center justify-center">{passive0}</div>
        },
        header: ({ column }) => {
            return (
                <SortedHeader column={column} name="Passiva 1" />
            )
        },
    },
    {
        accessorKey: "passive1",
        cell: ({ row }) => {
            const passive1 = row.getValue("passive1") as unknown as string;
            return <div className="text-center w-[100%] items-center justify-center">{passive1}</div>
        },
        header: ({ column }) => {
            return (
                <SortedHeader column={column} name="Passiva 2" />
            )
        },
    },
    {
        accessorKey: "passive2",
        cell: ({ row }) => {
            const passive2 = row.getValue("passive2") as unknown as string;
            return <div className="text-center w-[100%] items-center justify-center">{passive2}</div>
        },
        header: ({ column }) => {
            return (
                <SortedHeader column={column} name="Passiva 3" />
            )
        },
    },
    {
        accessorKey: "passive3",
        cell: ({ row }) => {
            const passive3 = row.getValue("passive3") as unknown as string;
            return <div className="text-center w-[100%] items-center justify-center">{passive3}</div>
        },
        header: ({ column }) => {
            return (
                <SortedHeader column={column} name="Passiva 4" />
            )
        },
    },
]