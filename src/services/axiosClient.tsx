import axios from 'axios';
import queryString from 'query-string';

export const baseURL = process.env.NODE_ENV !== "development" ? `${process.env.NEXT_PUBLIC_BASE_URL}/api` : "http://localhost:4000/api";
// export const API_DOMAIN = String(process.env.NEXT_PUBLIC_API_DOMAIN);
// export const baseURLv2 = `${process.env.NEXT_PUBLIC_BASE_URL_V2}/api/v2`;
// export const baseURLWordService = `${process.env.NEXT_PUBLIC_BASE_URL_WORDS_SERVICE}`;

const axiosClient = axios.create({
    baseURL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

// export const axiosClientV2 = axios.create({
//     baseURL: baseURLv2,
//     headers: {
//         'content-type': 'application/json',
//     },
//     paramsSerializer: (params) => queryString.stringify(params),
// });

// export const axiosClientWordsService = axios.create({
//     baseURL: baseURLWordService,
//     headers: {
//         'content-type': 'application/json',
//     },
//     paramsSerializer: (params) => queryString.stringify(params),
// });

export default axiosClient;
