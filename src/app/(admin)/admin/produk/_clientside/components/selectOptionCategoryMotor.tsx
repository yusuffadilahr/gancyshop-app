import { Check, ChevronsUpDown } from "lucide-react"
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
import * as React from "react";
import { IDataCategory, ISelectOptionSearchProps } from "@/app/(admin)/admin/produk/_clientside/types";
import { handleGetDataCategoryMotor } from "@/app/(admin)/admin/produk/_serverside/action";

export default function SelectOptionCategoryMotorSearch({
    open,
    setOpen,
    value,
    setValue,
    setFieldValue,
    handleGetDataCategoryByCategoryMotor
}: ISelectOptionSearchProps) {
    const [data, setData] = React.useState<IDataCategory[]>([])
    const [loading, setLoading] = React.useState<boolean>(false)
    const handleGetData = async (open: boolean) => {
        try {
            setLoading(true)
            const res = await handleGetDataCategoryMotor()
            if (!res.error) {
                setData(res.data)
                setOpen(open)
                setLoading(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const labelName = data?.find((item) => item.id === Number(value?.categoryMotor?.split('-')[0]))

    return (
        <Popover open={open} onOpenChange={(open) => {
            if (data.length === 0) {
                handleGetData(open)
            } else {
                setOpen(true)
            }
        }}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    // aria-expanded={open}
                    className="w-full justify-between">
                    {(!!value.categoryMotor
                        ? `${labelName?.motorCycleName} - ${labelName?.releaseYear}`
                        : loading ? 'Mohon Tunggu' :
                            "Pilih Kategori Motor...") || 'Pilih Kategori Motor...'}
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
                                    value={`${item.id}-${item.motorCycleName}`}
                                    onSelect={(currentValue) => {
                                        const newValue = currentValue.split('-')
                                        setValue({
                                            ...value,
                                            category: '',
                                            categoryMotor: newValue[1] === value?.categoryMotor?.split('-')[1] ? "" : currentValue
                                        })

                                        setFieldValue('categoryMotor', newValue[0])
                                        handleGetDataCategoryByCategoryMotor(newValue[0])
                                        setOpen(false)
                                    }}>
                                    {item.motorCycleName} - {item.releaseYear}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            Number(value.categoryMotor.split('-')[0]) === item.id ? "opacity-100" : "opacity-0"
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