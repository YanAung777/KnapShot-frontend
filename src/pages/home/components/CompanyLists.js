import React, { Fragment, useReducer, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-masonry-infinite';
import { makeStyles, Divider, CircularProgress } from '@material-ui/core';

//context
import { useAppValue } from 'context/app';

//components
import Text from 'components/core/Text';
import Button from 'components/core/Btn';
import CompanyDetailCard from './CompanyDetailCard';
import SortPopover from '../../../components/core/SortPopover';

const useStyles = makeStyles(theme => ({
    root: {
        height: window.innerHeight - 220,
        overflowY: 'scroll'
    },
    count: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    dot: {
        height: "10px",
        width: "10px",
        backgroundColor: "#03B1F1",
        borderRadius: "50%",
        display: "inline-block",
        marginLeft: "-150px"
    }
}));

export default function CompanyLists(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    let [sortFilter, setSortFilter] = useState();

    useEffect(() => {
        dispatch({ type: 'setSortFilter', sortData: sortFilter })
    }, [sortFilter])

    const { lists, count, page, activeIndex, loading } = state.company;

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
        <Fragment>

            <div className={classes.count} >
                <Text value={`${count} companies`} />
                <SortPopover
                    onSelectChange={setSortFilter}
                    options={[
                        "Alphabetical Order: A-Z",
                        "Alphabetical Order: Z-A",
                        "Ads Exp: Highest first",
                        "Digital Engagement: Highest first"
                    ]}
                />
            </div>
            <Divider />
            <div className={classes.root}>
                {
                    lists.map((company, index) => {
                        return (
                            <CompanyDetailCard
                                style={{
                                    border: company.id === activeIndex ? "2px solid blue" : "none",
                                    borderRadius: 10
                                }}
                                key={index} company={company} index={index} />
                        )
                    })
                }
                {checkCount()}
            </div>

        </Fragment>
    );
}