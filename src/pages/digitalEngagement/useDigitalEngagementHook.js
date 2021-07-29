import React, { useState, useEffect } from 'react';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

function checkPass(obj) {
    let pass = false
    for (let [key, value] of Object.entries(obj)) {
        if (Object.keys(value).length) pass = true
        break;
    }
    return pass
}

export function useDigitalEngagementHook() {

    const [data, setData] = useState([])

    const [state, dispatch] = useAppValue();
    const { selectedDataset, selectedFilename, frimographicFilter, totalCountries,
        digitalPresenceFilter, technologyFilter,restrictTechnologyFilter,noneTechnologyCompanies } = state;

    // useEffect(() => {
    //     async function fetchDatasets() {
    //         const response = await api().get(endpoints.getAllDatasets);
    //         if (response.status === 200) {
    //             dispatch({
    //                 type: "setDatasets",
    //                 datasets: response.data.datasets
    //             });
    //         }
    //     }

    //     async function fetchFilenames() {
    //         const response = await api().get(endpoints.getFilenames);
    //         if (response.status === 200) {
    //             dispatch({
    //                 type: "setFilenames",
    //                 filenames: response.data.filenames
    //             });
    //         }
    //     }

    //     if (!selectedDataset) fetchDatasets();
    //     if (!selectedFilename) fetchFilenames();
    // }, []);

    useEffect(() => {
        dispatch({ type: "listLoading" });

        let obj = {
            dataset: selectedDataset,
            file_name: selectedFilename,
            digitalPresenceFilter,
            frimographicFilter,
        }

        if (checkPass(technologyFilter)) {
            obj.technologyFilter = technologyFilter
            obj.restrictTechnologyFilter = restrictTechnologyFilter
            if (noneTechnologyCompanies && noneTechnologyCompanies.length) obj.otherCompanyIds = noneTechnologyCompanies
        }
        async function fetchData() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + 1, obj
            );
            if (response.status === 200) {
                dispatch({
                    type: "resetCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        selectedFilename && fetchData();

    }, [selectedDataset, selectedFilename, noneTechnologyCompanies]);


    useEffect(() => {

        async function fetchDigitalEngagement() {
            const response = await api().post(endpoints.digitalEngagementSelect,
                {
                    dataset: selectedDataset,
                    file_name: selectedFilename,
                    frimographicFilter,
                    digitalPresenceFilter,
                    technologyFilter,
                    restrictTechnologyFilter
                });
            if (response.status === 200) {
                dispatch({
                    type: "setDigitalEngagementPageData",
                    data: response.data.data,
                    results: response.data.results,
                    provider: response.data.provider,
                    digitalAssets: response.data.digitalAssets,
                    digitalAssetsData: response.data.digitalAssetsData
                });
            }
        }

        async function fetchData() {
            const response = await api().post(endpoints.totalDigitalEngagement,
                {
                    // dataset: selectedDataset, //changes here
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    frimographicFilter,
                    digitalPresenceFilter,

                });

            if (response.status === 200) {
                // console.log("res", response)
                // dispatch({
                //     type: "setTotalDigitalEngagement",
                //     data: response.data.data,
                //     count: response.data.count,
                // });
            }
        }



        // fetchData();
        fetchDigitalEngagement();
    }, [ frimographicFilter, digitalPresenceFilter, technologyFilter,totalCountries]);

    return [data]

};

