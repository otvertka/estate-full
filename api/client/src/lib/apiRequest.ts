import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://city-realty-e54047fa06b7.herokuapp.com/api",
    withCredentials: true,
})

export default apiRequest;