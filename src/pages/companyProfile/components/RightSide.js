import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Divider, Tooltip, Typography } from '@material-ui/core';
import { Check, Clear, Twitter } from '@material-ui/icons';

//css
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import { fontWeight } from '@material-ui/system';

//components
import Icon from 'components/core/CustomIcon';
import Text from 'components/core/Text';
import ProgressBar from 'components/core/ProgressBar';

//constants
import { keyValues } from 'constants/keyValues';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 30px'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        margin: '15px 0'
    },
    score: {
        width: 60,
        height: 60,
        fontWeight: '600'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '15px 0'
    },
    progress: {
        margin: '15px 0'
    }
}));

const RightSide = (props) => {

    const classes = useStyles();
    const {
        website,
        overall_knapshot_score,
        activity_score,
        facebook,
        linkedIn,
        instagram,
        twitter,
        company_email_address,
        main_line_number,
        personnels,
        address,
        no_of_directory_presence,
        asset,
        digital_presence_score,
        technology_asset_score
    } = props.company;

    let totalTechnology = technology_asset_score;
    let tmpObj = {};

    // const values = ["Avertising  Network", "ads txt", "Ad Exchange", "Audience Targeting", "Facebook Exchange", "Ad Server", "Affiliate Programs", "Contextual Advertising", "Dynamic Creative Optimization", "Digital Video Ads", "Retargeting / Remarketing", "Header Bidding",
    //     "Application Performance", "A/B Testing", "Ad Analytics", "Conversion Optimization", "Advertiser Tracking", "Tag Management", "Audience Measurement", "Visitor Count Tracking",
    //     "Non Platform", "Hosted Solution", "Open Source", "Checkout Buttons", "Payment Acceptance", "Payments Processor", "Payment Currency",
    //     "Live Chat", "Login", "Ticketing System", "Bookings", "Social Sharing", "Social Management",
    //     "Cloud Hosting", "Cloud PaaS", "Dedicated Hosting", "Business Email Hosting", "Web Hosting Provider Email", "Marketing Platform",
    //     "CRM", "Lead Generation", "Marketing Automation", "Product Recommendations", "Feedback Forms and Surveys", "Campaign Management"];

    if (asset && Object.keys(asset).length > 0) {

        let assets = JSON.parse(asset);

        Object.values(assets).forEach(item => {
            Object.keys(item).forEach(key => {
                if (keyValues[key]) {
                    if (tmpObj[keyValues[key]]) {
                        tmpObj[keyValues[key]] += 1;
                    }
                    else {
                        tmpObj[keyValues[key]] = 1;
                    }
                }
            });
        });

        // console.log("assets",assets)

        // if (assets["Advertising"] !== undefined) {
        //     let len = 0;
        //     console.log("a", Object.keys(assets["Advertising"]))
        //     for (let [key, value] of Object.entries(assets["Advertising"])) {
        //         if (values.includes(key)) {
        //             value.map(b => {
        //                 if (len < 1.4) {
        //                     console.log("b", b)
        //                     len += 0.1
        //                 }
        //             })
        //         }
        //     }
        //     totalTechnology += len;
        // }

        // if (assets["Analytics and Tracking"] !== undefined) {
        //     let len = 0;
        //     console.log("a", Object.keys(assets["Analytics and Tracking"]))
        //     for (let [key, value] of Object.entries(assets["Analytics and Tracking"])) {
        //         if (values.includes(key)) {
        //             value.map(b => {
        //                 if (len < 1.4) {
        //                     console.log("b", b)
        //                     len += 0.1
        //                 }
        //             })
        //         }
        //     }
        //     totalTechnology += len;
        // }

        // if (assets["Ecommerce"] !== undefined) {
        //     let len = 0;
        //     console.log("a", Object.keys(assets["Ecommerce"]))
        //     for (let [key, value] of Object.entries(assets["Ecommerce"])) {
        //         if (values.includes(key)) {
        //             value.map(b => {
        //                 if (len < 1.4) {
        //                     console.log("b", b)
        //                     len += 0.1
        //                 }
        //             })
        //         }
        //     }
        //     totalTechnology += len;
        // } 

        // if (assets["Productivity"] !== undefined) {
        //     let len = 0;
        //     console.log("I am Productivity")
        //     console.log("Unique", Object.keys(assets["Productivity"]))
        //     for (let [key, value] of Object.entries(assets["Productivity"])) {
        //         if (values.includes(key)) {
        //             value.map(b => {
        //                 if (len < 1.4) {
        //                     console.log("b", b)
        //                     len += 0.1
        //                 }
        //             })
        //         }
        //     }
        //     totalTechnology += len;
        // }

        // if (assets["Widgets"] !== undefined) {
        //     let len = 0;
        //     console.log("a", Object.keys(assets["Widgets"]))
        //     for (let [key, value] of Object.entries(assets["Widgets"])) {
        //         if (values.includes(key)) {
        //             value.map(b => {
        //                 if (len < 0.7) {
        //                     console.log("b", b)
        //                     len += 0.1
        //                 }
        //             })
        //         }
        //     }
        //     totalTechnology += len;
        // }

        // if (assets["Hosting"] !== undefined) {
        //     let len = 0;
        //     console.log("a", Object.keys(assets["Hosting"]))
        //     for (let [key, value] of Object.entries(assets["Hosting"])) {
        //         if (values.includes(key)) {
        //             value.map(b => {
        //                 if (len < 0.7) {
        //                     console.log("b", b)
        //                     len += 0.1
        //                 }
        //             })
        //         }
        //     }
        //     totalTechnology += len;
        // }
    }

    let advertising = tmpObj["Advertising"] ? tmpObj["Advertising"] : 0;
    let analytic = tmpObj["Analytics and Tracking"] ? tmpObj["Analytics and Tracking"] : 0;
    let ecommerce = tmpObj["Ecommerce"] ? tmpObj["Ecommerce"] : 0;
    let widgets = tmpObj["Widget"] ? tmpObj["Widget"] : 0;
    let hosting = tmpObj["Hosting"] ? tmpObj["Hosting"] : 0;
    let productivity = tmpObj["Productivity"] ? tmpObj["Productivity"] : 0;

    let lists = [
        { label: "Advertising", count: advertising, icon: <i style={{ color: 'gray' }} className="fas fa-bullhorn" /> },
        { label: "Analytics", count: analytic, icon: <i style={{ color: 'gray' }} className="fas fa-link" /> },
        { label: "E-commerce", count: ecommerce, icon: <i style={{ color: 'gray' }} className="fas fa-university" /> },
        { label: "Widgets", count: widgets, icon: <i style={{ color: 'gray' }} className="fas fa-paper-plane" /> },
        { label: "Hosting", count: hosting, icon: <i style={{ color: 'gray' }} className="fas fa-tags" /> },
        { label: "Productivity", count: productivity, icon: <i style={{ color: 'gray' }} className="fas fa-trophy" /> },
    ];

    return (
        <div className={classes.root}>
            <div className={classes.item}>
                <div className={classes.score}>
                    <CircularProgressbar value={overall_knapshot_score * 10} text={overall_knapshot_score} />
                </div>
                <Text value="Knapshot Score" />
            </div>
            <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                {
                    lists.map((item, index) => (
                        <div key={index} style={{ width: '50%', display: 'flex', flexDirection: 'column', textAlign: 'center', margin: '10px 0px' }}>
                            <Typography style={{ fontSize: 13, marginBottom: 5 }}>{item.label}</Typography>
                            {item.icon}
                            <Typography style={{ fontSize: 14, color: '#000', fontWeight: 'bold', margin: '5px 0' }}>{item.count}</Typography>
                            <Typography style={{ fontSize: 12, color: '#000' }}>found</Typography>
                        </div>
                    ))
                }
            </div>
            <div className={classes.progress}>
                <Text value="Technology Asset" />
                {
                    technology_asset_score && <ProgressBar
                        value={(technology_asset_score / 7) * 100}
                        tooltip={parseFloat(technology_asset_score.toFixed(1))} />}
            </div>
        </div>
    )
}


RightSide.defaultProps = {
    company: {}
}

RightSide.propTypes = {
    company: PropTypes.object
}


export default RightSide;
