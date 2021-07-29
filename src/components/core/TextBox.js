import React, { useState } from 'react';
import { makeStyles, Paper, Grid, Divider, ButtonGroup, IconButton, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
//components
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        paddingLeft: '10px',
        marginRight: theme.spacing(1),
        width: 250,
        //height: 100,
    },
    text: {
        marginLeft: theme.spacing(3),
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: '12px',
        color: '#9c9797'
    },
    input2: {
        height: 7,
        fontSize: "12px"
    }
}));

export default function TextBox(props) {
    const classes = useStyles()

    const { id, label, require, allTextbox, onChange, btnOnOff, allEmails } = props
    let [validate, setValidate] = useState(true)
    let [err, setErr] = useState('Public Email Not Allowed!')

    const onType = (e) => {
        onChange({ ...allTextbox, [id]: e.target.value })
        let value = e.target.value
        if (id === 'email' && value) {
            var re = /^[a-zA-Z0-9_.+-]+@(?!gmail|yahoo|hotmail|outlook)(?:[a-z0-9.-]+\.?)+\.[a-zA-Z0-9-.]+$/;
            // var re = `/^[\${typedBrands}\]$/`;
            validate = re.test(value)
            setValidate(validate)
            btnOnOff(validate)
            if (allEmails.includes(value)) {
                setErr('Email already in use!')
                setValidate(!validate)
                btnOnOff(!validate)
            }
        }
        if (value === '') {
            btnOnOff(validate)
            setValidate(true)
        }
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'baseline' }}>
                <Text value={label} className={classes.text} />
                {
                    require ?
                        <span style={{ color: 'red', fontSize: '15px' }}>*</span>
                        :
                        <span></span>
                }
            </div>
            <TextField
                id={id}
                className={classes.textField}
                margin="dense"
                value={allTextbox[id]}
                onChange={onType}
                variant="outlined"
                InputProps={{
                    classes: {
                        input: classes.input2,
                    },
                }}
                error={id === 'email' && !validate}
                helperText={id === 'email' && !validate ? err : ''}
                required={require}
            />
        </div>
    )
}