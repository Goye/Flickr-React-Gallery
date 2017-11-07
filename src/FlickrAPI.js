import { API_KEY } from './constants.js';

//TODO add more items per page
export const getPhotosByKeyword = (searchKeyword = 'cats') => {
    const url = `https://api.flickr.com/services/rest/?api_key=${API_KEY}&method=flickr.photos.search&format=json&nojsoncallback=1&&per_page=6&page=1&text=${searchKeyword}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => data.photos.photo)
        .catch(error => {
            throw error;
        });
};
