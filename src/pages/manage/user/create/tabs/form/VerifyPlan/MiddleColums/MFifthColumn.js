import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import { HorizontalButton } from '../CustomButton'
import { VerticalButton, VerticalButtonNoWrap } from '../CustomButton'

//components
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: "center",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        border: "none"
    },
    divider: {
        height: '1px',
        background: 'linear-gradient(to right, transparent 45%, #ccc 0%), linear-gradient(to right, #ccc 2%, rgba(255,255,255,0) 0%)',
        backgroundSize: '16px 2px, 100% 2px'
    },
    grid: {
        height: '35px',
        display: 'flex',
        justifyContent: 'center'
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

export default function MFifthColumn({ expanded, handleChange, allCheckBox, plan }) {
    const classes = useStyles()
    return (
        <Grid item md={2}>
            <Paper elevation={1} square >
                <Grid item md={12} className={classes.grid}>
                    <div className={classes.paper}>
                        <HorizontalButton value={`Custom`} plan={plan} />
                    </div>
                </Grid>

                {/* first row */}
                <Grid item md={12} style={{ height: '35px', position: 'relative' }}>
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'countries_filter'} />
                        </div>
                    </div>
                </Grid>

                {/* second row */}
                <Grid item md={12} style={expanded[0] ? { height: '150px' } : { height: '35px' }}>
                    <div className={classes.paper} >
                        <ExpansionPanel expanded={expanded[0]} >
                            <ExpansionPanelSummary></ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'industry_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'emp_size_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'hq_location_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'company_staff_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'role_search_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'designation_search_filter'} />
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
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'contact_asset_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'social_acc_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'dir_presence_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'digital_engagement_level_filter'} />
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
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'avertising_network_filter'} /> */}
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'ads_txt_filter'} />
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'ad_exchange_filter'} /> */}
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'audience_targeting_filter'} />
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'facebook_exchange_filter'} /> */}
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'ad_server_filter'} /> */}
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'affiliate_program_filter'} /> */}
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'contextual_advertising_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'dynamic_creative_optimiztion_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'digital_video_ads_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'retargeting_filter'} />
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'header_bidding_filter'} /> */}
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
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'app_performance_filter'} />
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'ab_testing_filter'} /> */}
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'ad_analytics_filter'} /> */}
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'conversion_optimization_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'advertiser_tracking_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'tag_mgmt_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'audience_measurement_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'visitor_count_tracking_filter'} />
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'non_platform_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'hosted_solution_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'open_source_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'checkout_button_filter'} /> */}
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
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'non_platform_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'hosted_solution_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'open_source_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'checkout_button_filter'} />
                                {/* <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'payment_acceptance_filter'} /> */}
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'payment_processor_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'payment_currency_filter'} />
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
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'live_chat_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'login_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'ticketing_sys_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'bookings_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'social_sharing_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'schedule_mgmt_filter'} />
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
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'cloud_hosting_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'cloud_paas_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'dedicated_hosting_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'business_email_hosting_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'web_hosting_provider_email_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'marketing_platform_filter'} />
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
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'crm_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'lead_generation_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'marketing_automation_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'product_recommendation_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'feedback_form_&_survey_filter'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'campaign_mgmt_filter'} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </Grid>
            </Paper>
        </Grid>
    )
}

export function CheckBox({ type, onChange, value, allCheckBox, plan }) {
    const classes = useStyles()
    return (
        type === 'tick' ?
            <Checkbox
                className={classes.root}
                icon={<CheckCircleOutlineTwoToneIcon style={{ color: 'black' }} />}
                checkedIcon={<i class="fa fa-check" aria-hidden="true" style={{ fontSize: '12px', margin: '3px' }}></i>}
                disabled
                disableRipple
                color="default"
                style={{ padding: '0px', fontSize: '11px' }}
            /> :
            type === 'cross' ?
                <Checkbox
                    className={classes.root}
                    icon={<HighlightOffRoundedIcon style={{ color: 'red' }} />}
                    checkedIcon={<i class="fa fa-check" aria-hidden="true" style={{ fontSize: '12px', margin: '3px' }}></i>}
                    disabled
                    disableRipple
                    color="default"
                    style={{ padding: '0px', fontSize: '11px' }}
                /> :
                type === 'custom' ?
                    <Checkbox
                        className={classes.root}
                        icon={<CircleUnchecked />}
                        checked={allCheckBox[value] || false}
                        checkedIcon={<i class="fa fa-check" aria-hidden="true" style={{ fontSize: '12px', margin: '3px' }}></i>}
                        disableRipple
                        onChange={onChange}
                        value={value}
                        color="default"
                        disabled={plan === 'custom' ? false : true}
                        style={{ padding: '0px', fontSize: '11px' }}
                    />
                    : ''
    )
}