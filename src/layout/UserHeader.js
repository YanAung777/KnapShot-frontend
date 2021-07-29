import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Paper, InputBase, Divider, IconButton, Typography, Button, ButtonBase, ButtonGroup } from '@material-ui/core';
import { Visibility, FolderOpen, Public, Equalizer, BubbleChart, Print, Share, GetApp, ArrowRight, ArrowLeft } from '@material-ui/icons';

//components
import CrumbList from 'components/core/CrumbList'
import Text from 'components/core/Text';
import OutlineBtn from 'components/core/OutlineBtn';

//util
import { checkAuth } from 'util/check-auth';

//route
import { history } from 'router/history';
import { routes } from 'router/routes';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: 'relative',
    },
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderBottom: '2px solid lightgray',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    divider: {
        height: 28,
        margin: 4,
    },
    btn: {
        padding: 5,
        marginRight: 5
    },
    filterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 5px',
    },
    filterWrapper2: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function UserHeader() {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const [filter, setFilter] = useState('');
    const [color, setColor] = useState('#000')

    useEffect(() => {
        function changePage() {
            if (filter === "Overview") {
                history.push("/overview")
                dispatch({
                    type: "setOverviewTab",
                    index: 0
                })
            }
            filter === "Company List" && history.push("/")
            filter === "Technology" && history.push("/technology")
            filter === "Digital Engagement" && history.push("/digitalEngagement")
        }
        changePage()
    }, [filter])

    if (!checkAuth()) {
        history.push("/login");
    }

    const [list,setList] = useState([
        {
            "name": "User Location",
            "color": "#CCC"
        },
        {
            "name": "Time Frame",
            "color": "#CCC"
        },
        {
            "name": "Account Expiry",
            "color": "#CCC"
        },
        {
            "name": "Usage Frequency",
            "color": "#CCC"
        },
        {
            "name": "Plan Type",
            "color": "#CCC"
        },
    ])

    const handleClick = value => {
        let temp = [...list]
        temp[temp.indexOf(value)].color='#3c8dbc'
        setList(temp)
    };

    //const list = ["User Location","Time Frame","Account Expiry","Usage Frequency","Plan Type"]

    return (
        <div className={classes.root}>
            <CrumbList />
            <div className={classes.root}>
                <div className={classes.filterWrapper2}>
                    {
                        list.map(x => {
                            return <OutlineBtn
                                value={x.name}
                                onClick = {()=>handleClick(x)}
                                style={{ borderColor: x.color ,backgroundColor: '#FFF', color: '#000', fontSize: 13, margin: "0 5px",minWidth:'130px', minHeight: '30px',borderRadius: "20px" }} 
                            />
                        //     return <ButtonBase style={{ borderColor: x.color ,backgroundColor: '#FFF', color: '#000', fontSize: 13, margin: "0 5px",minWidth:'130px', minHeight: '30px',borderRadius: "20px" }} onClick = {()=>handleClick(x)}>
                                
                        // <div style={{ margin: "0 auto" }}>{x.name}</div>
                        //     </ButtonBase>
                        })
                    }
                </div>
                <Divider />
            </div>
        </div>
    );
}