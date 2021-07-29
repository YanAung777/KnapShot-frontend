import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton } from '@material-ui/core';

export default function Text(props) {
    const { icon, label, onClick } = props;
    return (
        <IconButton onClick={onClick} size="small" aria-label={label} {...props} >
            {icon}
        </IconButton>
    );
}

Text.defaultProps = {
    label: "",
    onClick: () => { }
}

Text.propType = {
    label: PropTypes.string,
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func,
}