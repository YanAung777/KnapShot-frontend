import { useEffect } from 'react';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

export function useHeaderHook() {


    const [state, dispatch] = useAppValue();
    const { selectedFilename, selectedDataset,
        frimographicFilter, digitalPresenceFilter,userDigitalEngagementFilter,userProductServiceFilter,userCompanyExpertiseFilter,
        userPartner, userExpertise, userCompanyFilter, userFavCompFilter, userCategoryFilter, userEmpSizeFilter, userYearIOFilter,
        totalCountries } = state;

    useEffect(() => {
        async function fetchTotalCountry() {
            const response = await api().post(endpoints.totalCountry,
                {
                    "file_name": selectedFilename,
                    // expertiseCompanyFilter: userCompanyExpertiseFilter,
                    // categoryFilter: userCategoryFilter,
                    // empSizeFilter: userEmpSizeFilter,
                    // yearIOFilter: userYearIOFilter,
                    // digitalEngagementFilter: userDigitalEngagementFilter,
                    // productServiceFilter: userProductServiceFilter,
                    // companyFilter: userCompanyFilter,
                    // partnerFilter: [...userSubPartner,...userPartner],
                });
            if (response.status === 200) {
                dispatch({
                    type: "setTotalCountry",
                    countryName: response.data.results.countryName,
                    country: response.data.results.country,
                    totalCountry: response.data.results.totalCountry,
                });
            }
        }

        dispatch({
            type: "setFrimographicFilter",
            filter: {}
        })
        dispatch({
            type: "setDigitalPresenceFilter",
            filter: {}
        })

        fetchTotalCountry();
    }, [selectedFilename, dispatch]);
    // }, [selectedFilename, userCompanyFilter, userPartner,userEmpSizeFilter,
    //     userCompanyExpertiseFilter, userCategoryFilter, userYearIOFilter, userDigitalEngagementFilter, userProductServiceFilter, dispatch]);

    // useEffect(() => {
    //     async function getUserCompanyExpertiseFilter() {
    //         // console.log("check", userPartner, userExpertise)
    //         let filter = {
    //             selectedFilename,
    //             selectedDataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
    //             companyFilter: userCompanyFilter,
    //             userFavCompFilter: userFavCompFilter,
    //             partnerFilter: [],
    //             expertiseFilter: [],
    //             categoryFilter: userCategoryFilter,
    //             empSizeFilter: userEmpSizeFilter,
    //             yearIOFilter: userYearIOFilter,
    //             digitalEngagementFilter : userDigitalEngagementFilter
    //         }
    //         if (userPartner && userPartner.length) filter.partnerFilter = userPartner
    //         // else filter.partnerFilter = []
    //         if (userExpertise && userExpertise.length) filter.expertiseFilter = userExpertise
    //         // else filter.expertiseFilter = []

    //         const response = await api().post(endpoints.getCompanyNamesExpertise, filter);
    //         if (response.status === 200) {

    //             if (userPartner && userPartner.length && userExpertise && userExpertise.length) dispatch({
    //                 type: "setUserCompanyExpertiseFilter",
    //                 companies: response.data.data
    //             });

    //             else if (userPartner && userPartner.length) dispatch({
    //                 type: "setUserCompanyExpertiseFilter",
    //                 companies: response.data.partnerArr
    //             });
    //             else if (userExpertise && userExpertise.length) dispatch({
    //                 type: "setUserCompanyExpertiseFilter",
    //                 companies: response.data.expertiseArr
    //             });
    //             else dispatch({
    //                 type: "setUserCompanyExpertiseFilter",
    //                 companies: response.data.data
    //             });
    //         }
    //     }
    //     getUserCompanyExpertiseFilter();
    // },
    //     [userPartner, userExpertise, selectedFilename, selectedDataset, userCompanyFilter, userFavCompFilter, userCategoryFilter, userEmpSizeFilter, userYearIOFilter, userDigitalEngagementFilter]
    //     // [userPartner, userExpertise, selectedFilename, selectedDataset, userCompanyFilter]
    // );

    useEffect(() => {
        dispatch({ type: "setUserExpertiseFilter", expertise: [] });
        dispatch({ type: "setUserPartnerFilter", partner: [] });
    }, [userCompanyFilter])

    useEffect(() => {

        async function fetchTotalPersonnel() {
            const response = await api().post(endpoints.totalPersonnel,
                {
                    "dataset": selectedDataset,
                    "file_name": selectedFilename
                });
            if (response.status === 200) {
                dispatch({
                    type: "setTotalPersonnel",
                    personnelName: response.data.results.personnelName,
                    personnel: response.data.results.personnel,
                    totalPersonnel: response.data.results.totalPersonnel,
                });
            }
        }

        async function fetchTotalCompanyStaff() {
            const response = await api().post(endpoints.totalCompanyStaff,
                {
                    "dataset": selectedDataset,
                    "file_name": selectedFilename
                });
            if (response.status === 200) {
                dispatch({
                    type: "setTotalCompanyStaff",
                    personnelName: response.data.results.personnelName,
                    personnel: response.data.results.personnel,
                    totalCompanyStaff: response.data.results.totalPersonnel,
                });
            }
        }


        async function fetchTotalHQLocation() {
            const response = await api().post(endpoints.totalHQLocation,
                {
                    "dataset": selectedDataset,
                    "file_name": selectedFilename
                });
            if (response.status === 200) {
                let data = response.data.results

                dispatch({
                    type: "setTotalHQLocation",
                    HQLocationName: data.HQLocationName,
                    HQLocation: data.HQLocation,
                    totalHQLocation: data.totalHQLocation,
                });
            }
        }

        async function fetchTotalIndustry() {
            const response = await api().post(endpoints.totalIndustry,
                {
                    "file_name": selectedFilename,
                    "dataset": selectedDataset
                });
            if (response.status === 200) {
                dispatch({
                    type: "setTotalIndustry",
                    results: response.data.results,
                    totalIndustries: response.data.results.totalIndustry,
                });
            }
        }


        selectedFilename && fetchTotalIndustry();
        selectedFilename && fetchTotalPersonnel();
        selectedFilename && fetchTotalHQLocation();
        selectedFilename && fetchTotalCompanyStaff();
    }, [selectedFilename, selectedDataset]);

    useEffect(() => {
        async function fetchDigitalPresenceFilter() {
            const response = await api().post(endpoints.digitalPresenceFilter,
                {
                    "file_name": selectedFilename,
                    "dataset": selectedDataset,
                    "frimographicFilter": frimographicFilter,
                });
            if (response.status === 200) {
                dispatch({
                    type: "setDigitalPresence",
                    results: response.data.results,
                });
            }
        }
        selectedFilename && fetchDigitalPresenceFilter();

    }, [selectedFilename, selectedDataset, frimographicFilter, dispatch])

    useEffect(() => {
        async function fetchTotalTechnologySelect() {
            const response = await api().post(endpoints.totalTechnologySelect,
                {
                    "file_name": selectedFilename,
                    "dataset": selectedDataset,
                    "frimographicFilter": frimographicFilter,
                    "digitalPresenceFilter": digitalPresenceFilter
                });
            if (response.status === 200) {
                dispatch({
                    type: "setTotalTechnologySelect",
                    data: response.data.data,
                    companyIds: response.data.idArr
                });
            }
        }
        selectedFilename && fetchTotalTechnologySelect();

    }, [selectedFilename, selectedDataset, frimographicFilter, digitalPresenceFilter, dispatch])
};

