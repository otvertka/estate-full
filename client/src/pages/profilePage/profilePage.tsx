import React, { useContext, useEffect } from 'react';
import './profilePage.scss';

import List from '../../components/list/List';
import Chat from './chat/Chat';
import apiRequest from '../../lib/apiRequest';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {

    const { currentUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout");
            updateUser(null);
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }
    return (

        <div className='profilePage'>
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User information</h1>
                        <Link to="/profile/update">
                            <button>Update profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>
                            Avatar:
                            <img src={currentUser.avatar || "/noavatar.jpg"}
                                alt="profileImage" />
                        </span>
                        <span>Username: <b>{currentUser.username}</b></span>
                        <span>E-mail: <b>{currentUser.email}</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/add">
                            <button>Create New Post</button>
                        </Link>
                    </div>
                    <List />
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <List />
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                    <Chat />
                </div>
            </div>
        </div>
    )

}

export default ProfilePage