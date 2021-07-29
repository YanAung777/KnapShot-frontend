import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-masonry-infinite';
import { makeStyles, Divider, CircularProgress, Grid } from '@material-ui/core';

//context
import { useAppValue } from 'context/app';

//constants
import endpoints from 'constants/endpoints';

//util
import { getSession } from 'util/check-auth';

//API
import api from 'api';

//components
import Text from 'components/core/Text';
import Button from 'components/core/Btn';
import CompanyDetailCard from 'pages/home/components/CompanyDetailCard';
import SortPopover from 'components/core/SortPopover';

const useStyles = makeStyles(theme => ({
    root: {
        height: window.innerHeight - 140,
        overflowY: 'scroll'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "row"
    },
    column: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: "column"
    },
    count: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    }
}));

export default function CompanyLists(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const { lists, count, page, activeIndex, loading } = state.selectedTechnologyCompany;
    const {
        breakdownType, technologyName, technoCompanyIds,
        selectedDataset, selectedFilename, totalCountries, reloadTechnoCompany
    } = state;

    let [toggleCheck, setToggleCheck] = React.useState(false)
    let [sortFilter, setSortFilter] = useState();
    // let [renderList, setRenderList] = useState(lists);

    // useEffect(() => {
    //     let tempList = lists.map(list => {
    //         let temp = list
    //         if (technoCompanyIds === list.id) {
    //             if (temp.fav_company_lists.length) temp.fav_company_lists = []
    //             else temp.fav_company_lists = ["1"]
    //             return temp
    //         }
    //         else return list
    //     })
    //     setRenderList(tempList)
    // }, [technoCompanyIds,lists])




    useEffect(() => {
        dispatch({ type: 'setSortFilter', sortData: sortFilter })
    }, [sortFilter])


    const loadMore = () => {
        dispatch({ type: "loading" });
        dispatch({ type: "setSelectedTechnologyCompanyPage", page: page + 1 });
    }

    const onClose = () => {
        dispatch({ type: "loading" });
        dispatch({
            type: "resetSelectedTechnologyCompanies",
            page: 1,
            lists: [],
            count: 0,
            activeIndex: null,
            loading: true
        });
    }

    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + 1,
                {
                    // dataset: selectedDataset,
                    dataset: Array.isArray(selectedDataset) ? selectedDataset : totalCountries.countryName,
                    file_name: selectedFilename,
                    companyIds: technoCompanyIds,
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

        technoCompanyIds.length && fetchData();

    }, [toggleCheck]);


    // useEffect(() => {
    //     onClose();
    // }, []);

    const checkCount = () => {
        if (page * 10 < count) {
            return loading ?
                <div className="fa-2x" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 50 }}>
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
                : <Text value="Load More" onClick={loadMore} style={{ textDecoration: 'underline', cursor: 'pointer', color: 'blue', textAlign: 'center' }} />
        }
        else { return null }
    }

    return (
        <div
        // style={{ border: "1px solid lightgrey", padding: 10 }}
        >
            <Grid container style={{ borderBottom: "1px solid lightgrey", padding: 10 }}  >
                <Grid item xs={3} sm={3} md={3} className={classes.column}>
                    <Text value={`${count}`} />
                    <Text value={`Companies`} />
                </Grid>
                <Grid item xs={9} sm={9} md={9} style={{ padding: 10, borderLeft: "1px solid lightgrey" }}>
                    <Grid container >
                        <Grid item xs={3} sm={3} md={3} className={classes.column} style={{ alignItems: "flex-end" }}>
                            <Text value="Technology:" />
                            <Text value="Breakdown:" />
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} className={classes.column} style={{ alignItems: "flex-start" }}>
                            <Text value={technologyName} />
                            <Text value={breakdownType} />
                        </Grid>
                        <Grid item xs={2} sm={2} md={2} className={classes.column}>
                            <SortPopover
                                onSelectChange={setSortFilter}
                                options={[
                                    "Alphabetical Order: A-Z",
                                    "Alphabetical Order: Z-A",
                                    "Ads Exp: Highest first",
                                    "Digital Engagement: Highest first"
                                ]}
                            />
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} className={classes.column}>
                            <Text value="X" onClick={onClose} style={{ float: 'right', display: 'flex', alignItems: 'center', cursor: "pointer" }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {/* <Divider /> */}
            <div className={classes.root}>
                {
                    lists.map((company, index) => {
                        return (
                            <CompanyDetailCard
                                toggleCheck={toggleCheck}
                                setToggleCheck={setToggleCheck}
                                style={{
                                    border: company.id === activeIndex ? "2px solid blue" : "none",
                                    borderRadius: 10
                                }}
                                key={index} company={company} index={index} />
                        )
                    })
                }
                {
                    checkCount()}
            </div>
        </div>
    );
}