import { NextPage } from 'next'
import React from 'react'
import Navbar from './Normal/Navbar'

type AppProps={
    children:React.ReactNode
}

const Layout:NextPage<AppProps> = ({children}) => {
  return (
    <>
        {/* <Navbar /> */}
        <main>{children}</main>
    </>
  )
}

export default Layout