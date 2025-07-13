import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { GrPowerReset } from "react-icons/gr"
import DatePicker from "@/components/core/datePickerInput"
import * as React from "react"
import { ICategoryProduct, IValueOnChange } from "@/app/(landingmenu)/product/_clientside/types"
import { DebouncedState } from "use-debounce"

interface ISectionFilterProps {
    isLoadingGetCategory: boolean,
    setValueOnChange: React.Dispatch<React.SetStateAction<IValueOnChange>>,
    valueOnChange: IValueOnChange,
    dataCategory?: ICategoryProduct[],
    debounceMaxPrice: DebouncedState<(val: string) => void>,
    debounceMaxWeight: DebouncedState<(val: string) => void>,
    debounceMinPrice: DebouncedState<(val: string) => void>,
    debounceMinWeight: DebouncedState<(val: string) => void>,
    datePicker: Date | undefined,
    setDatePicker: React.Dispatch<React.SetStateAction<Date | undefined>>,
    handleResetFilter: () => void,
}

export default function SectionFilter({
    isLoadingGetCategory,
    setValueOnChange,
    valueOnChange,
    dataCategory,
    debounceMaxPrice,
    debounceMaxWeight,
    debounceMinPrice,
    debounceMinWeight,
    datePicker,
    setDatePicker,
    handleResetFilter,
}: ISectionFilterProps) {
    return (
        <div className="hidden md:block w-full md:max-w-xs bg-white rounded-xl shadow-md p-4 space-y-4 h-fit
                sticky top-2 border">
            <h2 className="text-lg font-bold">Filter Produk</h2>

            <div className="space-y-1">
                <Label>Kategori</Label>
                <Select onValueChange={(val) => setValueOnChange(prev => ({ ...prev, kategoriId: val }))}
                    disabled={isLoadingGetCategory} value={valueOnChange?.kategoriId || ""}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Pilih kategori" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        {dataCategory?.map(item => (
                            <SelectItem value={`${item.id}`} key={item?.id}>{item?.categoryName}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div className="space-y-1">
                <Label>Harga</Label>
                <div className="flex gap-2">
                    <Input type="number" placeholder="Min" className="w-1/2" min={0}
                        onChange={(e) => debounceMinPrice(e.target.value)} />
                    <Input type="number" placeholder="Max" className="w-1/2" min={0}
                        onChange={(e) => debounceMaxPrice(e.target.value)} />
                </div>
            </div>

            <div className="space-y-1">
                <Label>Berat (gram)</Label>
                <div className="flex gap-2">
                    <Input type="number" placeholder="Min" className="w-1/2" min={0}
                        onChange={(e) => debounceMinWeight(e.target.value)} />

                    <Input type="number" placeholder="Max" className="w-1/2" min={0}
                        onChange={(e) => debounceMaxWeight(e.target.value)} />

                </div>
            </div>

            <div className="space-y-1">
                <Label>Stok</Label>
                <Select onValueChange={(val) => setValueOnChange(prev => ({ ...prev, stock: val }))}
                    value={valueOnChange?.stock || ''}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Ketersediaan" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua</SelectItem>
                        <SelectItem value="tersedia">Tersedia Banyak</SelectItem>
                        <SelectItem value="hampir-habis">Stok Hampir Habis</SelectItem>
                        <SelectItem value="stok-habis">Stok Habis</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-1">
                <Label>Tanggal Dibuat</Label>
                <DatePicker date={datePicker} setDate={setDatePicker} />
            </div>

            <Button className="w-full flex items-center"
                onClick={handleResetFilter}>
                <GrPowerReset /> Reset Filter</Button>
        </div>
    );
}