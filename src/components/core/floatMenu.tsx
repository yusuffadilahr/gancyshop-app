'use client'

import { useAppSelector } from "@/redux/store"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RiCustomerService2Line, RiWhatsappFill } from "react-icons/ri"
import Link from "next/link"
import * as React from "react"
import { io as SocketIO, Socket } from 'socket.io-client'
import { Input } from "@/components/ui/input";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { Form, Formik } from "formik";
import { axiosInstance } from "@/utils/axiosInstance";
import Cookies from "js-cookie";

interface IDataChatUser {
    id: number
    userId: number
    message: string
    role: string
    chatSessionId: number | null
    createdAt: string
    updatedAt: string
    deletedAt: null | string
}

export default function FloatMenu() {
    const isNotFound = useAppSelector((state) => state.globaltheme.notFoundPage)
    const pathname = usePathname()
    const socketRef = React.useRef<Socket | null>(null)
    const [dataChatUser, setDataChatUser] = React.useState<IDataChatUser[]>([])
    const [openSocket, setOpenSocket] = React.useState<boolean>(false)
    const [tokenExist, setTokenExist] = React.useState<string>('')

    const handleGetHistoryChat = async () => {
        try {
            const data = (await axiosInstance.get('/user/chat'))?.data?.data

            if (data.length === 0 || data.length > 0) {
                setDataChatUser(data)
                setOpenSocket(true)
            }
        } catch (error) {
            console.log(error)
            setOpenSocket(false)
        }
    }

    const isHidden =
        pathname.startsWith('/admin') ||
        pathname.startsWith('/auth') ||
        isNotFound

    React.useEffect(() => {
        const socket = SocketIO('https://api-v1.gancy.my.id')

        if (openSocket) {
            socketRef.current = socket
            socket.on('connect', () => {
                console.log('Connected', socket.id)
            })

            socket.on('chat:incoming', (newMessage: IDataChatUser) => {
                setDataChatUser(prev => [...prev, newMessage])
            })
        }

        return () => {
            socket.disconnect()
        }

    }, [openSocket])

    React.useEffect(() => {
        const token = Cookies.get('_token') || null
        if (token) setTokenExist(token)
    }, [])

    return (
        <div className={`fixed ${isHidden ? 'hidden' : 'flex'}
        bottom-5 right-5 w-fit py-3 px-4 gap-2 bg-white/90 
        backdrop-blur-md border border-neutral-200
        rounded-xl shadow-xl items-center`}>
            {openSocket ? (
                <div className="w-[400px] h-[70vh] overflow-hidden relative rounded-xl">
                    <div className="flex flex-col h-full w-full">

                        <div className="flex justify-between items-center p-3 border-b">
                            <div className="flex items-center gap-2">
                                <RiCustomerService2Line size={20} />
                                <h2 className="text-sm font-semibold">Live Chat</h2>
                            </div>
                            <Button size="icon" variant="ghost" onClick={() => setOpenSocket(!openSocket)}>
                                <IoIosCloseCircleOutline className="text-lg" />
                            </Button>
                        </div>

                        <div className="flex-1 overflow-auto px-3 pb-5 py-2 space-y-2">
                            {dataChatUser?.map((item, i) => (
                                <div key={i}>
                                    <h1 className={`w-fit max-w-[90%] px-3 py-2 text-sm break-words rounded-2xl 
                                            ${item.role === 'USER' ? 'bg-gray-100 rounded-br-none self-end ml-auto'
                                            : 'bg-emerald-100 self-start mr-auto rounded-bl-none'}`}>
                                        {item.message}
                                    </h1>
                                    <p className={`
                                        text-[10px] text-muted-foreground px-2 py-1
                                        ${item.role === 'ADMIN' ? 'flex justify-start' : 'flex justify-end'}
                                        `}>
                                        {new Date(item.createdAt).toLocaleTimeString('id-ID', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="border-t p-3">
                            <Formik initialValues={{ message: '' }} onSubmit={(values, { resetForm }) => {
                                const dataInputSocket = {
                                    token: tokenExist,
                                    message: values.message,
                                    role: 'USER'
                                }

                                if (socketRef.current?.connected) {
                                    socketRef.current.emit('chat', dataInputSocket, (response: {
                                        error: boolean
                                        status?: number
                                        message: string
                                    }) => {
                                        if (response.status === 201 && !response.error) {
                                            resetForm()
                                        }
                                    })
                                }
                            }}>
                                {({ setFieldValue, values }) => (
                                    <Form className="flex items-center gap-2">
                                        <Input
                                            name="message"
                                            id="message"
                                            placeholder="Ketik pesan..."
                                            className="flex-1 text-sm"
                                            value={values.message}
                                            onChange={(e) => setFieldValue('message', e.target.value)}
                                        />
                                        <Button size="sm" type="submit">
                                            Kirim
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </div>

                    </div>
                </div>

            ) : (
                <>
                    <Link href="https://wa.me/6281234567890" target="_blank">
                        <Button size="icon" variant="ghost"
                            className="bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm">
                            <RiWhatsappFill className="w-5 h-5" />
                        </Button>
                    </Link>

                    {tokenExist && (
                        <Button size="icon" variant="ghost" onClick={() => {
                            handleGetHistoryChat()
                        }}
                            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700">
                            <RiCustomerService2Line className="w-5 h-5" />
                        </Button>
                    )}
                </>
            )}

        </div>
    )
}
