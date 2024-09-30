import React from 'react'
import './listPage.scss'

import Filter from '../../components/filter/filter';
import Card from '../../components/card/card';
import { ListItemProps } from '../../types/types';
import MapComponent from '../../components/map/MapComponent';
import { useLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development';



const ListPage = () => {
    const posts = useLoaderData();

    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {posts.map((item: ListItemProps) => (
                        <Card key={item.id} {...item} />
                    ))}
                </div>
            </div>
            <div className="mapContainer">

                <MapComponent items={posts} />

            </div>

        </div>
    )
}

export default ListPage