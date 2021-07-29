import React, { useEffect, useState } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import ScatterChart from 'components/charts/scatterChart';

//constants
import { countryName } from 'constants/countryName';

//context
import { useAppValue } from 'context/app';

import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    centerItem: {
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
    },
    pills: {
        "width": "50px",
        "height": "12px",
        "borderRadius": "20px",
        "background": "#000"
    },
    pillsWrapper: {
        "minWidth": "100px",
        "borderRight": "2px dashed gray",
        "display": "flex",
        "alignItems": "center",
        "justifyContent": "center"
    },
    ScatterBarChartWrapper: {
        margin: "0px 10%"
    }

}));

export default function DigitalEngagementBreakDown() {
    const [state, dispatch] = useAppValue();
    const { DigitalEngagementBreakDown } = state;

    // const { results } = DigitalEngagementBreakDown

    const classes = useStyles();


    return (
        <div style={{
            position: 'relative',
            height: window.innerHeight - 220,
            overflowY: 'scroll'
        }}>
            <div className={classes.centerItem}>
                <Typography style={{ fontSize: 14, fontWeight: '600', paddingTop: "4%" }}>Breakdown of Digital Engagement Score: Digital Presence vs Technology</Typography>
            </div>
            {
                <div className={classes.ScatterBarChartWrapper}>
                    <ScatterChart DigitalEngagementBreakDown={DigitalEngagementBreakDown} />
                </div>
            }
        </div>
    )
}





















