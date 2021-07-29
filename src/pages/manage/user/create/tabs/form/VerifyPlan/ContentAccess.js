import React, { useState, useEffect } from 'react';
import { makeStyles, Paper, Typography, ButtonBase, Divider, Popover, Button } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";

import UFirstColumn from './UpperColums/UFirstColumn'
import USecondColumn from './UpperColums/USecondColumn'
import UThirdColumn from './UpperColums/UThirdColumn'
import UFourthColumn from './UpperColums/UFourthColumn'
import UFifthColumn from './UpperColums/UFifthColumn'
import UFQCColumn from './UpperColums/UFQCColumn'

import MFirstColumn from './MiddleColums/MFirstColumn'
import MSecondColumn from './MiddleColums/MSecondColumn'
import MThirdColumn from './MiddleColums/MThirdColumn'
import MFourthColumn from './MiddleColums/MFourthColumn'
import MFifthColumn from './MiddleColums/MFifthColumn'
import MQCColumn from './MiddleColums/MQCColumn'


import LFirstColumn from './LowerColums/LFirstColumn'
import LSecondColumn from './LowerColums/LSecondColumn'
import LThirdColumn from './LowerColums/LThirdColumn'
import LFourthColumn from './LowerColums/LFourthColumn'
import LFifthColumn from './LowerColums/LFifthColumn'
import LQCColumn from './LowerColums/LQCColumn'

//components
import Text from 'components/core/Text';

//constants
import endpoints from 'constants/endpoints';

const useStyles = makeStyles(theme => ({
    // .page {
    //     width: 21cm;
    //     min-height: 29.7cm;
    //     padding: 2cm;
    //     margin: 1cm auto;
    //     border: 1px #D3D3D3 solid;
    //     border-radius: 5px;
    //     background: white;
    //     box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    //   }
}));

export default function ContentAccess({allCheckBox, setAllCheckBox, handleChange, plan}) {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState([false, false, false, false, false, false, false, false, false]);
    
    return (
        <Paper  style={{ width: '100%', maxHeight: window.innerHeight - 250, overflowY: 'scroll' }}>
            <Paper elevation={2} style={{ margin: '5px' }} square>
                <Grid style={{ padding: '5px', display: 'flex',flexDirection: 'row'}}>
                    <UFirstColumn />
                    <USecondColumn />
                    <UThirdColumn plan={plan}/>
                    <UFourthColumn plan={plan}/>
                    <UFQCColumn plan={plan}/>
                    <UFifthColumn handleChange={handleChange} allCheckBox={allCheckBox} plan={plan} />
                </Grid>

            </Paper >
            <Paper elevation={2} style={{ margin: '5px' }} square>
                <Grid style={{ padding: '5px', display: 'flex',flexDirection: 'row'}}>
                    <MFirstColumn expanded={expanded} setExpanded={setExpanded} />
                    <MSecondColumn expanded={expanded} setExpanded={setExpanded} />
                    <MThirdColumn expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                    <MFourthColumn expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                    <MQCColumn expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                    <MFifthColumn handleChange={handleChange} allCheckBox={allCheckBox} expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                
                </Grid>
            </Paper>
            <Paper elevation={2} style={{ margin: '5px' }} square>
                <Grid style={{ padding: '16px', display: 'flex',flexDirection: 'row'}}>
                    <LFirstColumn expanded={expanded} setExpanded={setExpanded} />
                    <LSecondColumn expanded={expanded} setExpanded={setExpanded} />
                    <LThirdColumn expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                    <LFourthColumn expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                    <LQCColumn expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                    <LFifthColumn handleChange={handleChange} allCheckBox={allCheckBox} expanded={expanded} setExpanded={setExpanded} plan={plan}/>
                </Grid>
            </Paper>
        </Paper >
    )
}