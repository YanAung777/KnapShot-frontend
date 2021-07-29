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

export function useOverviewHook(companyIds, industryType, digitalType) {

    const [state, dispatch] = useAppValue();
    const { sortFilter, selectedDataset, selectedFilename, totalIndustries, totalCountries,
        overviewTab, frimographicFilter, digitalPresenceFilter, technologyFilter,
        restrictTechnologyFilter, noneTechnologyCompanies } = state; //searchedBrandsFilter

    const { page } = state.selectedCompany;

    const { count, industries, industryName } = totalIndustries

    useEffect(() => {
        async function setDigitalEngagementBreakDown() {
            let obj = {
                dataset: selectedDataset,
                file_name: selectedFilename,
                digitals: ["Basic", "Intermediate", "High", "Advanced"],
                digitalPresenceFilter,
                frimographicFilter,
            }

            if (technologyFilter) {
                obj.technologyFilter = technologyFilter
                obj.restrictTechnologyFilter = restrictTechnologyFilter
                obj.otherCompanyIds = noneTechnologyCompanies
            }
            const response = await api().post(endpoints.digitalEngagementBreakDown, obj);

            if (response.status === 200) {
                dispatch({
                    type: "setDigitalEngagementBreakDown",
                    results: response.data.results,
                    // totalIndustries: response.data.totalIndustries,
                    count: response.data.count
                });
            }
        }

        overviewTab === 2 && setDigitalEngagementBreakDown();

    }, [frimographicFilter, digitalPresenceFilter, technologyFilter]);

    useEffect(() => {
        dispatch({ type: "listLoading" });

        let obj = {
            dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
            file_name: selectedFilename,
            digitalPresenceFilter,
            frimographicFilter,
            sortFilter
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
        async function fetchData() {
            let obj = {
                // dataset: selectedDataset, //changes here careful
                dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                file_name: selectedFilename,
                digitalPresenceFilter,
                frimographicFilter,
                // searchedBrandsFilter
            }

            // if (!searchedBrandsFilter)
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
                    dataByCountry: response.data.dataByCountry,
                    count: response.data.count,
                });
            }
        }
        fetchData();
    }, [frimographicFilter, digitalPresenceFilter, noneTechnologyCompanies, technologyFilter,totalCountries])//searchedBrandsFilter




    useEffect(() => {
        async function reset() {
            dispatch({
                type: "resetSelectedCompanies",
                page: 1,
                lists: [],
                count: 0,
                activeIndex: null,
                loading: true
            });
        }
        reset()
    }, [overviewTab, selectedFilename]);

    useEffect(() => {

        async function setIndustryBreakDown() {

            let obj = {
                dataset: selectedDataset,
                file_name: selectedFilename,
                digitals: ["Basic", "Intermediate", "High", "Advanced"],
                industries: industryName,
            }

            if (technologyFilter) {
                obj.technologyFilter = technologyFilter
                obj.restrictTechnologyFilter = restrictTechnologyFilter
                obj.otherCompanyIds = noneTechnologyCompanies
            }

            const response = await api().post(endpoints.industryBreakDown, obj);

            if (response.status === 200) {
                dispatch({
                    type: "setIndustryBreakDown",
                    results: response.data.results,
                    totalIndustries: response.data.totalIndustries,
                });
            }
        }

        overviewTab === 1 && Object.keys(technologyFilter).length === 6 && setIndustryBreakDown();

    }, [industryName]);

    useEffect(() => {
        async function fetchDatasets() {
            const response = await api().get(endpoints.getAllDatasets);
            if (response.status === 200) {
                dispatch({
                    type: "setDatasets",
                    datasets: response.data.datasets
                });
            }
        }

        async function fetchFilenames() {
            const response = await api().get(endpoints.getFilenames);
            if (response.status === 200) {
                dispatch({
                    type: "setFilenames",
                    filenames: response.data.filenames
                });
            }
        }

        if (!selectedDataset) fetchDatasets();
        if (!selectedFilename) fetchFilenames();
    }, []);

    useEffect(() => {
        async function fetchCompanyData() {

            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + page,
                {
                    dataset: selectedDataset,
                    file_name: selectedFilename,
                    companyIds,
                    sortFilter
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: "setSelectedCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        async function fetchCompanyDataFromIndustryBreakDown() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + page,
                {
                    dataset: selectedDataset,
                    file_name: selectedFilename,
                    industryType,
                    digitalType,
                    sortFilter
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: "setSelectedCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        if (sortFilter) {
            page > 1 && sortFilter && companyIds && fetchCompanyData();
            page > 1 && sortFilter && digitalType && fetchCompanyDataFromIndustryBreakDown();
        } else {
            page > 1 && companyIds && fetchCompanyData();
            page > 1 && digitalType && fetchCompanyDataFromIndustryBreakDown();
        }

    }, [page, sortFilter]);
};

