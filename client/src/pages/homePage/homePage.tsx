import React, { useContext } from 'react'
import './homePage.scss'
import SearchBar from '../../components/searchBar/searchBar'
import { AuthContext } from '../../context/AuthContext'

const HomePage: React.FC = () => {
    const { currentUser } = useContext(AuthContext);

    console.log(currentUser);
    return (
        <div className='homePage'>
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">
                        Find Real Estate & Get Your Dream Place
                    </h1>
                    <p>Find your dream home with City Realty, your trusted partner for buying, selling, and renting properties. With our expert team and a vast selection of listings, we make your real estate journey seamless and stress-free.</p>
                    <SearchBar />
                    <div className="boxes">
                        <div className="box">
                            <h1>16+</h1>
                            <h2>Years of experience</h2>
                        </div>
                        <div className="box">
                            <h1>200</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>2000+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src='/public/bg.png' />
            </div>
        </div>
    )
}

export default HomePage