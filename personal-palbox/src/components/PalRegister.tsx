'use client'

import { PalType } from "@/types/palTypes";
import { PalCombobox } from "./PalCombobox";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import { DOMAttributes, FormEvent, FormEventHandler } from "react";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { MyPals } from "./PalDataTable/columns";

export interface MyPalsFormData {
    palImage: {value: string};
    palName: {value: string};
    gender: {value: string};
    palNickname: {value: string};
    passive0: {value: string};
    passive1: {value: string};
    passive2: {value: string};
    passive3: {value: string};
}

interface Props {
    data: PalType[]
}

export function PalRegister({ data }: Props) {
    var passives = ["Ram", "Shyam", "Sita", "Gita"];
    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = localStorage.getItem('@my-pals') ?? '';
        const { palImage, palName, gender, palNickname, passive0,
            passive1,
            passive2,
            passive3 } = e.target as typeof e.target & MyPalsFormData;
        var obj = {
            palImage: palImage.value,
            palName: palName.value,
            gender: gender.value,
            palNickname: palNickname.value,
            passive0: passive0.value,
            passive1: passive1.value,
            passive2: passive2.value,
            passive3: passive3.value,
        }
        localStorage.setItem('@my-pals', JSON.stringify(data !== '' ? [...JSON.parse(data), obj] : [obj]));
        queryClient.invalidateQueries();
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="default" type="button">New Pal 2</Button>
            </DialogTrigger>
            <DialogContent className="w-screen">
                <DialogHeader className="flex flex-col gap-6">
                    <DialogTitle>New Pal</DialogTitle>

                    <form className="flex flex-col gap-4 items-center justify-center px-6" onSubmit={onSubmit}>
                        <PalCombobox data={data} placeholder="Select a Pal..." />

                        <Input name="palNickname" placeholder="Pal nickname" />
                        <Select name="gender">
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="apple">Male</SelectItem>
                                    <SelectItem value="banana">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className="grid grid-cols-4 gap-4">
                            {Array.from(Array(4).keys()).map(i => (
                                <Select key={i} name={`passive${i}`}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue className="bg-primary" placeholder={`Passive ${i}`} />
                                    </SelectTrigger>
                                    <SelectContent className="">
                                        <SelectGroup>
                                            <SelectLabel>{`Passive ${i}`}</SelectLabel>
                                            {passives.map(x => (
                                                <SelectItem value={x} key={x}>{x}</SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            ))}
                        </div>

                        <div className="flex items-center justify-end gap-4">
                            <Button variant="default" type="submit">Salvar</Button>
                            <Button variant="outline" type="button">Cancelar</Button>
                        </div>
                    </form>

                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}