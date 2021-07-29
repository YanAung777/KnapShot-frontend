import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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

export default function MFourthColumn({ expanded, plan }) {
    const classes = useStyles()
    return (
        <Grid item md={2}>
            <Paper elevation={1} square >
                <Grid item md={12} className={classes.grid}>
                    <div className={classes.paper}>
                        <HorizontalButton value={`Comprehensive`} plan={plan} />
                    </div>
                </Grid>

                {/* first row */}
                <Grid item md={12} style={{ height: '35px', position: 'relative' }}>
                    <div style={{ display: "flex", flexDirection: 'row', height: '90%', justifyContent: 'space-around' }}>
                        <div className={classes.paper} style={{ display: "flex", flexDirection: 'column', position: 'absolute', top: '8%' }} >
                            <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                        </div>
                    </div>
                </Grid>

                {/* second row */}
                <Grid item md={12} style={expanded[0] ? { height: '150px' } : { height: '35px' }}>
                    <div className={classes.paper} >
                        <ExpansionPanel expanded={expanded[0]} >
                            <ExpansionPanelSummary></ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
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
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
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
                        {
                            expanded[2] ?
                                <ExpansionPanel expanded={expanded[2]} >
                                    <ExpansionPanelSummary></ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {
                                            [1, 1, 1, 1, 1, 1].map(x =>
                                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                            )
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                :
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />

                        }
                    </div>
                </Grid>

                {/* sixth row */}
                <Grid item md={12} style={expanded[3] ? { height: '150px' } : { height: '35px' }}>
                    <Divider className={classes.divider} />
                    <div className={classes.paper} >
                        {
                            expanded[3] ?
                                <ExpansionPanel expanded={expanded[3]} >
                                    <ExpansionPanelSummary></ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {
                                            [1, 1, 1, 1, 1, 1].map(x =>
                                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                            )
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                :
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />

                        }
                    </div>
                </Grid>

                {/* seventh row */}
                <Grid item md={12} style={expanded[4] ? { height: '150px' } : { height: '35px' }}>
                    <Divider className={classes.divider} />
                    <div className={classes.paper} >
                        {
                            expanded[4] ?
                                <ExpansionPanel expanded={expanded[4]} >
                                    <ExpansionPanelSummary></ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {
                                            [1, 1, 1, 1, 1, 1].map(x =>
                                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                            )
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                :
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />

                        }
                    </div>
                </Grid>

                {/* eighth row */}
                <Grid item md={12} style={expanded[5] ? { height: '150px' } : { height: '35px' }}>
                    <Divider className={classes.divider} />
                    <div className={classes.paper} >
                        {
                            expanded[5] ?
                                <ExpansionPanel expanded={expanded[5]} >
                                    <ExpansionPanelSummary></ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {
                                            [1, 1, 1, 1, 1, 1].map(x =>
                                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                            )
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                :
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />

                        }
                    </div>
                </Grid>

                {/* ninth row */}
                <Grid item md={12} style={expanded[6] ? { height: '150px' } : { height: '35px' }}>
                    <Divider className={classes.divider} />
                    <div className={classes.paper} >
                        {
                            expanded[6] ?
                                <ExpansionPanel expanded={expanded[6]} >
                                    <ExpansionPanelSummary></ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {
                                            [1, 1, 1, 1, 1, 1].map(x =>
                                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                            )
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                :
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />

                        }
                    </div>
                </Grid>

                {/* tenth row */}
                <Grid item md={12} style={expanded[7] ? { height: '150px' } : { height: '35px' }}>
                    <Divider className={classes.divider} />
                    <div className={classes.paper} >
                        {
                            expanded[7] ?
                                <ExpansionPanel expanded={expanded[7]} >
                                    <ExpansionPanelSummary></ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        {
                                            [1, 1, 1, 1, 1, 1].map(x =>
                                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />
                                            )
                                        }
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>
                                :
                                <Text value={<i class="fa fa-check" aria-hidden="true"></i>} style={{ fontSize: '12px' }} />

                        }
                    </div>
                </Grid>
            </Paper>
        </Grid>
    )
}