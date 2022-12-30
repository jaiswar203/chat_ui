import {  NextPage } from 'next'
import {useState,useEffect} from 'react'
import { Login as LoginComp } from '../src/components'
import { useRouter } from 'next/router'

interface AppProps {
    // signup: string
}

const Login: NextPage<AppProps> = ({  }) => {
    const [isLogin,setIsLogin]=useState<boolean>(false)
    const router=useRouter()
    
    useEffect(()=>{
        
    },[router.query])

    return (
        <LoginComp login={router.query.signup==="true"} />
    )
}


export default Login