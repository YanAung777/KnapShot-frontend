import axios from 'axios';

//util
import { getAccessToken } from 'util/check-auth';

//constants
import endpoints from 'constants/endpoints';

export default function () {
    var saveToken = getAccessToken();
    return axios.create({
        baseURL: endpoints.baseURL,
        headers: {
            'Authorization': `Bearer ${saveToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        }
    });
};

