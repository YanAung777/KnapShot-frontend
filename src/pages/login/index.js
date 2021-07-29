import React, { useState, Fragment } from 'react';

import { makeStyles, Paper, Grid, Avatar, Container, CssBaseline, Divider, TextField } from '@material-ui/core';

//components
import TextInput from 'components/core/TextInput';
import Button from 'components/core/Btn';
import Tooltip from 'components/core/Tooltip';
import Text from 'components/core/Text'

//route
import { history } from 'router/history';

//icons
import { Email, VpnKey } from '@material-ui/icons';

//hook
import { useLoginHook } from './useLoginHook';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3),
        margin: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatarWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textField: {
        margin: theme.spacing(1),
    },
    wrapper: {
        // flexGrow: 1,
        //height: '100vh'
    },
}));

function Login(props) {

    const classes = useStyles();

    const [email, setEmail, password, setPassword, loading, error, onSubmit] = useLoginHook();

    const { urlEmail } = props.match.params

    const onLogin = async () => {
        await onSubmit(email || urlEmail, password);
    }

    const handleClick = () => {
        history.push('/reset')
    }

    return (
        <div style={{ paddingTop: '10%' }}>
            <Grid container justify="center">
                <Grid item xs={12} md={4}>
                    <Paper className={classes.root}>
                        <div className={classes.avatarWrapper}>
                            <img src={require("assets/images/logo.jpg")} width="80" height="80" />
                        </div>
                        <TextField
                            className={classes.textField}
                            fullWidth
                            autoFocus
                            id="outlined-password-input"
                            label="Username"al
                            type="username"
                            // autoComplete="current-username"
                            value={email || urlEmail}
                            width="100%"
                            variant="outlined"
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            className={classes.textField}
                            fullWidth
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="outlined"
                            onChange={e => setPassword(e.target.value)}
                            onKeyPress={(ev) => {
                                if (ev.key === 'Enter') {
                                    onLogin()
                                    ev.preventDefault();
                                }
                            }}
                        />
                        <Button value="Login" onClick={onLogin} style={{margin:"8px", height: "50px"}}/>
                        <Divider />
                        <Text value="Forgotten your password" style={{ cursor: "pointer", margin:"8px", }} onClick={handleClick} />
                    </Paper>
                </Grid>
                {
                    error !== "" &&
                    <Tooltip label={error} visible={true} />
                }
            </Grid>
        </div>
    );
}

export default Login;
