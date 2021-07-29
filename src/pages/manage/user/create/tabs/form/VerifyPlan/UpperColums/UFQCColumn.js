import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

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

export default function UFQCColumn({ plan }) {
    const classes = useStyles()
    return (
        <Grid item md={2}>
            <Paper elevation={1} square >
                <Grid item md={12} className={classes.grid}>
                    <div className={classes.paper}>
                        <HorizontalButton value={`QC Checker`} plan={plan} />
                    </div>
                </Grid>

                {/* first row */}
                {/* <Grid item md={12} style={{ height: '70px', position: 'relative' }}>
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                        </div>
                    </div>
                </Grid> */}

                {/* second row */}
                <Grid item md={12} style={{ height: '90px', position: 'relative' }}>
                    {/* <Divider className={classes.divider} /> */}
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <VerticalButtonNoWrap value="Industry View" type="tick" />
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '20%' }}>
                            <div style={{ height: '25px' }}>
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            </div>
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                        </div>
                        <VerticalButtonNoWrap value="Provider View" type="tick" />
                    </div>
                </Grid>

                {/* third row */}
                <Grid item md={12} style={{ height: '150px', position: 'relative' }}>
                    <Divider className={classes.divider} />
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <VerticalButton value="Industry View" type="tick" />
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }}>
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                        </div>
                        <VerticalButton value="Provider View" type="tick" />
                    </div>
                </Grid>

                {/* fourth row */}
                <Grid item md={12} style={{ height: '130px', position: 'relative' }}>
                    <Divider className={classes.divider} />
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }}>
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>} style={{ fontSize: '12px' }} />
                            <Text value={<i class="fa fa-times" aria-hidden="true" style={{ color: 'red' }}></i>} style={{ fontSize: '12px' }} />
                        </div>
                    </div>
                </Grid>
            </Paper>
        </Grid>
    )
}