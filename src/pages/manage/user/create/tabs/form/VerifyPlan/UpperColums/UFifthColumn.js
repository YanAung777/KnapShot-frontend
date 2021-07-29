import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleOutlineTwoToneIcon from '@material-ui/icons/CheckCircleOutlineTwoTone';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';

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

export default function UFifthColumn({ handleChange, allCheckBox, plan }) {
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
                {/* <Grid item md={12} style={{ height: '70px', position: 'relative' }}>
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'location_map'} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"industry_chart"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"scoring_chart"} />
                        </div>
                    </div>
                </Grid> */}

                {/* second row */}
                <Grid item md={12} style={{ height: '90px', position: 'relative' }}>
                    {/* <Divider className={classes.divider} /> */}
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <VerticalButtonNoWrap value="Industry View" type="custom" name={"digital_engagement_industry_view"} onChange={handleChange} allCheckBox={allCheckBox} plan={plan} />
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '20%' }} >
                            <div style={{ height: '25px' }}>
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"digital_asset"} />
                            </div>
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"dir_presence"} />
                        </div>
                        <VerticalButtonNoWrap value="Provider View" type="custom" name={"digital_engagement_provider_view"} onChange={handleChange} allCheckBox={allCheckBox} plan={plan} />
                    </div>
                </Grid>

                {/* third row */}
                <Grid item md={12} style={{ height: '150px', position: 'relative' }}>
                    <Divider className={classes.divider} />
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <VerticalButton value="Industry View" type="custom" name={"technology_industry_view"} onChange={handleChange} allCheckBox={allCheckBox} plan={plan} />
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"advertising"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"analytics"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"ecommerce"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"widgets"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"hosting"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"productivity"} />
                        </div>
                        <VerticalButton value="Provider View" type="custom" name={"technology_provider_view"} onChange={handleChange} allCheckBox={allCheckBox} plan={plan} />
                    </div>
                </Grid>

                {/* fourth row */}
                <Grid item md={12} style={{ height: '130px', position: 'relative' }}>
                    <Divider className={classes.divider} />
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"company_info_tab"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"digital_presence_tab"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"technology_tab"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"people_tab"} />
                            <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={"activities_tab"} />
                        </div>
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
                        checked={allCheckBox[value] || false}
                        icon={<CircleUnchecked />}
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