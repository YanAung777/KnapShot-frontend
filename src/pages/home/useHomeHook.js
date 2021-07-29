import { useEffect } from 'react';

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

export function useHomeHook() {

    const [state, dispatch] = useAppValue();
    const { page } = state.company;
    const { sortFilter, selectedDataset, selectedFilename, frimographicFilter, totalCountries,
        userCompanyExpertiseFilter, userCategoryFilter, userEmpSizeFilter, userYearIOFilter,
        digitalPresenceFilter, technologyFilter, restrictTechnologyFilter, noneTechnologyCompanies } = state; //searchedBrandsFilter


    //  console.log("noneTechnologyCompanies",noneTechnologyCompanies)
    // dispatch({ type: "listLoading" });

    // console.log("reducer", "\n",
    //     "sortFilter", sortFilter, "\n",
    //     "selectedDataset", selectedDataset, "\n",
    //     "selectedFilename", selectedFilename, "\n",
    //     "frimographicFilter", frimographicFilter, "\n",
    //     "digitalPresenceFilter", digitalPresenceFilter, "\n",
    //     "technologyFilter", technologyFilter, "\n",
    //     "restrictTechnologyFilter", restrictTechnologyFilter, "\n",
    //     "noneTechnologyCompanies", noneTechnologyCompanies, "\n")

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

        async function fetchData() {
            let obj = {
                dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                file_name: selectedFilename,
                digitalPresenceFilter,
                frimographicFilter,
                sortFilter,
                // searchedBrandsFilter
            }

            // if (!searchedBrandsFilter)
            if (checkPass(technologyFilter)) {
                obj.technologyFilter = technologyFilter
                obj.restrictTechnologyFilter = restrictTechnologyFilter
                if (noneTechnologyCompanies && noneTechnologyCompanies.length) obj.otherCompanyIds = noneTechnologyCompanies
            }
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + page, obj
            );
            if (response.status === 200) {
                dispatch({
                    type: "setCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        if (sortFilter)
            page !== 1 && sortFilter && fetchData()
        else
            page !== 1 && fetchData();
        return
    }, [page, sortFilter, totalCountries]);//searchedBrandsFilter

    useEffect(() => {
        dispatch({ type: "listLoading" });

        let obj = {
            dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
            file_name: selectedFilename,
            digitalPresenceFilter,
            frimographicFilter,
            sortFilter,
            // expertiseCompanyFilter: userCompanyExpertiseFilter,
            // categoryFilter: userCategoryFilter,
            // empSizeFilter: userEmpSizeFilter,
            // yearIOFilter: userYearIOFilter, //not now
            // searchedBrandsFilter
        }
        // if (!searchedBrandsFilter) {
        //     console.log("yes")
        if (checkPass(technologyFilter)) {
            obj.technologyFilter = technologyFilter
            obj.restrictTechnologyFilter = restrictTechnologyFilter
            if (noneTechnologyCompanies && noneTechnologyCompanies.length) obj.otherCompanyIds = noneTechnologyCompanies
        }
        // }

        async function fetchData() {
            // kst was here 
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

    },
        [selectedDataset, selectedFilename, sortFilter, noneTechnologyCompanies, totalCountries]
        // [selectedDataset, selectedFilename, sortFilter, noneTechnologyCompanies, totalCountries, userCompanyExpertiseFilter, userCategoryFilter, userEmpSizeFilter, userYearIOFilter]

    );//searchedBrandsFilter

    useEffect(() => {

        async function fetchLocation() {
            const response = await api().post(
                endpoints.getAllLocations,
                { dataset: selectedDataset, file_name: selectedFilename }
            );
            if (response.status === 200) {
                dispatch({
                    type: "setLocations",
                    companies: response.data.companies
                });
            }
        }
        selectedFilename && fetchLocation();

    }, [selectedDataset, selectedFilename]);

};

