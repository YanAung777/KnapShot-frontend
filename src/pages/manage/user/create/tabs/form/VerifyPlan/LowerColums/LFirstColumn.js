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
        //borderTop: '1px dashed #ccc',
        backgroundImage: 'linear-gradient(to right, black 33%, rgba(255,255,255,0) 0%)',
        backgroundPosition: 'bottom',
        backgroundSize: '3px 1px',
        backgroundRepeat: 'repeat-x'
    },
    paper: {
        padding: theme.spacing.unit,
        textAlign: "center",
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        border: "none"
    },
}));

export default function LFirstColumn({ expanded, setExpanded }) {
    const classes = useStyles()
    const handleChange = index => {
        let temp = [...expanded]
        temp[index] = !temp[index]
        setExpanded(temp);
    };

    return (
        <Grid item md={3}>

            <Grid item md={12} className={classes.grid} style={{ position: 'relative' }}>
                <Text value="DB Export" style={{ fontSize: '11px', fontWeight: 600, position: 'absolute', top: '20%', left: '3%' }} />
            </Grid>

            <Grid item md={12} >
                <Grid container spacing={24} >
                    <Grid item md={2} style={{ display: 'flex', justifyContent: 'center' }}>

                    </Grid>

                    <Grid item md={10} >

                        {/* fifth row */}
                        <Grid item md={12} style={expanded[8] ? { height: '130px' } : { height: '45px' }}>
                            <div className={classes.paper} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', top: '20%' }} >
                                <Text value="Total records Downloadable Per month" style={{ fontSize: '12px', whiteSpace: 'pre-wrap', textAlign: 'left' }} />
                                {
                                    expanded[8] ? <RemoveIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(8)} /> : <AddIcon style={{ cursor: 'pointer', paddingRight: '4px' }} onClick={() => handleChange(8)} />
                                }
                            </div>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}