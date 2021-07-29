import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popover, Divider } from '@material-ui/core';
import Text from 'components/core/Text';
import OutsideClickHandler from 'react-outside-click-handler';
import { Check } from '@material-ui/icons';
import { useAppValue } from 'context/app';
//hook
import { Hook } from '../hook';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        minWidth: 100
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        minWidth: 80
    },
    scroll: {
        width: "100%",
        height: "95%",
        overflowY: 'scroll',
        overflowX: 'scroll'
    },
    option: {
        //position: 'absolute',
        boxShadow: 'none',
        minWidth: 70,
        //top: 30,
        //width: '100%',
        //zIndex: 2,
        //padding: 10
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgray'
        },
        margin: '8px 6px 8px 6px'
    },
    icon: {
        float: 'right',
        fontSize: 18,
        padding: 0
    },
    center: {
        height: 20,
        display: "flex",
        alignItems: "center",
    },
    right: {
        marginLeft: "auto"
    },
    middle: {
        marginLeft: 3,
        marginRight: 3,
    },
}));

export default function CountrySelect(props) {
    const classes = useStyles();
    const { className, options, icon, onSelectChange, label } = props;
    const [visible, setVisible] = useState(false);
    const [, , dataset, setDataset] = Hook();

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const onClick = (value) => {
        if (onSelectChange) onSelectChange(value)
        setDataset(value);
        setVisible(false);
    }

    return (
        <div className={classes.root} {...props}>
            <div onClick={toggle}>
                <ButtonBase className={classes.button} >
                    <div style={{ margin: "0 auto", position: "relative" }}>{dataset}</div>
                </ButtonBase>
            </div>

            <Popover
                onClose={handleClose}
                open={visible}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 50, left: 870 }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
                    <div className={classes.root} {...props}>
                        {
                            visible &&
                            <Paper className={classes.option}>
                                {options.map((option, index) => (
                                    <Typography
                                        key={index}
                                        className={classes.text}
                                        onClick={() => onClick(option)}>
                                        {option}
                                        {option === dataset && <Check className={classes.icon} />}
                                    </Typography>
                                ))}
                            </Paper>
                        }
                    </div>
                </OutsideClickHandler>
            </Popover>
        </div>
    );
}

CountrySelect.defaultProps = {
    options: [],
    label: ""
}

CountrySelect.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string
}