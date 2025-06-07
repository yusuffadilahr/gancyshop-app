import * as React from "react";
import { FaInfoCircle } from "react-icons/fa";

export default function AlertTitle({
    type = 'default',
    title = 'INFO'
}: {
    type?: 'default' | 'error',
    title: string
}) {
    return (
        <React.Fragment>
            <div className="w-full px-5">
                {type === 'error' ? (
                    <div className="border border-red-500 rounded-xl py-2 px-4">
                        <div className="flex items-center gap-2">
                            <FaInfoCircle />
                            <h1>{title}</h1>
                        </div>
                    </div>
                ) : (
                    <div className="border border-green-200 rounded-xl py-3 px-4">
                        <div className="flex items-center gap-2">
                            <FaInfoCircle className="text-green-300"/>
                            <h1 className="text-green-600 text-sm">{title}</h1>
                        </div>
                    </div>
                )}
            </div>
        </React.Fragment>
    );
}