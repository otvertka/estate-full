import React, { Suspense } from 'react'
import './listPage.scss'
import Filter from '../../components/filter/filter';
import Card from '../../components/card/card';
import MapComponent from '../../components/map/MapComponent';
import { useLoaderData } from 'react-router-dom';
import { Await } from 'react-router-dom';

function ListPage() {
    const data = useLoaderData();

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    <Suspense fallback={<p>Loading...</p>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={<p>Error loading posts!</p>}
                        >
                            {(postResponse) =>
                                postResponse.data.map((post) => (
                                    <Card key={post.id} {...post} />
                                ))
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="mapContainer">
                <Suspense fallback={<p>Loading...</p>}>
                    <Await
                        resolve={data.postResponse}
                        errorElement={<p>Error loading posts!</p>}
                    >
                        {(postResponse) => <MapComponent items={postResponse.data} />}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

export default ListPage