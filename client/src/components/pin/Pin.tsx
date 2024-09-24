import React from 'react'
import './pin.scss'
import { Marker, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { ListItemProps } from '../../types/types'

const Pin: React.FC<ListItemProps> = ({ id, img, latitude, longitude, title, bedroom, price }) => {
    return (
        <Marker position={[latitude, longitude]}>
            <Popup>
                <div className="popupContainer">
                    <img src={img} alt="apartImage" />
                    <div className="textContainer">
                        <Link to={`/${id}`}>{title}</Link>
                        <span>{bedroom} bedroom</span>
                        <b>$ {price}</b>
                    </div>
                </div>
            </Popup>
        </Marker>
    )
}

export default Pin