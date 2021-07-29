import React, { Fragment, useState } from 'react';
import PropType from 'prop-types';
import { makeStyles, withStyles, Typography, Tooltip } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 0,
        padding: 0
    }
}));

const LightTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
    },
}))(Tooltip);

export default function CustomPopOver(props) {
    const classes = useStyles();

    const { label, content, placement } = props;

    const [open, setOpen] = React.useState(false);


    const handleClick = event => {
        // console.log("enter")
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };


    const addLineBreaks = arr =>
        arr.map((text, index) => (
            <span key={`${text}-${index}`}>
                <p> {text} </p>
            </span>
        ));


    return (
        <LightTooltip title={Array.isArray(content) ? addLineBreaks(content) : content} placement={placement}>
            {label}
        </LightTooltip>
    );
}

CustomPopOver.defaultProps = {

}

CustomPopOver.propType = {
    content: PropType.array.isRequired,
    label: PropType.node.isRequired
}