export const checkAuth = () => {
    const data = sessionStorage.getItem("user");
    if (data) return true;
    else return false;
}

export const getAccessToken = () => {
    try {
        const token = sessionStorage.getItem("token");
        if (token) return token;
    } catch (error) {
        return null;
    }
}

export const setToken = (token) => {
    try {
        const result = sessionStorage.setItem("token", token);

        if (result) return result;
    } catch (error) {
        return null;
    }
}

export const setSession = (label, value) => {
    let data = JSON.stringify(value);
    sessionStorage.setItem(label, data);
}

export const getSession = (key) => {
    let data = sessionStorage.getItem(key);
    return JSON.parse(data)
}

export const removeSession = (key) => {
    sessionStorage.removeItem(key);
}