import React, { useEffect } from 'react'
import type { NextPage } from 'next'
import Layout from '../src/components/Layout'
import { Home } from '../src/components'
import { useAppDispatch } from '../redux/hook'
import  { setWinWidth }  from '../redux/slices/util'

const Index:NextPage = () => {
  const dispatch=useAppDispatch()
 
  useEffect(()=>{
    
    dispatch(setWinWidth(window.innerWidth))
  },[])


  return (
    <Layout>
      <Home />
    </Layout>
  )
}

export default Index