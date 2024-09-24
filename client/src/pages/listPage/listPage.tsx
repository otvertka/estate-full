import React from 'react'
import './listPage.scss'
import { listData } from '../../lib/dummydata';
import Filter from '../../components/filter/filter';
import Card from '../../components/card/card';
import { ListItemProps } from '../../types/types';
import MapComponent from '../../components/map/MapComponent';



const ListPage = () => {
    const data = listData;

    return (
        <div className='listPage'>
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {data.map((item: ListItemProps) => (
                        <Card key={item.id} {...item} />
                    ))}
                </div>
            </div>
            <div className="mapContainer">

                <MapComponent items={data} />

            </div>

        </div>
    )
}

export default ListPage