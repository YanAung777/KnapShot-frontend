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
        height: 350,
        width: 0,
        display: 'flex',
        alignItems: 'center',
        marginTop: '100%',
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

export default function UFirstColumn() {
    const classes = useStyles()
    return (
        <Grid item md={3}>

            <Grid item md={12} className={classes.grid} style={{ position: 'relative' }}>
                <Text value="Content Access" style={{ fontSize: '11px', fontWeight: 600, position: 'absolute', top: '80%', left: '3%' }} />
            </Grid>

            <Grid item md={12} >
                <Grid container spacing={24} >
                    <Grid item md={2} style={{ display: 'flex', justifyContent: 'center' }}>
                        <ButtonBase disableRipple className={classes.button}>
                            <div style={{ fontSize: '12px', transform: 'rotate(-90deg)', display: 'flex', justifyContent: 'center' }}>Dashboard</div>
                        </ButtonBase>
                    </Grid>

                    <Grid item md={10} >

                        {/* first row */}
                        {/* <Grid item md={12} style={{ height: '70px', position: 'relative' }}>
                            <div className={classes.paper} style={{position: 'absolute', top: '8%'}}>
                                <Text value="Overview" style={{ fontSize: '12px' }} />
                            </div>
                        </Grid> */}

                        {/* second row */}
                        <Grid item={12} style={{ height: '90px', position: 'relative' }}>
                            {/* <Divider className={classes.divider} /> */}
                            <div className={classes.paper} style={{ position: 'absolute', top: '20%' }}>
                                <Text value="Digital Engagement" style={{ fontSize: '12px' }} />
                            </div>
                        </Grid>

                        {/* third row */}
                        <Grid item={12} style={{ height: '150px', position: 'relative' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ position: 'absolute', top: '8%' }}>
                                <Text value="Technology" style={{ fontSize: '12px' }} />
                            </div>
                        </Grid>

                        {/* fourth row */}
                        <Grid item={12} style={{ height: '130px', position: 'relative' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ position: 'absolute', top: '8%' }}>
                                <Text value="Individual Company Profile" style={{ fontSize: '12px' }} />
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}