import React, { useState, useEffect, useCallback } from 'react';
import moment from 'moment';
//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//route
import { history } from 'router/history';

//util
import { setSession } from 'util/check-auth';

export function useLoginHook() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [data, setData] = useState(null);

    const onSubmit = useCallback(async (email, password, date) => {
        setLoading(true);
        setError("");
        try {
            const response = await api().post(endpoints.Login, { email, password });
            // console.log("response", response)
            setLoading(false);
            if (response.data.message === "Successful") {
                setSession("user", response.data.user);
                history.push("/");
            }
            else setError(response.data.message);
        } catch (err) {
            setError(err);
        }
    }, [email, password, loading, error]);

    return [email, setEmail, password, setPassword, loading, error, onSubmit];
};

