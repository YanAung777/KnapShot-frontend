import React from 'react';
import { makeStyles, IconButton, Grid } from '@material-ui/core';

//components
import LineChart from 'components/charts/LineChart';
import Text from 'components/core/Text';
import CustomSlider from 'components/core/CustomSlider';

const useStyles = makeStyles(theme => ({
    root: {
        height: '100%',
        overflowY: 'scroll',
        padding: 15,
        backgroundColor: '#F2F2F2',
    },
    container: {
        marginTop: 15
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        position: 'relative',
        paddingBottom: 5,
    },
    slider: {
        width: 100,
        float: 'right',
        textAlign: 'center'
    }
}));


const Activities = () => {

    const classes = useStyles();
    
    const lists = ["Funding Activities", "M&A Activities", "Business Expansion", "Hiring", "Bankruptcy and Restructuring", "Cost Cutting", "Negative News", "Operational Challenges", "Management Changes", "New Offerings", "Partnership and Alliances", "Award and Recogniriona"];

    return (
        <div className={classes.root}>
            <div className={classes.slider}>
                <CustomSlider label="Period" value={5} />
            </div>
            <Grid container className={classes.container} spacing={2}>
                {
                    lists.map((list, index) => (
                        <Grid item xs={3} lg={3} sm={3}>
                            <div key={index} className={classes.item}>
                                <LineChart />
                                <Text value={list} style={{ textAlign: 'center' }} />
                            </div>
                        </Grid>
                    ))
                }
            </Grid>

            <div style={{ height: '300px' }} />
        </div>
    )
}


export default Activities;