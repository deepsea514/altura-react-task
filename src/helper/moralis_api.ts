import axios from 'axios';

export default axios.create({
    baseURL: "https://deep-index.moralis.io/api/v2/",
    headers: {
        "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY
    }
})