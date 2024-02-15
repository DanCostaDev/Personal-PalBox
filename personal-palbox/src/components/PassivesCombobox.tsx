"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import Image from 'next/image';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { PalType } from "@/types/palTypes"
import { ScrollArea } from "./ui/scrollarea"

interface Props {
  data: PalType[];
  placeholder: string;
}

export function PassiveCombobox({ data, placeholder }: Props) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <Image width={40} height={40} src={data.find((item) => item.id.toString() === value)?.imageWiki ?? ""} alt="Passive" />
          {value
            ? data.find((item) => item.id.toString() === value)?.name
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <div className="h-80">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandEmpty>Não encontrada.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="max-h-72">
              <div className="flex flex-col h-screen">
                {data.map((item) => (
                  <CommandItem
                    key={item.name}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Image width={40} height={40} src={item.imageWiki} alt={item.name} />
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.name}
                  </CommandItem>
                ))}
              </div>
            </ScrollArea>
          </CommandGroup>
        </Command>
        </div>
      </PopoverContent>
    </Popover>
  )
}
