import React, { Fragment } from 'react';
import PropTypes, { string } from 'prop-types';
import { makeStyles, Paper, Grid } from '@material-ui/core';
import _ from 'lodash';

//components
import Icon from 'components/core/CustomIcon';
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10,
        backgroundColor: '#F2F2F2',
        height: '100%',
        overflowY: 'scroll'
    },
    item: {
        margin: '10px 0',
        padding: 10,
        border: 'none',
        boxShadow: 'none'
    }
}));

const Technology = (props) => {

    const classes = useStyles();

    const { directories } = props.company;

    return (
        <div className={classes.root}>
            {
                Object.keys(dataPreProcessing(directories)).map((key, index) => {
                    return (
                        <Paper className={classes.item} key={index}>
                            <Text value={key}
                                style={{ fontSize: 15, fontWeight: '600', color: 'gray' }} /><br />
                            <Grid container>
                                <Grid item xs={4} md={4} lg={4}>
                                    <Text value="Found" />
                                </Grid>
                                <Grid item xs={8} md={8} lg={8}>
                                    <Text value="Links" />
                                </Grid>
                            </Grid>
                            <div style={{ height: 10 }} />
                            {renderDirectoryLink(dataPreProcessing(directories)[key])}
                        </Paper>
                    )
                })
            }
            <div style={{ height: 300 }} />
        </div>
    )
}

const renderDirectoryLink = (data) => {

    let allData = []
    for (var i in data) {
        let hostname = data[i].replace('http://', '').replace('https://', '').replace('www.', '').split(/[/?#]/)[0];
        allData.push({ link: data[i], found: hostname })
    }
    return allData.map((data, index) => {
        return <Fragment key={index}>
            <Grid container key={index}>
                <Grid item xs={4} md={4} lg={4}>
                    <Text value={data.found} />
                </Grid>
                <Grid item xs={8} md={8} lg={8}>
                    <a href={data.link} target="blank"><Text value={data.link} /></a>
                </Grid>
            </Grid>
            <div style={{ height: 10 }} />
        </Fragment>
    })
    // return data.map((result, index) => {

    // });
}

const dataPreProcessing = (arr) => {
    let data = {}
    for (var i in arr) {
        if (!data[arr[i].directory]) data[arr[i].directory] = []
        data[arr[i].directory].push(arr[i].link)
    }
    return data

}

Technology.defaultProps = {
    company: {}
}

Technology.propTypes = {
    company: PropTypes.object
}

export default Technology;