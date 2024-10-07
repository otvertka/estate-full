import React, { useContext, useState } from 'react'
import './chat.scss'
import { AuthContext } from '../../../context/AuthContext';
import apiRequest from '../../../lib/apiRequest';
import { format } from "timeago.js";

interface Message {
    id: string;
    text: string;
    userId: string;
    createdAt: string;
}
interface User {
    id: string;
    username: string;
    avatar?: string;
}

interface Chat {
    id: string;
    receiver: User;
    messages: Message[];
    lastMessage: string;
    seenBy: string[];
}

interface ChatProps {
    chats: Chat[];
}

const Chat: React.FC<ChatProps> = ({ chats }) => {
    const [chat, setChat] = useState<Chat | null>(null);
    console.log(chats);
    const { currentUser } = useContext(AuthContext);

    const handleOpenChat = async (id: string, receiver) => {
        try {
            const res = await apiRequest("/chats/" + id);
            setChat({ ...res.data, receiver })
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const text = formData.get("text");

        if (!text || !chat) return;
        try {
            const res = await apiRequest.post("/messages/" + chat.id, { text });
            setChat((prev) => ({ ...prev!, messages: [...(prev?.messages || []), res.data] }));
            e.currentTarget.reset();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='chat'>
            <div className="messages">
                <h1>Messages</h1>
                {chats?.map((c) =>
                (
                    <div className="message" key={c.id} style={{
                        backgroundColor: c.seenBy.includes(currentUser.id) ? "white" : "#fecd514e",
                    }}
                        onClick={() => handleOpenChat(c.id, c.receiver)}>
                        <img src={c.receiver.avatar || "/noavatar.jpg"}
                            alt="profileImage" />
                        <span>{c.receiver.username}</span>
                        <p>{c.lastMessage}</p>
                    </div>
                )
                )}

            </div>
            {chat && <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src={chat.receiver.avatar || "noavatar.jpg"} alt="userImage" />
                        {chat.receiver.username}
                    </div>
                    <span className="close" onClick={(event: React.MouseEvent<HTMLDivElement>) => setChat(null)}>X</span>
                </div>
                <div className="center">
                    {chat.messages.map((message) => (
                        <div className="chatMessage"
                            style={{
                                alignSelf: message.userId === currentUser.id ? "flex-end" : "flex-start",
                                textAlign: message.userId === currentUser.id ? "right" : "left",
                            }}
                            key={message.id}>
                            <p>{message.text}</p>
                            <span>{format(message.createdAt)}</span>
                        </div>

                    ))}
                </div>
                <form onSubmit={handleSubmit} className="bottom">
                    <textarea name="text"></textarea>
                    <button>Send</button>
                </form>

            </div>}
        </div>
    )
}

export default Chat