import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popover, Divider } from '@material-ui/core';
import Text from 'components/core/Text';
import OutsideClickHandler from 'react-outside-click-handler';
import { Check } from '@material-ui/icons';
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        marginLeft: 10,
    },
    button: {
        cursor: 'pointer',
        float: 'right',
        border: 'none',
        padding: '3px 10px',
        display: 'flex',
        alignItems: 'center',
    },
    main: {
        width: window.innerWidth - (window.innerWidth) * 0.25,
        height: window.innerHeight - 210,
        zIndex: 2,
        padding: "20px 10px 10px 10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    scroll: {
        width: "100%",
        height: "95%",
        overflowY: 'scroll',
        overflowX: 'scroll'
    },
    industry: {
        margin: 5,
        width: "31%",
        height: "86%",
        zIndex: 3,
        padding: 10,
        boxShadow: "5px 5px 5px 0px #ccc",
        border: "1px solid #aaa",
    },
    secondColumn: {
        padding: "15px 10px 15px 10px",
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        height: "39%",
        zIndex: 3,
        boxShadow: "5px 5px 5px 0px #ccc",
        border: "1px solid #aaa",
    },
    thirdColumn: {
        padding: 10,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        height: "35%",
        zIndex: 3,
        boxShadow: "5px 5px 5px 0px #ccc",
        border: "1px solid #aaa",
    },
    option: {
        boxShadow: 'none',
        minWidth: 120,
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgray'
        },
        margin: '8px 5px 8px 5px'
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
    dot: {
        height: "10px",
        width: "10px",
        backgroundColor: "#03B1F1",
        borderRadius: "50%",
        display: "inline-block",
        marginLeft: "-150px",
        position: "absolute",
        top: "-9px",
        right: "-9px"
    }
}));

export default function SortPopover(props) {
    const classes = useStyles();
    const { className, options, icon, onSelectChange, label } = props;
    const [visible, setVisible] = useState(false);
    //const [visible, setVisible] = useState(false);

    const [value, setValue] = useState("");

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const onClick = (value) => {
        if (onSelectChange) onSelectChange(value)
        setValue(value);
        setVisible(false);
    }

    return (
        <div className={classes.root} >
            <div onClick={toggle}>
                <ButtonBase >
                    <div>Sort{value ? <span className={classes.dot}></span> : null}</div>
                </ButtonBase>
            </div>

            {/* <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}> */}
            <Popover
                onClose={handleClose}
                open={visible}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 130, left: 255 }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {/* <SortSelect style={{ float: 'right' }} options={sortLists}/> */}
                <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
                    <div className={classes.root} {...props}>
                        {/* <div onClick={toggle}>
                            <ButtonBase className={classes.button} >
                                <div style={{ margin: "0 auto" }}>{value}</div>
                            </ButtonBase>
                        </div> */}
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
                <Divider />
                <div className={classes.text} style={{ float: 'right', paddingRight: 15 }}>
                    <Text value="Clear" onClick={() => onClick(null)} />
                </div>
            </Popover>
            {/* </OutsideClickHandler> */}
        </div>
    );
}

SortPopover.defaultProps = {
    options: [],
    label: ""
}

SortPopover.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string
}