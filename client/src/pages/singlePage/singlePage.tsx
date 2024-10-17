import React, { useContext, useState } from 'react'
import './singlePage.scss'
import Slider from '../../components/slider/Slider'
// import { userData } from '../../lib/dummydata'
import MapComponent from '../../components/map/MapComponent'
import { useLoaderData, useNavigate } from 'react-router-dom/dist/umd/react-router-dom.development';
import DOMPurify from "dompurify";
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const SinglePage = () => {
    const post = useLoaderData();
    console.log(post);
    const [saved, setSaved] = useState(post.isSaved);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // const previewImages = post.images.slice(0, 4);


    const handleSave = async () => {
        if (!currentUser) {
            navigate("/login");
        }
        setSaved((prev) => !prev);
        try {
            await apiRequest.post("/users/save", { postId: post.id });
        } catch (err) {
            console.log(err);
            setSaved((prev) => !prev);
        }
    }

    const handleDelete = async () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        const isConfirmed = window.confirm("Are you sure you want to delete this post?");
        if (!isConfirmed) {
            return;
        }

        try {
            const response = await apiRequest.delete(`/posts/${post.id}`, {
                withCredentials: true,
            });
            if (response.status === 200) {
                alert('Post deleted successfully');
                navigate("/profile");
            }
        } catch (err) {
            console.log('Failed to delete post:', err)
            alert('Failed to delete post !')
        }
    }

    const handleEdit = async () => {
        if (!currentUser) {
            navigate("/login");
            return;
        }

        try {

        } catch (err) {
            console.log(err)
        }
    }

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
                            <span>{post.postDetail.size}m²</span>
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
                        <button onClick={handleSave}
                            style={{
                                backgroundColor: saved ? "#fece51" : "white",
                            }}>
                            <img src="/save.png" alt="saveImage" />
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>
                        <button onClick={handleDelete} >
                            <img src="../../../public/delete.png" />
                            Delete Post
                        </button>
                        <button onClick={handleEdit} >
                            {/* <img src="../../../public/delete.png" /> */}
                            Edit Post
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default SinglePage