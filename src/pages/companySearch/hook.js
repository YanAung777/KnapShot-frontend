import React, { useState, useEffect } from 'react';

import FetchRetry from 'fetch-retry';

import axios from 'axios';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

//route
import { history } from 'router';

export function Hook(companyName, dataset) {

    let search = endpoints.searchCompany + "/?keyword=" + companyName + "&dataset=" + dataset;
    let status = endpoints.searchCompanyStatus + "/?keyword=" + companyName + "&dataset=" + dataset;
    let result = endpoints.searchCompanyResult + "/?keyword=" + companyName + "&dataset=" + dataset;

    const [company, setCompany] = useState({});

    const getResult = async () => {
        const response = await api().get(result);
        if (response.status === 200) {
            history.push(`/company/${companyName}`);
        }
    }

    const checkStatus = async () => {
        const response = await api().get(status);
        if (response.data.status === "done") {
            setCompany(response.data.detailedStatus);
            await getResult();
        } else if (response.data.status === "processing") {
            setCompany(response.data.detailedStatus);
            await checkCompany();
        } else {
        }
    }

    const checkCompany = () => {
        setTimeout(async () => {
            await checkStatus();
        }, 9000);
    }

    const getCompany = async () => {
        const response = await api().get(search);
        if (response.data.status === "accepted" || response.data.status === "already started") {
            await checkStatus();
        }
    }

    useEffect(() => {
        async function fetchData() {
            const response = await api().get(`${endpoints.getCompanyByName}/${companyName}`);
            if (response.status === 200) {
                history.push(`/company/${companyName}`);
            } else {
                await getCompany();
            }
        }
        fetchData();
    }, [companyName, dataset]);

    return [company];
};
