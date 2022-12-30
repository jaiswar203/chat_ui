import { RiSendPlaneFill } from "react-icons/ri"
import { Avatar, Input } from '@nextui-org/react'
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../../redux/hook";
import { format } from "timeago.js";
import { motion } from "framer-motion"

interface AppProps {
    arr: [],
    id: string,
    handler: (message: string) => void,
    online:boolean
}

enum MESSAGES {
    LIMIT = 15
}

export default function ChatUI({ arr, id, handler,online }: AppProps) {
    const [message, setMessage] = useState<string>("")
    const ref = useRef<HTMLDivElement>(null)
    const { currentChatUser } = useAppSelector(state => state.util)

    const [limit, setLimit] = useState(MESSAGES.LIMIT)

    useEffect(() => {
        if(ref){
            ref.current?.scrollIntoView({ behavior: "smooth" })
        }
    }, [arr])

    const onSendMessage = () => {
        setMessage("")
        handler(message)
    }

    const messages = arr.length > 30 ? arr.slice(arr.length - limit) : arr

    return (<div className="chat__room-model comp">
        <div className="comp__info">
            <div className="left">
                <Avatar src={"https://res.cloudinary.com/dykwfe4cr/image/upload/v1628828168/samples/people/boy-snow-hoodie.jpg"} size="lg" />
            </div>
            <div className="right">
                <div className="right__upper">
                    <h4>{currentChatUser.data.name}</h4>
                    <div className={`status ${!online ? "offline" :"" }`}>
                        <div className="circle"></div>
                        <p>{ online ? "Online" : "Offline"}</p>
                    </div>
                </div>
                <p>@{currentChatUser.data.username}</p>
            </div>
        </div>
        <div className="comp__chat">
            {
                arr.length > 30 && (
                    <motion.div className="elem limij" whileTap={{ scale: .98 }} style={{ cursor: "pointer" }} onClick={() => setLimit(prev => prev + 15)}>
                        <p>More</p>
                    </motion.div>
                )
            }
            {messages.map((item: { from: string, to: string, message: string, createdAt }, index: number) =>
                <div className={`outer ${item.from !== id && "left"}`} key={index}>
                    <div className={`elem ${item.from !== id && "left"}`} ref={ref}>
                        <p>{item.message}</p>
                    </div>
                    <p className="timeline">{format(item.createdAt)}</p>
                </div>
            )}
        </div>
        <div className="comp__input">
            <Input fullWidth clearable={false} value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && onSendMessage()} placeholder='Type your message...' contentRightStyling={false} contentRight={<div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: '.5rem',
                background: "white",
                borderRadius: "50%",
                cursor: "pointer"
            }}>
                <RiSendPlaneFill size={25} onClick={() => handler(message)} />
            </div>} />
        </div>
    </div>);
}

