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
import { handleGetDataCategoryMotor } from "@/app/(admin)/admin/produk/_serverside/action";
import { IDataCategoryMotor } from "@/app/_clientside/types";
import { ISelectOptionKategoriMotorProps } from "@/app/(admin)/admin/kategori/_clientside/types";
import { useHelperOptionMotor } from "@/app/(admin)/admin/kategori/_clientside/hooks/use-helper-option-motor";

export default function SelectOptionCategoryMotorSearch({
    open,
    setOpen,
    value,
    setValue,
    setFieldValue,
}: ISelectOptionKategoriMotorProps) {
    const [data, setData] = React.useState<IDataCategoryMotor[]>([])
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

    const {
        onSelectOption,
        valueOnSelectOption,
        handleOpen } = useHelperOptionMotor({
            data, handleGetData, loading,
            setFieldValue, setOpen, setValue,
            value
        })

    return (
        <Popover open={open} onOpenChange={handleOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" role="combobox"
                    className="w-full justify-between">
                    {valueOnSelectOption()}
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
                                <CommandItem key={i} value={`${item.id}-${item.motorCycleName}`}
                                    onSelect={onSelectOption}>
                                    {item.motorCycleName} - {item.releaseYear}
                                    <Check className={cn("ml-auto",
                                        Number(value.split('-')[0]) === item.id ? "opacity-100" : "opacity-0"
                                    )} />
                                </CommandItem>
                            ))}

                            <CommandItem value={`Lainnya`} onSelect={onSelectOption}>
                                Lainnya
                                <Check className={cn("ml-auto",
                                    value === 'Lainnya' ? "opacity-100" : "opacity-0")} />
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}