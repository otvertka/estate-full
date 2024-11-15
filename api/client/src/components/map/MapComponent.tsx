import React from 'react'
import './map.scss';
import { MapContainer, TileLayer } from 'react-leaflet'
import Pin from '../pin/Pin'
import { ListItemProps, SingleItemProps } from '../../types/types'

interface MapProps {
    items: (ListItemProps | SingleItemProps)[];
}

const MapComponent: React.FC<MapProps> = ({ items }) => {

    return (
        <MapContainer center={items.length === 1
            ? [items[0].latitude, items[0].longitude]
            : [51.505, -0.09]
        }
            zoom={7} scrollWheelZoom={false} style={{ height: '100%' }} className='map'>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {items.map(item => (
                <Pin
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    img={item.images[0]}  // Handle img or images
                    images={item.images}  // Handle img or images
                    bedroom={'bedroom' in item ? item.bedroom : item.bedRooms}
                    bathroom={item.bathroom}
                    price={item.price}
                    address={item.address}
                    latitude={item.latitude}
                    longitude={item.longitude}
                />
            ))}
        </MapContainer>
    )
}

export default MapComponent