'use client'
import { Toaster } from "react-hot-toast";
import { Provider } from 'react-redux'
import { store } from '../redux/store'

export function Providers({ children }: { children: React.ReactNode }) {
    <Toaster position="top-right" reverseOrder={false} />
  return <Provider store={store}>{children}</Provider>
}
