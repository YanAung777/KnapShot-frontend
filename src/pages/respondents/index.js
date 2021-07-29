import React, { useMemo, useState, useEffect } from 'react';
import queryString from 'query-string';
import { makeStyles, Paper, Grid, Tab, Tabs } from '@material-ui/core';

//components
import LeftSide from './LeftSide';
import RightSide from './RightSide';
import CompanyLists from './CompanyLists'

//util
import { checkAuth } from 'util/check-auth';

//constants
import endpoints from 'constants/endpoints';

// api
import api from 'api'

//route
import { history } from 'router/history';

//Hook
import useRespondentsHook from './useRespondentsHook'

//context
import { useAppValue } from 'context/app';


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 10,
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        position: "fixed",
        overflow: "hidden",
        height: '100%'
    },
    tab: {
        fontSize: 13,
        fontWeight: '600'
    }
}));

const Respondents = (props) => {

    if (!checkAuth()) {
        history.push("/login");
    }

    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    let [selectedExcelName, setSelectedExcelName] = useState()

    

    useEffect(() => {
        // async function getExcelFileNames() {
        //     const response = await api().get(endpoints.getExcelFileNames);
        //     if (response.status === 200) {
        //         // setExcelFileNames(response.data.excelFiles)
        //         setSelectedExcelName(response.data.excelFiles[0])
        //     }
        // }

        setSelectedExcelName(state.selectedExcelName)
        // !state.selectedExcelName && getExcelFileNames()
    }, [state.selectedExcelName])

    return <ExcelOnChange selectedExcelName={selectedExcelName} />
}

const ExcelOnChange = ({ selectedExcelName }) => {
    
    let [respondent, getQuestionRespondent] = useRespondentsHook(selectedExcelName)
    let [otherCompanyIds, setCompanyList] = useState([])
    const classes = useStyles();
    const [state, dispatch] = useAppValue();
    const { sortFilter, selectedDataset, selectedFilename, technologyFilter, restrictTechnologyFilter } = state;
    const [surveyType, setSurveyType] = useState('')
    const [surveyLabel, setSurveyLabel] = useState('')
    const [breakdown, setBreakdown] = useState('Choose One');
    // const [companyData, setCompanyData] = useState([])
    // console.log("companyList", state)

    // မဖျက်ရ filter လုပ်လျှင်လိုမည်
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

    useEffect(()=>{
        setCompanyList([])
    },[selectedExcelName, breakdown])

    useEffect(() => {
        let response
        async function fetchData() {
            let obj = {
                dataset: selectedDataset,
                file_name: selectedFilename,
                // industryType,
                // digitalType,
                // technologyFilter,
                // restrictTechnologyFilter,
                // sortFilter,
                otherCompanyIds
            }
            if (otherCompanyIds.length > 0) {
                response = await api().post(
                    // endpoints.getAllCompanies + "?page=" + 1, obj
                    endpoints.getCompanyByMultiIDs, {id:otherCompanyIds}
                );

                if (response.status === 200) {
                    // setCompanyData(response.data)
                    dispatch({
                        type: "resetSurveyCompanies",
                        companies: response.data.data,
                        count: response.data.count,
                        loading: false
                    });
                }
            }
        }
        fetchData()
    }, [otherCompanyIds])

    return (
        useMemo(() => <div className={classes.root}>
            <div style={{ width: '35%' }}>
                {
                    otherCompanyIds.length > 0 ? <CompanyLists surveyType={surveyType} surveyLabel={surveyLabel}/> : <LeftSide respondent={respondent} />
                }
            </div>
            <div style={{ width: '65%' }}>
                <RightSide getQuestionRespondent={getQuestionRespondent} 
                            selectedExcelName={selectedExcelName} 
                            setCompanyList={setCompanyList} 
                            surveyType={surveyType}
                            surveyLabel={surveyLabel}
                            setSurveyType={setSurveyType}
                            setSurveyLabel={setSurveyLabel}
                            breakdown={breakdown}
                            setBreakdown ={setBreakdown}
                />
            </div>
        </div>, [respondent, getQuestionRespondent, otherCompanyIds])

    );
}

export default Respondents;