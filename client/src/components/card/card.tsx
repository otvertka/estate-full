import React, { useContext, useState } from 'react'
import './card.scss'
import { Link } from 'react-router-dom';
import { ListItemProps } from '../../types/types';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import apiRequest from '../../lib/apiRequest';
// import axios from 'axios';


const Card: React.FC<ListItemProps> = ({ id, images, title, address, price, bedroom, bathroom, isSaved }) => {

    const [saved, setSaved] = useState(isSaved);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSave = async () => {
        console.log("I am clicked!");
        if (!currentUser) {
            navigate("/login");
            return;
        }
        setSaved((prev) => !prev);
        try {
            await apiRequest.post("/users/save", { postId: id });
            navigate("/profile");
        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev);
        }
    }


    // const handleDelete = async () => {
    //     try {
    //         const response = await axios.delete(`http://localhost:8800/api/posts/${id}`, {
    //             withCredentials: true,
    //         });
    //         if (response.)
    //     } catch (err) {
    //         console.log('Failed to delete post:', err);
    //         alert('Failed to delete post')
    //     }
    // }
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
                <p className="price">{price} €</p>
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
                        <div className="icon" onClick={handleSave}>
                            <img src="/public/save.png" alt="saveImage" />
                        </div>
                        <div className="icon">
                            <img src="/public/chat.png" alt="chatImage" />
                        </div>
                        {/* <div className="icon">
                            <img src="/public/delete.png" alt="deleteImage" />
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card