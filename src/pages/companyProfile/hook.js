import React, { useState, useEffect } from 'react';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

export function Hook(companyName) {

    const [activeTab, setActiveTab] = useState(0);

    const [company, setCompany] = useState({});

    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    }

    useEffect(() => {
        async function fetchCompany() {
            const response = await api().get(`${endpoints.getCompanyByName}/${companyName}`);
            if (response.status === 200) {
                setCompany(response.data.company);
            }
        }
        fetchCompany();
    }, [companyName]);

    return [activeTab, handleChange, company];
};


