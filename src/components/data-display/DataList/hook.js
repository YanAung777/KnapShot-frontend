// import React, { useState, useEffect } from 'react';

// //API
// import api from 'api';

// //constants
// import endpoints from 'constants/endpoints';

// //context
// import { useAppValue } from 'context/app';

// export function Hook([companyIds]) {

//     const [state, dispatch] = useAppValue();
//     const { sortFilter, selectedDataset, selectedFilename, frimographicFilter, technologyFilter, restrictTechnologyFilter, totalCountries,
//         technoCompanyIds, reloadTechnoCompany } = state;

//     const { page } = state.selectedTechnologyCompany;


//     useEffect(() => {
//         async function fetchData() {
//             const response = await api().post(
//                 endpoints.getAllCompanies + "?page=" + 1,
//                 {
//                     // dataset: selectedDataset,
//                     dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
//                     file_name: selectedFilename,
//                     companyIds: technoCompanyIds,
//                     // technologyFilter,
//                     // restrictTechnologyFilter,
//                     sortFilter
//                 }
//             );
//             if (response.status === 200) {
//                 dispatch({
//                     type: "resetSelectedTechnologyCompanies",
//                     companies: response.data.companies,
//                     count: response.data.count,
//                     loading: false
//                 });
//             }
//         }

//         technoCompanyIds.length && fetchData();

//     }, [sortFilter, totalCountries, reloadTechnoCompany, technoCompanyIds]);

//     useEffect(() => {
//         async function fetchCompanyData() {
//             const response = await api().post(
//                 endpoints.getAllCompanies + "?page=" + page,
//                 {
//                     // dataset: selectedDataset,
//                     dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
//                     file_name: selectedFilename,
//                     companyIds: technoCompanyIds,
//                     sortFilter
//                 }
//             );
//             if (response.status === 200) {
//                 dispatch({
//                     type: "setSelectedTechnologyCompanies",
//                     companies: response.data.companies,
//                     count: response.data.count,
//                     loading: false
//                 });
//             }
//         }
//         if (sortFilter)
//             page > 1 && technoCompanyIds.length && sortFilter && fetchCompanyData();
//         else
//             page > 1 && technoCompanyIds.length && fetchCompanyData();

//         return
//     }, [page, sortFilter, totalCountries, reloadTechnoCompany, technoCompanyIds]);

// };



import React, { useState, useEffect } from 'react';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

//util
import { getSession } from 'util/check-auth';

export function Hook([companyIds]) {

    // console.log("checkTechno",companyIds)

    const [state, dispatch] = useAppValue();
    const { sortFilter,selectedDataset, selectedFilename, frimographicFilter, technologyFilter,restrictTechnologyFilter,totalCountries } = state;

    const { page } = state.selectedTechnologyCompany;


    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + 1,
                {
                    // dataset: selectedDataset,
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    companyIds,
                    // technologyFilter,
                    // restrictTechnologyFilter,
                    user_id: getSession("user").id,
                    sortFilter
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: "resetSelectedTechnologyCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        companyIds && fetchData();

    }, [companyIds,sortFilter,totalCountries]);

    useEffect(() => {
        async function fetchCompanyData() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + page,
                {
                    // dataset: selectedDataset,
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    companyIds,
                    user_id: getSession("user").id,
                    sortFilter
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: "setSelectedTechnologyCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }
        if(sortFilter)
            page > 1 && companyIds && sortFilter && fetchCompanyData();
        else
        page > 1 && companyIds && fetchCompanyData();

        return
    }, [page,sortFilter,totalCountries]);

};

