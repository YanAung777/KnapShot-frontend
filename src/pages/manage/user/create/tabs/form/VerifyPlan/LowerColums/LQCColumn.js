import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
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
    grid: {
        height: '35px',
        display: 'flex',
        justifyContent: 'center'
    },
    textbox: {
        '& .MuiOutlinedInput-input': {
            padding: '2px 0px',
            fontSize: '12px',
            textAlign: 'center'
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 40,
        },
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
        borderTop: '1px dashed #ccc',
    },
    btn1: {
        //marginLeft: 'auto',
        //marginRight: 'auto',
        border: '1.2px solid #3c8dbc',
        borderRadius: 20,
        padding: '3px 10px',
        height: 25,
        width: 100,
        display: 'flex',
        alignItems: 'center',
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

export default function LQCColumn({ expanded,plan }) {
    const classes = useStyles()
    // console.log('qcche',plan)
    return (
        <Grid item md={2}>
            <Paper elevation={1} square >
                <Grid item md={12} className={classes.grid}>
                    <div className={classes.paper}>
                        <HorizontalButton  value={`QC Checker`} plan={plan}/>
                    </div>
                </Grid>

                {/* fifth row */}
                <Grid item md={12} style={expanded[8] ? { height: '130px' } : { height: '45px' }}>
                    <div className={classes.paper} >
                        <Text value={"Download Disable"} style={{ fontSize: '12px', margin: 5 }}/>
                        <ExpansionPanel expanded={expanded[8]} >
                            <ExpansionPanelSummary></ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                            <Text value={<i class="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>} style={{ fontSize: '12px' }} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    </div>
                </Grid>

            </Paper>
        </Grid>
    )
}