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
        borderTop: '1px dashed #ccc',
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
        height: '28px',
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

export default function LSecondColumn({ expanded }) {
    const classes = useStyles()

    return (
        <Grid item md={3}>
            <Grid item md={12} className={classes.grid}>

            </Grid>

            {/* fifth row */}
            <Grid item md={12} style={expanded[8] ? { height: '130px' } : { height: '45px' }}>
                <div className={classes.paper} >
                    <ExpansionPanel expanded={expanded[8]} >
                        <ExpansionPanelSummary></ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Text value={`Company Contact`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Personal Contact`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Firmographic Data`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Digital Presence`} style={{ fontSize: '12px', textAlign: 'left' }} />
                            <Text value={`Technographic Data`} style={{ fontSize: '12px', textAlign: 'left' }} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </div>
            </Grid>

        </Grid>
    )
}