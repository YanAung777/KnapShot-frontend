import React, { useReducer, useContext, useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, ButtonGroup, IconButton, Button } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { Add } from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add';
import Icon from "@material-ui/core/Icon";
import SearchBar from 'material-ui-search-bar'
import { Search, Close } from '@material-ui/icons';
import { grey, red, pink, yellow, amber } from '@material-ui/core/colors';

//util
import { checkAuth } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';

//route
import { history } from 'router/history';

//components
import DoughNutChart from 'pages/manage/components/doughNutChart';
import UserItems from 'components/core/UserItems';
import Text from 'components/core/Text';
import CustomProgressBar from 'components/core/CustomProgressBar'
import CustomMiniSelect from 'components/core/CustomMiniSelect'
import ProgressBar from 'components/core/ProgressBar'

const useStyles = makeStyles(theme => ({

}));

export default function User(props) {

    const classes = useStyles()

    if (!checkAuth()) {
        history.push("/login");
    }

    
    useEffect(() => {
        history.push("/manage/user/dashboard");
    }, [])


    return (

        null
    );
}