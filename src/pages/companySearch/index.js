import React, { useReducer, useContext, useState } from 'react';

import { makeStyles, Grid } from '@material-ui/core';
import { Check, Clear } from '@material-ui/icons';

//components
import Text from 'components/core/Text';

//util
import { checkAuth } from 'util/check-auth';

//route
import { history } from 'router/history';

//hook
import { Hook } from './hook';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 20
    },
    divider: {
        height: 50
    }
}));

export default function CompanySearch(props) {

    if (!checkAuth()) {
        history.push("/login");
    }

    const classes = useStyles();

    const { companyName, dataset } = props.match.params;

    const [company] = Hook(companyName, dataset);

    const renderStatus = (status) => {

        if (status === 'Tick') {
            return <Check />
        }
        else if (status === 'Cross') {
            return <Clear />
        }
        else if (status === 'Processing') {
            return (
                <div className="fa-1x">
                    <i className="fas fa-spinner fa-spin"></i>
                </div>
            )
        }

    }

    const renderLoading = () => {
        return (
            <div className="fa-1x">
                <i className="fas fa-spinner fa-spin"></i>
            </div>
        )
    }

    return (
        <div className={classes.root}>
            <Grid container>
                <Grid item xs={2} md={2} lg={2} />
                <Grid item xs={2} md={2} lg={2}>
                    <Text value="Searching Status" />
                </Grid>
                <Grid item xs={8} md={8} lg={8} />

                <div className={classes.divider} />
                <Grid item xs={2} md={2} lg={2} />
                <Grid item xs={2} md={2} lg={2}>
                    <Text value="Company Website" />
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    {
                        company && company.website ?
                            renderStatus(company.website)
                            :
                            renderLoading()
                    }
                </Grid>

                <div className={classes.divider} />
                <Grid item xs={2} md={2} lg={2} />
                <Grid item xs={2} md={2} lg={2}>
                    <Text value="Directory Presence" />
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    {
                        company && company.directoriesPresence ?
                            renderStatus(company.directoriesPresence)
                            :
                            renderLoading()
                    }
                </Grid>

                <div className={classes.divider} />
                <Grid item xs={2} md={2} lg={2} />
                <Grid item xs={2} md={2} lg={2}>
                    <Text value="Company Contact" />
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    {
                        company && company.contactInfo ?
                            renderStatus(company.contactInfo)
                            :
                            renderLoading()
                    }
                </Grid>

                <div className={classes.divider} />
                <Grid item xs={2} md={2} lg={2} />
                <Grid item xs={2} md={2} lg={2}>
                    <Text value="Company Information" />
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    {
                        company && company.companyInfo ?
                            renderStatus(company.companyInfo)
                            :
                            renderLoading()
                    }
                </Grid>

                <div className={classes.divider} />
                <Grid item xs={2} md={2} lg={2} />
                <Grid item xs={2} md={2} lg={2}>
                    <Text value="Personnel" />
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    {
                        company && company.teamMembers ?
                            renderStatus(company.teamMembers)
                            :
                            renderLoading()
                    }
                </Grid>
            </Grid>
        </div >
    );
}