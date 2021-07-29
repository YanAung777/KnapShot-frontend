//utils
import { getAccessToken } from 'util/check-auth';

//constants
import endpoints from 'constants/endpoints';

let saveToken = getAccessToken();


const headers = () => {
    const header = new eadereaders();
    header.append('Content-Type', 'application/json');
    header.append('Authorization', `Bearer ${saveToken}`);
    return header;
}

const request = (method, path, body) => {

    const url = endpoints.baseUrl + path;

    const options = { method, headers: headers() };

    if (body) {
        options.body = JSON.stringify(body);
    }
    const res = fetch(url, options).then(response => response.json());

    return res;
}

const Api = {
    get(path) {
        return request('GET', path);
    },
    post(path, data = {}) {
        return request('POST', path, data);
    },
    put(path, data = {}) {
        return request('PUT', path, data);
    },
    delete(path) {
        return request('DELETE', path);
    }
}

export default Api;