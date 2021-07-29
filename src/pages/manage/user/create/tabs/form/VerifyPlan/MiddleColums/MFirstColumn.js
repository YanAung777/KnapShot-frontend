import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Grid from "@material-ui/core/Grid";
//components
import Text from 'components/core/Text';
import CustomIcon from 'components/core/CustomIcon';

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

export default function MFirstColumn({ expanded, setExpanded }) {
    const classes = useStyles()
    const handleChange = index => {
        let temp = [...expanded]
        temp[index] = !temp[index]
        setExpanded(temp);
    };

    return (
        <Grid item md={3}>

            <Grid item md={12} className={classes.grid} style={{ position: 'relative' }}>
                <Text value="Advanced Filters" style={{ fontSize: '11px', fontWeight: 600, position: 'absolute', top: '80%', left: '3%' }} />
            </Grid>

            <Grid item md={12} >
                <Grid container spacing={24} >
                    <Grid item md={2} style={{ display: 'flex', justifyContent: 'center' }}>

                    </Grid>

                    <Grid item md={10} >

                        {/* first row */}
                        <Grid item md={12} style={{ height: '35px', position: 'relative' }}>
                            <div className={classes.paper} style={{ position: 'absolute', top: '8%' }}>
                                <Text value="Countries" style={{ fontSize: '12px' }} />
                            </div>
                        </Grid>

                        {/* second row */}
                        <Grid item md={12} style={expanded[0] ? { height: '150px' } : { height: '35px' }}>
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="Firmographic" style={{ fontSize: '12px' }} />
                                {
                                    expanded[0] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(0)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(0)} />
                                }

                            </div>
                        </Grid>

                        {/* third row */}
                        <Grid item md={12} style={expanded[1] ? { height: '115px' } : { height: '35px' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="Digital Presence" style={{ fontSize: '12px' }} />
                                {
                                    expanded[1] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(1)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(1)} />
                                }

                            </div>
                        </Grid>

                        {/* fourth row */}
                        <Grid item md={12} style={{ height: '35px', position: 'relative' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ position: 'absolute', top: '8%', paddingLeft: '1px' }}>
                                <Text value="Technology" style={{ fontSize: '12px', fontWeight: 700, color: '#919190' }} />
                            </div>
                        </Grid>

                        {/* fifth row */}
                        <Grid item md={12} style={expanded[2] ? { height: '150px' } : { height: '35px' }}>
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="Advertising" style={{ fontSize: '12px' }} />
                                {
                                    expanded[2] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(2)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(2)} />
                                }
                            </div>
                        </Grid>

                        {/* sixth row */}
                        <Grid item md={12} style={expanded[3] ? { height: '150px' } : { height: '35px' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="Analytics" style={{ fontSize: '12px' }} />
                                {
                                    expanded[3] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(3)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(3)} />
                                }
                            </div>
                        </Grid>

                        {/* seventh row */}
                        <Grid item md={12} style={expanded[4] ? { height: '150px' } : { height: '35px' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="E-Commerce" style={{ fontSize: '12px' }} />
                                {
                                    expanded[4] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(4)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(4)} />
                                }
                            </div>
                        </Grid>

                        {/* eighth row */}
                        <Grid item md={12} style={expanded[5] ? { height: '150px' } : { height: '35px' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="Widgets" style={{ fontSize: '12px' }} />
                                {
                                    expanded[5] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(5)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(5)} />
                                }
                            </div>
                        </Grid>

                        {/* ninth row */}
                        <Grid item md={12} style={expanded[6] ? { height: '150px' } : { height: '35px' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="Hosting" style={{ fontSize: '12px' }} />
                                {
                                    expanded[6] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(6)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(6)} />
                                }
                            </div>
                        </Grid>

                        {/* tenth row */}
                        <Grid item md={12} style={expanded[7] ? { height: '150px' } : { height: '35px' }}>
                            <Divider className={classes.divider} />
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }}>
                                <Text value="Productivity" style={{ fontSize: '12px' }} />
                                {
                                    expanded[7] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(7)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(7)} />
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}