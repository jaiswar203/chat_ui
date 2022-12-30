import { Button, Input } from '@nextui-org/react'
import { NextPage } from 'next'
import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useLoginMutation,useSignupMutation } from '../../../redux/slices/user'
import { setUser } from '../../../redux/slices/util'
import { useAppDispatch } from '../../../redux/hook'
import { useRouter } from 'next/router'

interface props {
  login?: boolean
}

interface FormValues{
  name:string,
  username:string
  email:string
  password:string
}

const Login: NextPage<props> = ({ login = true }) => {
  const {register,handleSubmit}=useForm<FormValues>({mode:"all"})

  const router=useRouter()

  const dispatch=useAppDispatch()

  const [loginApi]=useLoginMutation()
  const [signupApi]=useSignupMutation()
  
  const onSubmitHandler=(data:FormValues)=>{
    if(!login){
      loginApi(data).unwrap().then((res)=>{
        dispatch(setUser({token:res.data.token,...res.data.user}))
        router.push("/")
      }).catch(err=>{
        console.log(err)
      })
    }else{
      signupApi(data).unwrap().then((res)=>{
        router.push("/")
        dispatch(setUser({...res.data.user}))
      }).catch(err=>{
        console.log(err)
      })
    }
  }
  return (
    <div className='chat__login'>
      <form className="chat__login-model" onSubmit={handleSubmit(onSubmitHandler)}>
        {
          login && (
            <>
              <div className="input">
                <Input clearable bordered labelPlaceholder="Username" fullWidth {...register("username",{required:true})} />
              </div>
              <div className="input">
                <Input clearable bordered labelPlaceholder="Full Name" fullWidth {...register("name",{required:true})} />
              </div>
            </>
          )
        }

        <div className="input">
          <Input clearable bordered labelPlaceholder="Email" fullWidth {...register("email",{required:true})} />
        </div>
        <div className="input">
          <Input.Password clearable bordered labelPlaceholder="Password" type={"password"} fullWidth {...register("password",{required:true})} />
        </div>
        <div className="button">
          <Button shadow color="secondary" auto css={{ width: "100%" }} type="submit" >
            {
              !login ? "Login" :"Signup"
            }
          </Button>
        </div>
        {
          !login ? (
            <p className='info'>Don&apos;t Have an Account?
              <Link href={"/login?signup=true"}> SignUp</Link>
            </p>

          ) : (
            <p className='info'>Have an Account?
              <Link href={"/login"}> Login</Link>
            </p>
          )
        }
      </form>
    </div>
  )
}

export default Login