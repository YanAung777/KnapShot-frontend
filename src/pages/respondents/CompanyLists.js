import React, { Fragment, useReducer, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-masonry-infinite';
import { makeStyles, Divider, CircularProgress, Paper, ButtonBase, } from '@material-ui/core';
import { Favorite } from '@material-ui/icons';

//context
import { useAppValue } from 'context/app';

//components
import Text from 'components/core/Text';
import Button from 'components/core/Btn';
import CompanyDetailCard from './CompanyDetailCard';
import SortPopover from 'components/core/SortPopover';
import CustomIcon from 'components/core/CustomIcon';

const useStyles = makeStyles(theme => ({
    root: {
        // height: window.innerHeight - 220,
        // overflowY: 'scroll'
        display: 'flex',
        flexDirection: 'column',
        // padding: '0 15px',
        height: window.innerHeight - 190,
        overflowY: 'scroll',
    },
    count: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
    },
    dot: {
        height: "10px",
        width: "10px",
        backgroundColor: "#03B1F1",
        borderRadius: "50%",
        display: "inline-block",
        marginLeft: "-150px"
    },
    button: {
        // marginLeft: '5px',
        // marginRight: '5px',
        border: '1.2px solid lightgray',
        borderRadius: 5,
        // padding: '3px 10px',
        height: 30,
        minWidth: 120,
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'flex-end'
        // float: 'right'
    },
}));

export default function CompanyLists(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    let [sortFilter, setSortFilter] = useState();

    const { surveyType, surveyLabel } = props

    useEffect(() => {
        dispatch({ type: 'setSortFilter', sortData: sortFilter })
    }, [sortFilter])

    const { lists, count, page, activeIndex, loading } = state.selectedCompany;

    const loadMore = () => {
        dispatch({ type: "loading" });
        dispatch({ type: "setPage", page: page + 1 });
    }

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
        <Paper className={classes.root} elevation={5}>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '2px' }}>
                <ButtonBase className={classes.button} >
                    <div style={{ margin: "0 auto", fontSize: '12px' }}>View List</div>
                </ButtonBase>
                <ButtonBase className={classes.button} >
                    <div style={{ margin: "0 auto", fontSize: '12px' }}>Response Co-relation</div>
                </ButtonBase>
                <ButtonBase className={classes.button} >
                    <div style={{ margin: "0 auto", fontSize: '12px' }}>Response by question</div>
                </ButtonBase>
            </div>
            <Divider style={{ margin: '5px' }} />

            <Fragment>

                <div className={classes.count} >
                    <div style={{display: 'flex'}}>
                        <Text style={{ fontSize: 12, fontWeight: 600 }} value={`${count}`} />
                        <Text style={{ fontSize: 12 }} value={` : [${surveyType}] & [${surveyLabel}]`} />
                    </div>
                    <CustomIcon icon={<Favorite />} />
                    {/* <SortPopover
                        onSelectChange={setSortFilter}
                        options={[
                            "Alphabetical Order: A-Z",
                            "Alphabetical Order: Z-A",
                            "Ads Exp: Highest first",
                            "Digital Engagement: Highest first"
                        ]}
                    /> */}
                </div>
                <Divider />
                <div className={classes.root}>
                    {
                        lists.map((company, index) => {
                            return (
                                <>
                                    <CompanyDetailCard
                                        style={{
                                            border: company.id === activeIndex ? "2px solid blue" : "none",
                                            borderRadius: 10
                                        }}
                                        key={index} company={company} index={index} />
                                    <Divider />
                                </>
                            )
                        })
                    }
                    {checkCount()}
                </div>
            </Fragment>
        </Paper>
    );
}