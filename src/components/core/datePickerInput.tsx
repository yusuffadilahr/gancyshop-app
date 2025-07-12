import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { MdDateRange } from "react-icons/md";

export default function DatePicker({ date, setDate }: { date: Date | undefined; setDate: React.Dispatch<React.SetStateAction<Date | undefined>> }) {
    const [open, setOpen] = React.useState(false)

    return (
        <div className="flex flex-col gap-3">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <div className="flex items-center w-full relative">
                        <Button variant="outline" id="date" className="w-full justify-between font-normal pl-8">
                            {date ? date.toLocaleDateString() : "Pilih tanggal"}
                            <ChevronDownIcon />
                        </Button>
                        <MdDateRange className="absolute left-0 ml-2 text-sm" />
                    </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar mode="single" selected={date}
                        captionLayout="dropdown" onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
