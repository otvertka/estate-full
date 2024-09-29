import React from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
import { userData } from '../../lib/dummydata'
import MapComponent from '../../components/map/MapComponent'
import { useLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development'

const SinglePage = () => {
    const post = useLoaderData();
    // console.log(post);

    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider {...post} images={post.images} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src="/pin.png" alt="pinImage" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">$ {post.price}</div>
                            </div>
                            <div className="user">
                                <img src={userData.img} alt="userImage" />
                                <span>{userData.name}</span>
                            </div>
                        </div>
                        <div className="bottom">{post.description}</div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className="title">General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="/utility.png" alt="utilityImage" />
                            <div className="featureText">
                                <span>Utilities</span>
                                <p>Renter is responsible</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="petImage" className='images' />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                <p>Pets Allowed</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="feeImage" />
                            <div className="featureText">
                                <span>Property Fees</span>
                                <p>Must have 3x the rent in total household income</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png" alt="sizeImage" />
                            <span>80 m2</span>
                        </div>
                        <div className="size">
                            <img src="/bed.png" alt="bedImage" />
                            <span>2 beds</span>
                        </div>
                        <div className="size">
                            <img src="/bath.png" alt="bathImage" />
                            <span>1 bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/school.png" alt="schoolImage" />
                            <div className="featureText">
                                <span>School</span>
                                <p>250m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="peImage" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>100m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="feeImage" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>200m away</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Location</p>
                    <div className="mapContainer">
                        {/* разобраться с типами */}
                        <MapComponent items={[post]} />
                    </div>
                    <div className="buttons">
                        <button>
                            <img src="/chat.png" alt="chatImage" />
                            Send a Message
                        </button>
                        <button>
                            <img src="/save.png" alt="saveImage" />
                            Save the Place
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePage