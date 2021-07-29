import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper } from '@material-ui/core';
import CustomIcon from 'components/core/CustomIcon'
import { Check, Add } from '@material-ui/icons';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        // marginLeft: 10
    },
    button: {
        zIndex: -1,
        border: '1px solid lightgray',
        borderRadius: 20,
        // padding: '3px 10px',
        height: 20,
        minWidth: "100%",
        display: 'flex',
        alignItems: 'center',
        fontSize: 10
        // justifyContent: 'flex-start'
    },
    option: {
        position: 'absolute',
        top: 30,
        width: '110%',
        zIndex: 2,
        padding: 10
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgray'
        },
        marginBottom: 5
    },
    icon: {
        float: 'right',
        fontSize: 18,
        padding: 0
    }
}));

export default function CustomMiniSelect(props) {
    const classes = useStyles();

    const { onSelectChange } = props;

    const [visible, setVisible] = useState(false);

    const [value, setValue] = useState("Select One Breakdown");

    const options = ["Select One Breakdown","Category Breakdown", "Provider Breakdown"];
    // const options = ["Select One Breakdown", "Industry Breakdown", "Provider Breakdown"];

    const toggle = () => {
        setVisible(!visible);
    }

    const onClick = (value) => {
        if (onSelectChange) onSelectChange(value)
        setValue(value);
        setVisible(false);
    }

    return (
        <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
            <div className={classes.root} {...props}>
                <div onClick={toggle}>
                    <ButtonBase className={classes.button} >
                        <CustomIcon style={{ padding: 0 }} icon={<Add style={{ fontSize: 14 }} />} />
                        {value}
                    </ButtonBase>
                </div>
                {
                    visible &&
                    <Paper className={classes.option}>
                        {options.map((option, index) => (
                            <Typography
                                key={index}
                                className={classes.text}
                                onClick={() => onClick(option)}>
                                {option}
                                {option === value && <Check className={classes.icon} />}
                            </Typography>
                        ))}
                    </Paper>
                }
            </div>
        </OutsideClickHandler>
    );
}

CustomMiniSelect.defaultProps = {
    options: [],
}

CustomMiniSelect.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
}