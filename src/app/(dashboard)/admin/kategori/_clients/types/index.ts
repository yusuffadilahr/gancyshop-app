import { IDataCategoryMotor } from "@/app/_clients/types"
import { FormikErrors } from "formik"
import * as React from 'react'

export interface IInitialValuesAddKategori {
    idCategoryMotor: string,
    motorCycleName: string,
    releaseYear: string,
    categoryName: string
}

export interface ISelectOptionKategoriMotorProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => Promise<void | FormikErrors<IInitialValuesAddKategori>>
}

export interface IHelperOptionMotorHooks {
    loading: boolean
    data: IDataCategoryMotor[],
    value: string
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleGetData: (val: boolean) => void
    setValue: React.Dispatch<React.SetStateAction<string>>
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => Promise<void | FormikErrors<IInitialValuesAddKategori>>
}

export interface IGETDataCategory {
    data: {
        categorymotorcyle: {
            createdAt: string
            deletedAt: string | null
            id: number
            motorCycleName: string
            releaseYear: number
            updatedAt: string
        }

        categoryMotorcyleId: number
        categoryName: string
        createdAt: string | null
        deletedAt: string | null
        id: number
        updatedAt: string | null
    }[]
    totalPage: number
}