import React, { useReducer, useContext, useState, useEffect } from 'react';
import { makeStyles, Paper, Grid, Divider, ButtonGroup, IconButton, Button } from '@material-ui/core';


//util
import { checkAuth } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';

//component
import MenuItems from 'components/core/MenuItems';
import Text from 'components/core/Text';

//hook
// import { useHomeHook } from './useHomeHook';

//route
import { history } from 'router/history';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },

}));

export default function Manage(props) {

    if (!checkAuth()) {
        history.push("/login");
    }

    const [state, dispatch] = useAppValue();

    const items = [
        {
            icon: "fa fa-user-circle",
            title: "Users",
            text: "View/manage existing users and add new users",
            link: "/manage/user/dashboard"
        },
        {
            icon: "fa fa-share-alt",
            title: "Data Quality Check",
            text: "View data from multiple sources to do consistency check",
            link: "/"
        },
        {
            icon: "fa fa-hourglass-end",
            title: "Subscription Plan",
            text: "Create and modify trial preriod and subscription plan",
            link: "/"
        },
        {
            icon: "fa fa-id-card",
            title: "Personal Info",
            text: "Provide and Edit personal contact details and how we can reach you",
            link: "/"
        },
        {
            icon: "fa fa-unlock-alt",
            title: "Password",
            text: "Manage password if forgotten or change for new one",
            link: "/"
        },
        {
            icon: "fa fa-envelope",
            title: "Email & Notifications",
            text: "Choose notification preferences and how you want to be contacted",
            link: "/"
        },
        {
            icon: "fa fa-credit-card",
            title: "Billing Info",
            text: "Review payments and manage billing contacts",
            link: "/"
        },
        {
            icon: "fa fa-life-ring",
            title: "Account Security",
            text: "Secure your account with right Authentication method",
            link: "/"
        },
    ]

    return (
        <>
            
            <Text value="Manage" style={{marginLeft: '9%',marginTop:'3%', fontSize: '15px', fontWeight: 700}} />
            <Grid container style={{marginLeft: '6%', marginTop:'2%'}}>
                {
                    items.map(x=>(
                        <Grid item xs={12} sm={4} md={4} style={{maxWidth:'27%', marginRight:'3%', marginBottom:'1%'}}>
                        <MenuItems 
                            icon={x.icon}
                            title={x.title}
                            text={x.text}
                            link={x.link}
                        />
                        </Grid>
                    ))
                }
            </Grid>
        </>
    );
}