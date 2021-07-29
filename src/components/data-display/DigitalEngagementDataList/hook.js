import React, { useState, useEffect } from 'react';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

export function Hook([companyIds]) {

    const [state, dispatch] = useAppValue();
    const { sortFilter, selectedDataset, selectedFilename, frimographicFilter, technologyFilter, restrictTechnologyFilter, reloadTechnoCompany } = state;

    const { page } = state.selectedDigitalEngagementCompany;


    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + 1,
                {
                    dataset: selectedDataset,
                    file_name: selectedFilename,
                    companyIds,
                    // technologyFilter,
                    // restrictTechnologyFilter,
                    sortFilter
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: "resetSelectedDigitalEngagementCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        companyIds && fetchData();

    }, [companyIds, sortFilter, reloadTechnoCompany]);

    useEffect(() => {
        async function fetchCompanyData() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + page,
                {
                    dataset: selectedDataset,
                    file_name: selectedFilename,
                    companyIds,
                    // technologyFilter,
                    // restrictTechnologyFilter,
                    sortFilter
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: "setSelectedDigitalEngagementCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }
        if (sortFilter !== 'clear')
            page > 1 && companyIds && sortFilter && fetchCompanyData();
        else
            page > 1 && companyIds && fetchCompanyData();
        return
    }, [page, companyIds, sortFilter, reloadTechnoCompany]);
    // console.log("reload Check", reloadTechnoCompany)

};

// import React, { useState, useEffect } from 'react';

// //API
// import api from 'api';

// //constants
// import endpoints from 'constants/endpoints';

// //context
// import { useAppValue } from 'context/app';

// export function Hook([companyIds]) {

//     const [state, dispatch] = useAppValue();
//     const { sortFilter, selectedDataset, selectedFilename, frimographicFilter, technologyFilter, restrictTechnologyFilter, technoCompanyIds } = state;

//     const { page } = state.selectedDigitalEngagementCompany;


//     useEffect(() => {
//         async function fetchData() {
//             const response = await api().post(
//                 endpoints.getAllCompanies + "?page=" + 1,
//                 {
//                     dataset: selectedDataset,
//                     file_name: selectedFilename,
//                     companyIds: technoCompanyIds,
//                     // technologyFilter,
//                     // restrictTechnologyFilter,
//                     sortFilter
//                 }
//             );
//             if (response.status === 200) {
//                 dispatch({
//                     type: "resetSelectedDigitalEngagementCompanies",
//                     companies: response.data.companies,
//                     count: response.data.count,
//                     loading: false
//                 });
//             }
//         }

//         technoCompanyIds.length && fetchData();

//     }, [technoCompanyIds, sortFilter]);

//     useEffect(() => {
//         async function fetchCompanyData() {
//             const response = await api().post(
//                 endpoints.getAllCompanies + "?page=" + page,
//                 {
//                     dataset: selectedDataset,
//                     file_name: selectedFilename,
//                     companyIds: technoCompanyIds,
//                     // technologyFilter,
//                     // restrictTechnologyFilter,
//                     sortFilter
//                 }
//             );
//             if (response.status === 200) {
//                 dispatch({
//                     type: "setSelectedDigitalEngagementCompanies",
//                     companies: response.data.companies,
//                     count: response.data.count,
//                     loading: false
//                 });
//             }
//         }
//         if (sortFilter !== 'clear')
//             page > 1 && technoCompanyIds.length && sortFilter && fetchCompanyData();
//         else
//             page > 1 && technoCompanyIds.length && fetchCompanyData();
//         return
//     }, [page, technoCompanyIds, sortFilter]);

// };



