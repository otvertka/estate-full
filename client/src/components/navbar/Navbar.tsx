import React, { useContext, useState } from 'react';
import "./navbar.scss";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useNotificationStore } from "../../lib/notificationStore"


const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false);
    const { currentUser } = useContext(AuthContext);

    const fetch = useNotificationStore((state) => state.fetch);
    const number = useNotificationStore((state) => state.number);

    console.log(number)

    if (currentUser) fetch();

    return (
        <nav>
            <div className='left'>
                <a href='/' className='logo'>
                    <img src='/public/images/navbar/logo1.png' alt='logoImage' />
                    <span>CityRealty</span>
                </a>
                <a href='/'>Home</a>
                <a href='/'>About</a>
                <a href='/'>Contact</a>
                <a href='/'>Agents</a>
            </div>
            <div className='right'>
                {currentUser ? (
                    <div className='user'>
                        <img src={currentUser.avatar || "/noavatar.jpg"} alt="userPhoto" />
                        <span>{currentUser.username}</span>
                        <Link to="/profile" className='profile'>
                            <div className="notification">{number}</div>
                            <span>Profile</span>
                        </Link>
                    </div>) : (
                    <>
                        <a href='/login'>Sign in</a>
                        <a href='/register' className='register'>Sign up</a>
                    </>
                )
                }
                <div className='menuIcon'>
                    <img src='/public/menu.png' alt='burgerImage' onClick={() => setOpen(!open)} />
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href='/'>Home</a>
                    <a href='/'>About</a>
                    <a href='/'>Contact</a>
                    <a href='/'>Agents</a>
                    <a href='/'>Sign in</a>
                    <a href='/'>Sign up</a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
