'use client'

import { setNotFoundPage } from '@/redux/slice/globalSlice';
import { useAppDispatch } from '@/redux/store';
import * as React from 'react';

export default function NotFound() {
    const dispatch = useAppDispatch()
    const [isClient, setIsClient] = React.useState<boolean>(false)

    React.useEffect(() => {
        dispatch(setNotFoundPage(true))
        setIsClient(true)

        return () => {
            dispatch(setNotFoundPage(false))
        }
    }, [])

    return (
        <React.Fragment>
            {isClient && (
                <section className='w-full min-h-screen justify-center items-center flex'>
                    <h1>Error bray</h1>;
                </section>
            )}
        </React.Fragment>
    )
}