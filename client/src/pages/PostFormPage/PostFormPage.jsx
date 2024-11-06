import { useEffect, useState } from "react";
import "./PostFormPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { useParams } from "react-router-dom";

function PostFormPage({ isEditing = false }) {
    const { postId } = useParams();
    const [postData, setPostData] = useState({});
    const [postDetail, setPostDetail] = useState({});
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        if (isEditing && postId) {
            const fetchPostData = async () => {
                try {
                    const response = await apiRequest.get(`/posts/${postId}`);
                    setPostData(response.data);
                    setPostDetail(response.data.postDetail);
                    setValue(response.data.postDetail.desc);
                    setImages(response.data.images || []);
                } catch (err) {
                    console.error(err);
                    setError("Failed to load post data");
                }
            };
            fetchPostData();
        }
    }, [isEditing, postId]);

    const handleDetailChange = (e) => {
        const { name, value, type } = e.target;

        setPostDetail((prevDetail) => ({
            ...prevDetail,
            [name]: type === 'number' ? parseInt(value) : value,
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const inputs = Object.fromEntries(formData);

        try {
            if (isEditing) {
                await apiRequest.put(`/posts/${postId}`, {
                    postData: {
                        title: inputs.title || postData.title,
                        price: parseInt(inputs.price) || postData.price,
                        address: inputs.address || postData.address,
                        city: inputs.city || postData.city,
                        bedroom: parseInt(inputs.bedroom) || postData.bedroom,
                        bathroom: parseInt(inputs.bathroom) || postData.bathroom,
                        type: inputs.type || postData.type,
                        property: inputs.property || postData.property,
                        latitude: inputs.latitude || postData.latitude,
                        longitude: inputs.longitude || postData.longitude,
                        images: images,
                    },
                    postDetail: {
                        desc: value,
                        utilities: inputs.utilities || postDetail.utilities,
                        pet: inputs.pet || postDetail.pet,
                        income: inputs.income || postDetail.income,
                        size: parseInt(inputs.size) || postDetail.size,
                        school: parseInt(inputs.school) || postDetail.school,
                        bus: parseInt(inputs.bus) || postDetail.bus,
                        restaurant: parseInt(inputs.restaurant) || postDetail.restaurant,
                    }
                });
                navigate("/" + postId);
            } else {

                const res = await apiRequest.post("/posts", {
                    postData: {
                        title: inputs.title,
                        price: parseInt(inputs.price),
                        address: inputs.address,
                        city: inputs.city,
                        bedroom: parseInt(inputs.bedroom),
                        bathroom: parseInt(inputs.bathroom),
                        type: inputs.type,
                        property: inputs.property,
                        latitude: inputs.latitude,
                        longitude: inputs.longitude,
                        images: images,
                    },
                    postDetail: {
                        desc: value,
                        utilities: inputs.utilities,
                        pet: inputs.pet,
                        income: inputs.income,
                        size: parseInt(inputs.size),
                        school: parseInt(inputs.school),
                        bus: parseInt(inputs.bus),
                        restaurant: parseInt(inputs.restaurant),
                    }
                });
                navigate("/" + res.data.id);
            }
        } catch (err) {
            console.error(err);
            setError(err);
        }
    };



    return (
        <div className="newPostPage">
            <div className="formContainer">
                <h1>{isEditing ? "Edit Post" : "Add New Post"}</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input id="title" name="title" type="text" defaultValue={isEditing ? postData.title : ""} />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input id="price" name="price" type="number" defaultValue={isEditing ? postData.price : ""} />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input id="address" name="address" type="text" defaultValue={isEditing ? postData.address : ""} />
                        </div>
                        <div className="item description">
                            <label htmlFor="desc">Description</label>
                            <ReactQuill theme="snow" onChange={setValue} value={value} />

                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input id="city" name="city" type="text" defaultValue={isEditing ? postData.city : ""} />
                        </div>
                        <div className="item">
                            <label htmlFor="bedroom">Bedroom Number</label>
                            <input min={1} id="bedroom" name="bedroom" type="number" defaultValue={isEditing ? postData.bedroom : 1} />
                        </div>
                        <div className="item">
                            <label htmlFor="bathroom">Bathroom Number</label>
                            <input min={1} id="bathroom" name="bathroom" type="number" defaultValue={isEditing ? postData.bathroom : 1} />
                        </div>
                        <div className="item">
                            <label htmlFor="latitude">Latitude</label>
                            <input id="latitude" name="latitude" type="text" defaultValue={isEditing ? postData.latitude : ""} />
                        </div>
                        <div className="item">
                            <label htmlFor="longitude">Longitude</label>
                            <input id="longitude" name="longitude" type="text" defaultValue={isEditing ? postData.longitude : ""} />
                        </div>
                        <div className="item">
                            <label htmlFor="type">Type</label>
                            <select name="type" defaultValue={isEditing ? postData.type : "rent"}>
                                <option value="rent">Rent</option>
                                <option value="buy">Buy</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="type">Property</label>
                            <select name="property" defaultValue={isEditing ? postData.property : "apartment"}>
                                <option value="apartment">Apartment</option>
                                <option value="house">House</option>
                                <option value="condo">Condo</option>
                                <option value="land">Land</option>
                            </select>
                        </div>
                        
                        <div className="item">
                            <label htmlFor="utilities">Utilities Policy</label>
                            <select name="utilities" value={postDetail.utilities || "owner"} onChange={handleDetailChange}>
                                <option value="owner">Owner is responsible</option>
                                <option value="tenant">Tenant is responsible</option>
                                <option value="shared">Shared</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="pet">Pet Policy</label>
                            <select name="pet" value={postDetail.pet || "allowed"} onChange={handleDetailChange}>
                                <option value="allowed">Allowed</option>
                                <option value="not-allowed">Not Allowed</option>
                            </select>
                        </div>
                        <div className="item">
                            <label htmlFor="income">Income Policy</label>
                            <input
                                id="income"
                                name="income"
                                type="text"
                                placeholder="Income Policy" value={postDetail.income || ""} onChange={handleDetailChange}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="size">Total Size (m²)</label>
                            <input min={0} id="size" name="size" type="number" value={postDetail.size || 0} onChange={handleDetailChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="school">School</label>
                            <input min={0} id="school" name="school" type="number" value={postDetail.school || 0} onChange={handleDetailChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="bus">bus</label>
                            <input min={0} id="bus" name="bus" type="number" value={postDetail.bus || 0} onChange={handleDetailChange} />
                        </div>
                        <div className="item">
                            <label htmlFor="restaurant">Restaurant</label>
                            <input min={0} id="restaurant" name="restaurant" type="number" value={postDetail.restaurant || 0} onChange={handleDetailChange} />
                        </div>
                        <button className="sendButton">{isEditing ? "Update" : "Add"}</button>
                        {error && <span>error</span>}
                    </form>
                </div>
            </div>
            <div className="sideContainer">
                {images.slice(1, 2).map((image, index) => (
                    <img src={image} key={index} alt="estate image" />
                ))}
                <UploadWidget
                    uwConfig={{
                        cloudName: "otvertka",
                        uploadPreset: "estate",
                        multiple: true,
                        maxImageFileSize: 5000000,
                        folder: "posts",
                    }}
                    setState={setImages}
                />

            </div>
        </div>
    );
}

export default PostFormPage;