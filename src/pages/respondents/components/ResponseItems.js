import React, { } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Grid, Divider, ButtonGroup, IconButton, Button } from '@material-ui/core';
import { Favorite, Add } from '@material-ui/icons';
import CommentIcon from '@material-ui/icons/Comment';

//util
import { checkAuth } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';

//hook
// import { useHomeHook } from './useHomeHook';

//components
import CustomIcon from 'components/core/CustomIcon';
// import CustomPopOver from 'components/core/CustomPopOver';
import Text from 'components/core/Text';

//route
import { history } from 'router/history';
import { grey } from '@material-ui/core/colors';

import CreateIcon from '@material-ui/icons/Create';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        borderRadius: '20px',
        cursor: 'pointer',
        maxHeight: '200px',
        marginLeft: 10,
        marginTop: 10
    },
}));

export default function ResponseItems({ value, icon, name }) {

    // console.log("value", value)
    // console.log("icon", icon)
    // console.log("name", name)

    if (!checkAuth()) {
        history.push("/login");
    }
    const classes = useStyles();



    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{
                width: '60px',
                borderRight: `2px solid #ccc`,
                padding: '2%',
                marginTop: '2%'
            }}>
                <Text value={icon} style={{ textAlign: 'center' }} />
                <Text value={name} style={{ fontSize: '10px', width: '100%', textAlign: 'center'  }} />
            </div>
            <Grid container>
                <Child value={value} />
            </Grid>
        </div>
    );
}


const Child = ({ value }) => Object.entries(value).map(([key, count]) => 
        <Grid item md={2} style={{ marginTop: '5%',display: 'felx', justifyContent: 'space-around' }}>
            <Text value={count} style={{ fontSize: '15px', width: '100%', textAlign: 'center'  }} />
            <Text value={key} style={{ fontSize: '10px', width: '100%', textAlign: 'center'  }} />
        </Grid>
)


ResponseItems.defaultProps = {
}

ResponseItems.propType = {
}