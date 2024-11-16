import axios from 'axios';

const API_URL = 'https://newsapi.org/v2/everything';
const API_KEY = '77c4737c14bf4ed0b21a0d121dfaaf41'; 

//efc82b912984444b9eafb9353e321b36
//e24eb4023a604644afc8d06e1280b4fd
export const fetchNews = (query='', from='', sortBy = '',domains ='') => {
    return axios
        .get(API_URL, {
            params: {
                q: query,
                sortBy: sortBy,               
                apiKey: API_KEY,
                domains:domains,
            from:from,
        to:new Date(Date.now()).toISOString().split('T')[0],}
        })
        .then(response => response.data.articles)
        .catch(error => {
            console.error('Ошикба запроса новостей:', error);
            throw error;
        });
};
