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
import TextField from '@material-ui/core/TextField';

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
    textbox: {
        '& .MuiOutlinedInput-input': {
            padding: '2px 0px',
            fontSize: '12px',
            textAlign: 'center'
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 50,
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
        borderTop: '1px dashed #ccc',
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
        height: 0,
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

export default function LFifthColumn({ expanded,handleChange, allCheckBox, plan }) {
    const classes = useStyles()

    return (
        <Grid item md={2}>
            <Paper elevation={1} square >
                <Grid item md={12} className={classes.grid}>
                    <div className={classes.paper}>
                        <HorizontalButton value={`Custom`} plan={plan}/>
                    </div>
                </Grid>

                {/* fifth row */}
                <Grid item md={12} style={expanded[8] ? { height: '130px' } : { height: '45px' }}>
                    <div className={classes.paper} >
                    <form className={classes.textbox} noValidate autoComplete="off" style={{marginTop:'4px'}}>
                            <TextField
                                //label="Size"
                                id="outlined-size-small"
                                //defaultValue="500"
                                variant="outlined"
                                size="small"
                                //disabled
                                type="number"
                                disabled = {plan === 'custom' ? false : true}
                                style={{margin: 0}}
                                onInput = {(e) =>{
                                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
                                }}
                            />
                        </form>
                        <ExpansionPanel expanded={expanded[8]} >
                            <ExpansionPanelSummary></ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{marginTop: '4px'}}>
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'company_contact_downloadable'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'presonal_contact_downloadable'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'frimographic_data_downloadable'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'digital_presence_downloadable'} />
                                <CheckBox type="custom" plan={plan} onChange={handleChange} allCheckBox={allCheckBox} value={'technographic_data_downloadable'} />
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
                disabled = {plan === 'custom' ? false : true}
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
                        style={{ padding: '0px', fontSize: '11px' }}
                    />
                    : ''
    )
}