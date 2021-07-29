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

export function useTechnologyHook() {

    const [data, setData] = useState([])

    const [state, dispatch] = useAppValue();
    const { selectedDataset, selectedFilename, totalCountries, userDigitalEngagementFilter, userSubPartner,userPartner, userProductServiceFilter,
        userCompanyExpertiseFilter, userCategoryFilter, userEmpSizeFilter, userYearIOFilter,
        frimographicFilter, digitalPresenceFilter, technologyFilter, userCompanyFilter,
        restrictTechnologyFilter, noneTechnologyCompanies, userFavCompFilter } = state;

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
            dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
            file_name: selectedFilename,
            digitalPresenceFilter,
            frimographicFilter,
            expertiseCompanyFilter: userCompanyExpertiseFilter,
            categoryFilter: userCategoryFilter,
            empSizeFilter: userEmpSizeFilter,
            yearIOFilter: userYearIOFilter,
            digitalEngagementFilter: userDigitalEngagementFilter,
            partnerFilter: [...userSubPartner,...userPartner],
            productServiceFilter: userProductServiceFilter,
            companyFilter: userCompanyFilter,
            userFavCompFilter: userFavCompFilter
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

    }, [frimographicFilter, digitalPresenceFilter, technologyFilter, noneTechnologyCompanies, userDigitalEngagementFilter, userProductServiceFilter,
        userSubPartner,userPartner,userCompanyFilter, userCompanyExpertiseFilter, userCategoryFilter, userEmpSizeFilter, userYearIOFilter, userFavCompFilter,selectedDataset]);


    useEffect(() => {

        async function fetchTotalTechnology() {
            dispatch({
                type: "setTotalTechnology",
                data: [],
            });
            dispatch({
                type: "resetSelectedTechnologyCompanies",
                companies: [],
                count: 0,
                loading: false
             });
            const response = await api().post(endpoints.totalTechnology, {
                // dataset: selectedDataset, // changes were here 
                dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                file_name: selectedFilename,
                frimographicFilter,
                digitalPresenceFilter,
                technologyFilter,
                restrictTechnologyFilter,
                // expertiseCompanyFilter: userCompanyExpertiseFilter,
                categoryFilter: userCategoryFilter,
                empSizeFilter: userEmpSizeFilter,
                yearIOFilter: userYearIOFilter,
                digitalEngagementFilter: userDigitalEngagementFilter,
                partnerFilter: [...userSubPartner,...userPartner],
                productServiceFilter: userProductServiceFilter,
                companyFilter: userCompanyFilter,
                userFavCompFilter: userFavCompFilter
            });
            if (response.status === 200) {
                setData(response.data.data)
                dispatch({
                    type: "setTotalTechnology",
                    data: response.data.data,
                });
            }
        }

        async function fetchData() {
            let obj = {
                // dataset: selectedDataset, // changes here
                // test: "hi",
                dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                file_name: selectedFilename,
                digitalPresenceFilter,
                frimographicFilter,
                categoryFilter: userCategoryFilter,
                empSizeFilter: userEmpSizeFilter,
                yearIOFilter: userYearIOFilter,
                digitalEngagementFilter: userDigitalEngagementFilter,
                partnerFilter: [...userSubPartner,...userPartner],
                productServiceFilter: userProductServiceFilter,
                companyFilter: userCompanyFilter,
                userFavCompFilter: userFavCompFilter
            }
            if (technologyFilter) {
                obj.technologyFilter = technologyFilter
                obj.restrictTechnologyFilter = restrictTechnologyFilter
                obj.otherCompanyIds = noneTechnologyCompanies
            }
            const response = await api().post(endpoints.totalDigitalEngagement, obj);

            if (response.status === 200) {
                dispatch({
                    type: "setTotalDigitalEngagement",
                    data: response.data.data,
                    count: response.data.count,
                });
            }
        }


        fetchData();
        fetchTotalTechnology();
    }, [frimographicFilter, digitalPresenceFilter, technologyFilter, noneTechnologyCompanies, userDigitalEngagementFilter, userProductServiceFilter,
        userSubPartner,userPartner, userCompanyFilter, userCategoryFilter, userEmpSizeFilter, userYearIOFilter, userFavCompFilter,selectedDataset]);

    return [data]

};

