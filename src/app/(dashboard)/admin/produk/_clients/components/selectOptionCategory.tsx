import {
    Check,
    ChevronsUpDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button";
import { ISelectOptionCategoryProps } from "@/app/(dashboard)/admin/produk/_clients/types";
import * as React from 'react'

export default function SelectOptionCategorySearch({
    data,
    setFieldValue,
    valueDisplay,
    setValueDisplay
}: ISelectOptionCategoryProps) {
    const [open, setOpen] = React.useState<boolean>(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    // aria-expanded={open}
                    className="w-full justify-between">
                    {(!!valueDisplay.category
                        ? data?.find((item) => item.id === Number(valueDisplay.category.split('-')[0]))?.categoryName
                        : "Pilih Kategori...") || 'Pilih Kategori...'}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search data..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>Data tidak tersedia.</CommandEmpty>
                        <CommandGroup>
                            {data?.map((item, i: number) => (
                                <CommandItem
                                    key={i}
                                    value={`${item.id}-${item.categoryName}`}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue.split('-')
                                        setValueDisplay({ ...valueDisplay, category: newValue[1] === valueDisplay.category.split('-')[1] ? "" : currentValue })
                                        setFieldValue('categoryId', newValue[0])
                                        setOpen(false)
                                    }}>
                                    {item.categoryName}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            Number(valueDisplay.category.split('-')[0]) === item.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}