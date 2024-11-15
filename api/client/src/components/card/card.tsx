import React, { useContext, useState } from 'react'
import './card.scss'
import { Link } from 'react-router-dom';
import { ListItemProps } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import apiRequest from '../../lib/apiRequest';


const Card: React.FC<ListItemProps> = ({ id, images, title, address, price, bedroom, bathroom, isSaved }) => {
    const [saved, setSaved] = useState(isSaved);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = async () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }
        setSaved((prev) => !prev);
        try {
            await apiRequest.post("/users/save", { postId: id });
            navigate("/profile");
        } catch (err) {
            console.error(err);
            setSaved((prev) => !prev);
        }
    }

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
                    <img src="/pin.png" alt="pinImage" />
                    <span>{address}</span>
                </p>
                <p className="price">{price} €</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src="/bed.png" alt="bedImage" />
                            <span>{bedroom} bedroom</span>
                        </div>
                        <div className="feature">
                            <img src="/bath.png" alt="bathImage" />
                            <span>{bathroom} bathroom</span>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icon" onClick={handleSave}>
                            <img src="/save.png" alt="saveImage" />
                        </div>
                        <div className="icon">
                            <img src="/chat.png" alt="chatImage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card