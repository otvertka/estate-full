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
                    <p>Lorsimilique ipsa libero dssitatibibero, eveniet commodi voluptatum quaerat officiis, excepturi ab repellat. In necessitatibus magni repellendus adipisci, deleniti earum sapiente quisquam vero, illo quia id, corrupti libero. Ducimus nisi libero fugiat quidem animi assumenda facere debitis nam, inventore, quia culpa ipsum.</p>
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