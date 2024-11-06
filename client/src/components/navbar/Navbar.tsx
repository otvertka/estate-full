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

    if (currentUser) fetch();

    return (
        <nav>
            <div className='left'>
                <a href='/' className='logo'>
                    <img src='/public/images/navbar/logo1.png' alt='logoImage' />
                    <span>CityRealty</span>
                </a>
                <a className='nav-link' href='/'>About</a>
                <a className='nav-link' href='/'>Contact</a>
                <a className='nav-link' href='/'>Agents</a>
            </div>
            <div className='right'>
                {currentUser ? (
                    <div className='user'>
                        <img src={currentUser.avatar || "/noavatar.jpg"} alt="userPhoto" />
                        <span>{currentUser.username}</span>
                        <Link to="/profile" className='profile'>
                            {number > 0 && <div className="notification">{number}</div>}
                            <span>Profile</span>
                        </Link>
                    </div>) : (
                    <>
                        <a href='/login' className='authButton'>Sign in</a>
                        <a href='/register' className='authButton register'>Sign up</a>
                    </>
                )
                }

                <div className='menuIcon'>
                    <div className={open ? "burger open" : "burger"} onClick={() => setOpen(!open)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href='/profile'>Profile</a>
                    <a href='/'>Home</a>
                    <a href='/'>About</a>
                    <a href='/'>Contact</a>
                    <a href='/'>Agents</a>
                    {!currentUser && (
                        <>
                            <a href='/login'>Sign in</a>
                            <a href='/register'>Sign up</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
