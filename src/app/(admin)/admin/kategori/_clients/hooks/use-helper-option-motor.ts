import { IHelperOptionMotorHooks } from "@/app/(admin)/admin/kategori/_clients/types";

export const useHelperOptionMotor = ({
    data,
    value,
    setValue,
    setFieldValue,
    setOpen,
    handleGetData,
    loading
}: IHelperOptionMotorHooks) => {
    const labelName = data?.find((item) => item.id === Number(value?.split('-')[0]))

    const onSelectOption = (currentValue: string) => {
        if (currentValue === 'Lainnya') {
            setValue(value === currentValue ? '' : currentValue)
            setFieldValue('idCategoryMotor', currentValue)
            setOpen(false)

            return
        }

        const newValue = currentValue.split('-')
        setValue(newValue[1] === value?.split('-')[1] ? "" : currentValue)

        setFieldValue('idCategoryMotor', newValue[0])
        setOpen(false)
    }

    const valueOnSelectOption = () => {
        return (!!value && value !== 'Lainnya'
            ? `${labelName?.motorCycleName} - ${labelName?.releaseYear}`
            : !!value && value === 'Lainnya' ? 'Lainnya' :
                loading ? 'Mohon Tunggu' :
                    "Pilih Kategori Motor...") || 'Pilih Kategori Motor...'
    }

    const handleOpen = (open: boolean) => {
        if (data.length === 0) {
            handleGetData(open)
        } else {
            setOpen(true)
        }
    }

    return {
        onSelectOption,
        valueOnSelectOption,
        handleOpen,
        labelName
    }
}