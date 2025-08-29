'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import * as React from 'react';

const queryClient = new QueryClient()
export default function TanstackProvider({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
}