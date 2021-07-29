import React, { useState, Fragment } from 'react';

import { makeStyles, Paper, Grid, Avatar, Container, CssBaseline, Divider } from '@material-ui/core';

//components
import TextInput from 'components/core/TextInput';
import Button from 'components/core/Btn';
import Tooltip from 'components/core/Tooltip';
import Text from 'components/core/Text'

//context
import { useAppValue } from 'context/app';


//icons
import { Email, VpnKey } from '@material-ui/icons';

//hook
import { useLoginHook } from './useLoginHook';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        // flexGrow: 1,
        //height: '100vh'
    },
    detail: {
        marginTop: '7px',
        marginBottom: '7px'
    },
    button: {
        margin: '10px auto 0 auto',
        textTransform: 'capitalize',
        width: '80%',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#fc9803',
        '&:hover': {
            backgroundColor: '#fc9803',
            color: '#FFF'
        }
    },
}));

function Reset() {

    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const [email, setEmail, password, setPassword, loading, error, onSubmit] = useLoginHook();

    const onSendMail = async () => {
        // await onSubmit(email, password);
        try {
            const response = await api().post(endpoints.Reset, { email });
            // setLoading(false);
            if (response.status === 200) {
                // setSession("user", response.data.user);
                // history.push("/");
                dispatch({ type: "showSnackBar", message: response.data.message, varient: "success" });
            }
            else dispatch({ type: "showSnackBar", message: response.data.message, varient: "error" });
            // else setError(response.data.message);
        } catch (err) {
            // setError("Email and Password do not match");
            dispatch({ type: "showSnackBar", message: err, varient: "error" });
        }
    }

    return (
        <div style={{ paddingTop: '10%' }}>
            <Grid container justify="center">
                <Grid item xs={12} md={4}>
                    <Paper className={classes.root}>
                        <div className={classes.avatarWrapper}>
                            <Text value="Reset your password" className={classes.detail} style={{ fontSize: "15px" }} />
                        </div>
                        <Divider className={classes.detail} />
                        <Text value="Username or email" className={classes.detail} />
                        <TextInput
                            // label="Email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoFocus
                            type="Username"
                        />
                        <Divider className={classes.detail} />
                        <Button className={classes.button} value="Send Reset Email" onClick={onSendMail} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Reset;
