import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import AddIcon from '@material-ui/icons/Add';
import Grid from "@material-ui/core/Grid";
//components
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    grid: {
        height: '35px'
    },
    button: {
        border: '1.2px solid lightgray',
        borderRadius: 20,
        padding: '3px 10px',
        height: 250,
        width: 0,
        display: 'flex',
        alignItems: 'center',
    },
    divider: {
        height: '1px',
        background: 'linear-gradient(to right, transparent 45%, #ccc 0%), linear-gradient(to right, #ccc 2%, rgba(255,255,255,0) 0%)',
        backgroundSize: '16px 2px, 100% 2px'
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: "center",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        border: "none"
    },
}));

const ExpansionPanel = withStyles({
    root: {
        //border: '1px solid rgba(0, 0, 0, .125)',
        padding: 0,
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        //backgroundColor: 'rgba(0, 0, 0, .03)',
        //borderBottom: '1px solid rgba(0, 0, 0, .125)',
        padding: 0,
        marginBottom: -1,
        height: '20px',
        minHeight: 0,
        '&$expanded': {
            minHeight: 0,
        },
    },
    content: {
        padding: 0,
        '&$expanded': {
            //margin: '1px 0',
        },
    },
    expanded: {
        padding: 0,
    },
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
    root: {
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
    },
}))(MuiExpansionPanelDetails);

export default function MSecondColumn({ expanded }) {
    const classes = useStyles()

    return (
        <Grid item md={3}>
            <Grid item md={12} className={classes.grid}>

            </Grid>

            {/* first rows */}
            <Grid item md={12} style={{ height: '35px', position: 'relative' }}>
                <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >

                </div>
            </Grid>

            {/* second row */}
            <Grid item md={12} style={expanded[0] ? { height: '150px' } : { height: '35px' }}>
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[0]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Text value={`Industry`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Employee Size`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`HQ Location`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Co with Staff Contacts`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Roles Search`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Designation Search`} style={{ fontSize: '12px', textAlign: 'left' }} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

            {/* third row */}
            <Grid item md={12} style={expanded[1] ? { height: '115px' } : { height: '35px' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[1]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Text value={`Contactable Assets`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Social Accounts`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Directory Presence`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Digital Engagement Level`} style={{ fontSize: '12px', textAlign: 'left' }} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

            {/* fourth row */}
            <Grid item md={12} style={{ height: '35px', position: 'relative' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >

                </div>
            </Grid>

            {/* fifth row */}
            <Grid item md={12} style={expanded[2] ? { height: '150px' } : { height: '35px' }}>
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[2]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                [
                                    "ads txt",
                                    "Audience Targeting",
                                    "Contextual Advertising",
                                    "Dynamic Creative Optimization",
                                    "Digital Video Ads",
                                    "Retargeting / Remarketing",
                                ].map(x => <Text value={x} style={{ fontSize: '12px', textAlign: 'left' }} />)
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

            {/* sixth row */}
            <Grid item md={12} style={expanded[3] ? { height: '150px' } : { height: '35px' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[3]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                [
                                    "Application Performance",
                                    "Conversion Optimization",
                                    "Advertiser Tracking",
                                    "Tag Management",
                                    "Audience Measurement",
                                    "Visitor Count Tracking",
                                ].map(x => <Text value={x} style={{ fontSize: '12px', textAlign: 'left' }} />)
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

            {/* seventh row */}
            <Grid item md={12} style={expanded[4] ? { height: '150px' } : { height: '35px' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[4]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                [
                                    "Non Platform",
                                    "Hosted Solution",
                                    "Open Source",
                                    "Checkout Buttons",
                                    "Payments Processor",
                                    "Payment Currency"
                                ].map(x => <Text value={x} style={{ fontSize: '12px', textAlign: 'left' }} />)
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

            {/* eighth row */}
            <Grid item md={12} style={expanded[5] ? { height: '150px' } : { height: '35px' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[5]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                [
                                    "Live Chat",
                                    "Login",
                                    "Ticketing System",
                                    "Bookings",
                                    "Social Sharing",
                                    "Schedule Management"
                                ].map(x => <Text value={x} style={{ fontSize: '12px', textAlign: 'left' }} />)
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

            {/* ninth row */}
            <Grid item md={12} style={expanded[6] ? { height: '150px' } : { height: '35px' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[6]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            {
                                [
                                    "Cloud Hosting",
                                    "Cloud PaaS",
                                    "Dedicated Hosting",
                                    "Business Email Hosting",
                                    "Web Hosting Provider Email",
                                    "Marketing Platform"
                                ].map(x => <Text value={x} style={{ fontSize: '12px', textAlign: 'left' }} />)
                            }
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

            {/* tenth row */}
            <Grid item md={12} style={expanded[7] ? { height: '150px' } : { height: '35px' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[7]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Text value={`CRM`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Lead Generation`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Marketing Automation`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Product Recommendations`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Feedback Forms and Surveys`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Campaign Management`} style={{ fontSize: '12px', textAlign: 'left' }} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>
        </Grid>
    )
}