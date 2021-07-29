import React, { useState, useEffect, useCallback } from 'react';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

import { history } from 'router';

export function Hook(companyName) {

    const [state, dispatch] = useAppValue();

    const [search, setSearch] = useState("");

    const [dataset, setDataset] = useState("Indonesia");

    const [visible, setVisible] = useState(false);

    const [toggleSearch, setToggleSearch] = useState(false);

    const deleteCompany = useCallback(async name => {
        const url = endpoints.deleteCompany + "?keyword=" + name;
        const response = await api().get(url);
        if (response.status === 200) {
            dispatch({ type: "showSnackBar", message: "Company deleted successfully", varient: "success" });
            fetchData();
        } else {
            dispatch({ type: "showSnackBar", message: "Failed to delete", varient: "error" });
        }
    }, []);

    const deleteAll = useCallback(async () => {
        const url = endpoints.deleteAllCompanies;
        const response = await api().get(url);
        if (response.status === 200) {
            window.location.reload();
        }
    }, []);

    async function fetchData() {
        const url = endpoints.searchCompanies + "?keyword=" + search + "&dataset=" + dataset;
        const response = await api().get(url);
        if (response.status === 200) {
            dispatch({
                type: "search",
                companies: response.data.companies
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, [dataset, search]);
    return [search, setSearch, dataset, setDataset, visible, setVisible, toggleSearch, setToggleSearch, deleteCompany, deleteAll];
};

