import React, { Fragment } from 'react';
import PropTypes, { string } from 'prop-types';
import { makeStyles, Paper, Grid } from '@material-ui/core';
import _ from 'lodash';

//components
import Icon from 'components/core/CustomIcon';
import Text from 'components/core/Text';

//constants
import { keyValues } from 'constants/keyValues';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10,
        backgroundColor: '#F2F2F2',
        height: '100%',
        overflowY: 'scroll'
    },
    item: {
        margin: '10px 0',
        padding: 10,
        border: 'none',
        boxShadow: 'none'
    }
}));

const Technology = (props) => {

    const classes = useStyles();

    const { spending, asset } = props.company;

    if (!asset) return <div className={classes.root}>
        <Paper className={classes.item}>
            <Text value="Technology not found"
                style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} />
        </Paper>
    </div>

    let data = {};

    const keys = ["Advertising", "Analytics and Tracking", "Ecommerce", "Payment", "Widget", "Hosting", "Productivity", "Web Hosting Providers"];

    const values = ["Avertising  Network", "ads txt", "Ad Exchange", "Audience Targeting", "Facebook Exchange", "Ad Server", "Affiliate Programs", "Contextual Advertising", "Dynamic Creative Optimization", "Digital Video Ads", "Retargeting / Remarketing", "Header Bidding",
        "Application Performance", "A/B Testing", "Ad Analytics", "Conversion Optimization", "Advertiser Tracking", "Tag Management", "Audience Measurement", "Visitor Count Tracking",
        "Non Platform", "Hosted Solution", "Open Source", "Checkout Buttons", "Payment Acceptance", "Payments Processor", "Payment Currency",
        "Live Chat", "Login", "Ticketing System", "Bookings", "Social Sharing", "Social Management",
        "Cloud Hosting", "Cloud PaaS", "Dedicated Hosting", "Business Email Hosting", "Web Hosting Provider Email", "Marketing Platform",
        "CRM", "Lead Generation", "Marketing Automation", "Product Recommendations", "Feedback Forms and Surveys", "Campaign Management"];

    let obj = {};

    let assets = JSON.parse(asset);

    if (assets) {
        Object.values(assets).forEach((data, index) => {
            Object.keys(data).forEach((key, keyIndex) => {
                values.forEach(val => {
                    if (key === val) {
                        if (keyValues[key] && obj[keyValues[key]] === undefined) obj[keyValues[key]] = [];
                        if (keyValues[key]) {
                            obj[keyValues[key]].push({ type: key, value: Object.values(data)[keyIndex].join(", ") });
                        }
                    }
                })
            });
        });
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.item}>
                <Text value={`Technology Spending : ${spending ? spending : "$ 0"}`}
                    style={{ fontSize: 15, fontWeight: '600', color: 'gray' }} />
            </Paper>
            {
                Object.keys(obj).map((key, index) => {
                    return (
                        <Paper className={classes.item} key={index}>
                            <Text value={key}
                                style={{ fontSize: 15, fontWeight: '600', color: 'gray' }} /><br />
                            <Grid container>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Text value="Type" />
                                </Grid>
                                <Grid item xs={8} md={8} lg={8}>
                                    <Text value="Brand" />
                                </Grid>
                            </Grid>
                            <div style={{ height: 10 }} />
                            {renderAssets(obj[key])}
                        </Paper>
                    )
                })
            }
            <div style={{ height: 300 }} />
        </div>
    )
}

const renderAssets = (data) => {
    return _.uniqBy(data, "type").map((result, index) => {
        return (
            <Fragment key={index}>
                <Grid container key={index}>
                    <Grid item xs={4} md={4} lg={4}>
                        <Text value={result.type} />
                    </Grid>
                    <Grid item xs={8} md={8} lg={8}>
                        <Text value={result.value} />
                    </Grid>
                </Grid>
                <div style={{ height: 10 }} />
            </Fragment>
        )
    });
}

Technology.defaultProps = {
    company: {}
}

Technology.propTypes = {
    company: PropTypes.object
}

export default Technology;