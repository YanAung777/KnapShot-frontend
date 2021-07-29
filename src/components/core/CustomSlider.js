import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus,&:hover,&$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

export default function CustomSlider(props) {

    const { label, value } = props;

    const [period, setPeriod] = useState(0);

    const onChange = (e, val) => {
        let value = 1;
        if (val < 3) value = 1;
        else if (val < 5) value = 3;
        else value = 6;
        setPeriod(value);
    }

    return (
        <div>
            <Typography gutterBottom>{label}</Typography>
            <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                defaultValue={value}
                value={period}
                min={0}
                max={6}
                onChange={onChange}
            />
        </div>
    );
}