import React, { useState, Fragment, useEffect } from 'react';

import { makeStyles, Paper, Grid, Avatar, Container, CssBaseline, Divider } from '@material-ui/core';

//components
import TextInput from 'components/core/TextInput';
import Button from 'components/core/Btn';
import Tooltip from 'components/core/Tooltip';
import Text from 'components/core/Text'


//icons
import { Email, VpnKey } from '@material-ui/icons';

//hook
import { useLoginHook } from './useLoginHook';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//router
import { history } from 'router';


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

function Change(props) {

    const classes = useStyles();

    const { email } = props.match.params

    const [password, setPassword, loading, error, onSubmit] = useLoginHook();
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [validate, setValidate] = useState(false)

    const onUpdatePassword = async () => {
        if (newPassword === confirmPassword) {
            const response = await api().post(
                endpoints.ResetPassword,
                {
                    email: email,
                    password: newPassword,
                }
            );
            if (response.status === 200) {
                // console.log("response.data", response.data)
                // setData(response.data.data)
                history.push(`/login/${response.data.data}`)
            }
            // alert(newPassword)
        }
        else alert('Password do not match')
    }

    useEffect(() => {
        var re = /^(?=.*\d)((?=.*[a-z])|(?=.*[A-Z]))(?=.*[!@#$%^&*]).{8,}$/;
        setValidate(re.test(newPassword))
        if (confirmPassword) {
            // if(newPassword === confirmPassword) alert("Password Match")
        }
    }, [newPassword, confirmPassword])

    return (
        <div style={{ paddingTop: '10%' }}>
            <Grid container justify="center">
                <Grid item xs={12} md={4}>
                    <Paper className={classes.root}>
                        <div className={classes.avatarWrapper}>
                            <Text value="Update your password" className={classes.detail} style={{ fontSize: "15px" }} />
                        </div>
                        <Divider className={classes.detail} />
                        <Text value="Your password must contain the following" className={classes.detail} />
                        <div className={classes.detail} style={{ display: 'flex', flexDirection: 'column' }}>
                            <Text value="1. At least 8 characters" />
                            <Text value="2. At least 1 letter and at least 1 number or symbol" />
                        </div>
                        <Text value="New Password" className={classes.detail} />
                        <TextInput
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            type="password" />
                        <Text value="Re-type Password" className={classes.detail} />
                        <TextInput
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                            disabled={!validate ? true : false}
                            type="password" />
                        <Divider className={classes.detail} />
                        <Button className={classes.button} value="Update Password" onClick={onUpdatePassword} />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default Change;
