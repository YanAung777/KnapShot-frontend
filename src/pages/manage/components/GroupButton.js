import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, ButtonGroup, Button } from '@material-ui/core';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        
    },
    btn: {
        border: 'none',
        backgroundColor: 'transparent',
    }
}));

export default function GroupButton(props) {
    const classes = useStyles();

    const { children } = props;

    const [state, dispatch] = useAppValue();

    const [selected, setSelected] = useState(0);

    const onSelect = index => {
        dispatch({
            type: "setOverviewTab",
            index: index,
        });
        setSelected(index);
    }

    return (
        <ButtonGroup
            variant="contained"
            size="small"
            aria-label="small contained button group"
            className={classes.root}>
            {
                children.map((child, index) => (
                    <Button
                        className={classes.btn}
                        style={{ backgroundColor: index === selected ? 'lightgray' : null }}
                        onClick={() => onSelect(index)}>{child}</Button>
                ))
            }
        </ButtonGroup>
    );
}

GroupButton.defaultProps = {

}

GroupButton.propType = {

}