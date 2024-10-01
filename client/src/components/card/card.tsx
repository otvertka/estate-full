import React from 'react'
import './card.scss'
import { Link } from 'react-router-dom';
import { ListItemProps } from '../../types/types';


const Card: React.FC<ListItemProps> = ({ id, images, title, address, price, bedroom, bathroom }) => {
    return (
        <div className='card'>
            <Link to={`/${id}`} className='imageContainer'>
                <img src={images[0]} alt="apartmentImage" />
            </Link>
            <div className="textContainer">
                <h2 className="title">
                    <Link to={`/${id}`}>{title}</Link>
                </h2>
                <p className="address">
                    <img src="/public/pin.png" alt="pinImage" />
                    <span>{address}</span>
                </p>
                <p className="price">{price}</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src="/public/bed.png" alt="bedImage" />
                            <span>{bedroom} bedroom</span>
                        </div>
                        <div className="feature">
                            <img src="/public/bath.png" alt="bathImage" />
                            <span>{bathroom} bathroom</span>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icon">
                            <img src="/public/save.png" alt="saveImage" />
                        </div>
                        <div className="icon">
                            <img src="/public/chat.png" alt="chatImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card