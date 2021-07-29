import React, { useReducer, useContext, useState, useEffect } from 'react';
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

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        borderRadius: '20px',
        cursor: 'pointer',
        maxHeight: '200px',
        marginLeft: 10,
        marginTop: 10
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    image: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        fontSize: '40px',
        fontWeight: '800px',
        color:'#3c8dbc',
        position: 'relative',
        marginLeft: 20,
        marginTop: 10,
        marginRight: 15,
        marginBottom: 10
    },
    txtHeader: {
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'center'
    }
}));

export default function Manage(props) {

    if (!checkAuth()) {
        history.push("/login");
    }
    const classes = useStyles();
    const [state, dispatch] = useAppValue();

    const onSelectPaper = (link) => {
        history.push(link)
    }

    const { icon, title, text, link } = props

    return (
        <div
            onClick={() => onSelectPaper(link)}
            {...props}
        >
            <Paper elevation={12} className={classes.root}>
                <div
                    className={classes.item}
                    style={{
                        borderRight: `1px solid #ccc`,
                        marginRight: 10,
                        marginTop: 10,
                        marginBottom: 10,
                        minWidth: '30%'
                    }}
                >
                    <div className={classes.image}>
                        <i className={icon} aria-hidden="true"></i>
                    </div>
                </div>
                <div style={{ minWidth: '40%' }}>
                    <Text value={title} className={classes.txtHeader} style={{ fontWeight: '600' }} />
                    <Text value={text} style={{ fontSize: '12px', margin: "12px 5px 12px auto" }} />
                </div>
            </Paper>
        </div>
    );
}

Manage.defaultProps = {
    icon: "",
    title: "",
    text: "",
    link: ""
}

Manage.propType = {
    icon: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    link: PropTypes.string
}