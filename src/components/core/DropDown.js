import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        maxWidth: 120,
        backgroundColor: theme.palette.background.paper
    },
    list: {
        padding: 0
    },
    item: {
        fontSize: 13
    }
}));


export default function DropDown(props) {

    const { options } = props;

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleClickListItem = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (event, index, option) => {
        setSelectedIndex(index);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="selected-country" className={classes.list}>
                <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="selected-country"
                    onClick={handleClickListItem}>
                    <ListItemText secondary={options[selectedIndex]} />
                </ListItem>
            </List>
            <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}>
                {
                    options.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 0}
                            selected={index === selectedIndex}
                            onClick={event => handleMenuItemClick(event, index, option)}
                            className={classes.item} >
                            {option}
                        </MenuItem>
                    ))
                }
            </Menu>
        </div>
    );
}

DropDown.defaultProps = {
    options: []
}

DropDown.propType = {
    options: PropTypes.array.isRequired
}