import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
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

export default function USecondColumn() {
    const classes = useStyles()
    return (
        <Grid item md={2}>
            <Grid item md={12} className={classes.grid}>

            </Grid>

            {/* first row */}
            {/* <Grid item md={12} style={{ height: '70px', position: 'relative' }}>
                <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >
                    <Text value="Location Map" style={{ fontSize: '12px' }} />
                    <Text value="Industry Chart" style={{ fontSize: '12px' }} />
                    <Text value="Scoring Chart" style={{ fontSize: '12px' }} />
                </div>
            </Grid> */}

            {/* second row */}
            <Grid item md={12} style={{ height: '90px', position: 'relative' }}>
                {/* <Divider className={classes.divider} /> */}
                <div className={classes.paper} style={{ position: 'absolute', top: '20%' }} >
                    <div style={{ height: '25px' }}>
                        <Text value={`Digital Asset`} style={{ fontSize: '12px', textAlign: 'left' }} />
                        <Text value="(Website & Social Assets)" style={{ fontSize: '9px', lineHeight: '3px', textAlign: 'left' }} />
                    </div>
                    <div style={{ height: '25px' }}>
                        <Text value="Directory" style={{ fontSize: '12px', textAlign: 'left' }} />
                        <Text value="Presence (6)" style={{ fontSize: '12px', lineHeight: '2px', textAlign: 'left' }} />
                    </div>
                </div>
            </Grid>

            {/* third row */}
            <Grid item md={12} style={{ height: '150px', position: 'relative' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} style={{ position: 'absolute', top: '8%' }} >
                    <Text value={`Advertising`} style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value={`Analytics`} style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value="E-Commerce" style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value="Widgets" style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value="Hosting" style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value="Productivity" style={{ fontSize: '12px', textAlign: 'left' }} />
                </div>
            </Grid>

            {/* fourth row */}
            <Grid item md={12} style={{ height: '130px', position: 'relative' }}>
                <Divider className={classes.divider} />
                <div className={classes.paper} style={{ position: 'absolute', top: '8%' }} >
                    <Text value={`Company Info`} style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value={`Digital Presence`} style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value="Technology" style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value="People" style={{ fontSize: '12px', textAlign: 'left' }} />
                    <Text value="Activities" style={{ fontSize: '12px', textAlign: 'left' }} />
                </div>
            </Grid>
        </Grid>
    )
}