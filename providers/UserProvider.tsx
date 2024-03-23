"use client";

import { MyUserContextProvider } from '@/hooks/useUser';
import { UserProviderProps } from '@/types';
import React from 'react'

const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  return (
    <MyUserContextProvider>
        {children}
    </MyUserContextProvider>
  )
}

export default UserProvider