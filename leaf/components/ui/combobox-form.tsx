"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FormControl } from "./form"

interface ComboboxProps {
  data: { value: number; label: string }[]
  label: string
  value: number | null
  onValueChange: (val: number) => void
}

export function Combobox({ label, data, value = -1, onValueChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-[200px] justify-between", !value && "text-muted-foreground")}
          >
            {value !== -1 ? data.find((item) => item.value === value)?.label : `Select ${label}`}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] h-[500px] p-0 z-10">
        <Command>
          <CommandInput placeholder={`Search ${label}...`} />
          <CommandEmpty>No {label} found.</CommandEmpty>
          <CommandGroup>
            {data.map((item) => (
              <CommandItem
                value={item.label}
                key={item.value}
                onSelect={() => {
                  onValueChange(item.value)
                  setOpen(false)
                }}
              >
                <CheckIcon className={cn("mr-2 h-4 w-4", item.value === value ? "opacity-100" : "opacity-0")} />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
