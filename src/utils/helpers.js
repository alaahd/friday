import axios from 'axios';

const helpers = {
    getEarthQuickData (url) {
        return axios.get(url);
    }
}

export default helpers;


