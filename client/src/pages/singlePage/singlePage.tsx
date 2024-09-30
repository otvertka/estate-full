import React from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
// import { userData } from '../../lib/dummydata'
import MapComponent from '../../components/map/MapComponent'
import { useLoaderData } from 'react-router-dom/dist/umd/react-router-dom.development';
import DOMPurify from "dompurify";

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
                                <img src={post.user.avatar} alt="userImage" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom" dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.postDetail.desc),
                        }}></div>
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
                                {post.postDetail.utilities === "owner" ? (
                                    <p>Owner is responsible</p>) : (
                                    <p>Tenant is responsible</p>
                                )}
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="petImage" className='images' />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                {post.postDetail.pet === "allowed" ?
                                    <p>Pets Allowed</p> : <p>Pets not Allowed</p>
                                }
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="feeImage" />
                            <div className="featureText">
                                <span>Income Policy</span>
                                <p>{post.postDetail.income}</p>
                            </div>
                        </div>
                    </div>
                    <p className="title">Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="/size.png" alt="sizeImage" />
                            <span>{post.postDetail.size}m2</span>
                        </div>
                        <div className="size">
                            <img src="/bed.png" alt="bedImage" />
                            <span>{post.bedroom} beds</span>
                        </div>
                        <div className="size">
                            <img src="/bath.png" alt="bathImage" />
                            <span>{post.bathroom} bathroom</span>
                        </div>
                    </div>
                    <p className="title">Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="/school.png" alt="schoolImage" />
                            <div className="featureText">
                                <span>School</span>
                                <p>{post.postDetail.school > 999 ? post.postDetail.school / 1000 + "km" : post.postDetail.school + "m"} away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="/pet.png" alt="peImage" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>{post.postDetail.bus > 999 ? post.postDetail.bus / 1000 + "km" : post.postDetail.bus + "m"} away</p>

                            </div>
                        </div>
                        <div className="feature">
                            <img src="/fee.png" alt="feeImage" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>{post.postDetail.restaurant > 999 ? post.postDetail.restaurant / 1000 + "km" : post.postDetail.restaurant + "m"} away</p>

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
        </div >
    )
}

export default SinglePage