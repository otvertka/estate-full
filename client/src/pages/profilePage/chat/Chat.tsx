import React, { useState } from 'react'
import './chat.scss'

const Chat = ({ chats }) => {
    const [chat, setChat] = useState(null);
    // console.log(chats);
    return (
        <div className='chat'>
            <div className="messages">
                <h1>Messages</h1>
                <div className="message">
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="profileImage" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="profileImage" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="profileImage" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="profileImage" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
                <div className="message">
                    <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="profileImage" />
                    <span>John Doe</span>
                    <p>Lorem ipsum dolor sit amet...</p>
                </div>
            </div>
            {chat && <div className="chatBox">
                <div className="top">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="userImage" />
                        John Doe
                    </div>
                    <span className="close" onClick={(event: React.MouseEvent<HTMLDivElement>) => setChat(null)}>X</span>
                </div>
                <div className="center">
                    <div className="chatMessage">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, odio.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, odio.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, odio.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, odio.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, odio.</p>
                        <span>1 hour ago</span>
                    </div>
                    <div className="chatMessage own">
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nihil, odio.</p>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className="bottom">
                    <textarea ></textarea>
                    <button>Send</button>
                </div>

            </div>}
        </div>
    )
}

export default Chat