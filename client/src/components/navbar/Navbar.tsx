import React, { useState } from 'react';
import "./navbar.scss";
import { Link } from 'react-router-dom';


const Navbar = () => {
    const [open, setOpen] = useState<boolean>(false);

    const user = true;
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
                {user ? (
                    <div className='user'>
                        <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="userPhoto" />
                        <span>John Doe</span>
                        <Link to="/profile" className='profile'>
                            <div className="notification">3</div>
                            <span>Profile</span>
                        </Link>
                    </div>) : (
                    <>
                        <a href='/'>Sign in</a>
                        <a href='/' className='register'>Sign up</a>
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
