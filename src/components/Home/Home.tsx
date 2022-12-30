import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

import { useAppDispatch, useAppSelector } from '../../../redux/hook'
import { Avatar, Button, Input, Text } from '@nextui-org/react'
import { useGetUserByUsernameMutation } from '../../../redux/slices/user'

import ChatUI from './ChatUI'
import { setCurrentChatUser } from '../../../redux/slices/util'
import { useGetConversationMutation } from '../../../redux/slices/conversation'
import { usePostChatMutation } from '../../../redux/slices/chat'
interface AppProps {

}

interface Username {
  username: string
  _id?: string
}

// interface  

function UserModel(props) {
  return (<div className='chat__romm-model'>
    <Text h3 css={{
      mb: "3rem"
    }}>Enter Chat Username you want to chat with</Text>
    <Input css={{
      mb: "2rem"
    }} placeholder='Username' fullWidth onChange={e => props.setChatId(prev => ({
      ...prev,
      username: e.target.value
    }))} />
    <Button shadow color="secondary" auto css={{
      w: "100%"
    }} onClick={props.onClickHandler}>
      Start Chat
      {
        /* <MoonLoader size={20} color="white"  /> */
      }
    </Button>
  </div>);
}


const Home: NextPage<AppProps> = () => {
  const { user, currentChatUser } = useAppSelector(state => state.util)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const [getUserByUsername] = useGetUserByUsernameMutation()
  const [getConversation] = useGetConversationMutation()
  const [sendMessage]=usePostChatMutation()

  const [chatId, setChatId] = useState<Username>({ username: null, _id: null })
  const [isUserOnline, setIsUserOnline] = useState(false)

  const [conversation, setConversation] = useState([])

  const socket=useRef(io("ws://localhost:4000"))

  async function fetchConversation(){
    if(currentChatUser.data && user){
      const { data } = await getUserByUsername(currentChatUser.data['username']).unwrap()
      setChatId(prev => ({ ...prev, id: data.user._id }))
      
      const conversation=await getConversation({from:user._id,to:data.user._id}).unwrap()
      dispatch(setCurrentChatUser({data: data.user,conversation:conversation.data.conversation}))
      setConversation(conversation.data.conversation)
      
    }
  }

  useEffect(()=>{
    socket.current.emit("addUser",user._id)
    socket.current.on("getUsers",(users:[])=>{
      const isUser=users.filter((obj:{socketId:string,userId:string})=>obj.userId===chatId._id)

      if(isUser.length!==0){
        setIsUserOnline(true)
      }else{
        setIsUserOnline(false)
      }
    })
    socket.current.on("getMessage",()=>{
      fetchConversation()    
    })
  },[chatId,user])
  
  useEffect(()=>{
    fetchConversation()
  },[])

  useEffect(() => {
    if (currentChatUser.data) {
      setChatId(currentChatUser.data as Username)
    }
    if(currentChatUser.conversation.length!==0){
      setConversation(currentChatUser.conversation)
    }
  }, [currentChatUser])

  if (!user.token) {
    router.push("/login")
    return null
  }


  const onClickHandler = async (): Promise<any> => {
    const { data } = await getUserByUsername(chatId.username).unwrap()
    setChatId(prev => ({ ...prev, id: data.user._id }))

    try {
      
      const conversation=await getConversation({from:user._id,to:data.user._id}).unwrap()
      dispatch(setCurrentChatUser({data: data.user,conversation:conversation.data.conversation}))
      setConversation(conversation.data.conversation)
    } catch (error) {
      dispatch(setCurrentChatUser({data: data.user,conversation:[]}))
      setConversation([])
      console.log({error})
    }
  }

  const onSendMessageHandler=async(message:string)=>{
    try {
      await sendMessage({from:user._id,to:chatId._id,message}).unwrap()
      const {data}=await getConversation({from:user._id,to:chatId._id}).unwrap()
      
      socket.current.emit("sendMessage",{
        sender:user._id,
        receiver:chatId._id,
        message
      })

      dispatch(setCurrentChatUser({conversation:data.conversation}))
      setConversation(data.conversation)
    } catch (error) {
      console.log(error) 
    }

  }

  const chatArr=conversation ? conversation.map((item:{from:string,to:string,message:string,createdAt:Date}):{}=>{
    return {from:item.from,to:item.to,message:item.message,createdAt:item.createdAt}
  }) : []
  return (
    <div className='chat__room'>
      {
        !chatId._id ? (
          <UserModel setChatId={setChatId} onClickHandler={onClickHandler}></UserModel>
        ) : (
          <ChatUI arr={chatArr as []} id={user._id} handler={onSendMessageHandler} online={isUserOnline} />
        )
      }
    </div>
  )
}

export default Home
