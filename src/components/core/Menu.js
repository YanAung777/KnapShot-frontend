import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Divider, Button } from '@material-ui/core';
import Score from 'pages/score'

//util
import { removeSession, getSession } from 'util/check-auth';

//router
import { history } from 'router';

import CustomIcon from 'components/core/CustomIcon';

import Person from '@material-ui/icons/Person';

import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    paper: {
        marginRight: theme.spacing(2),

    },
}));

export default function CustomMenu(props) {
    const { menuItems, label, onClick } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [openPopUp, setOpenPopUp] = React.useState(false);
    const [userData, setUserData] = React.useState({});
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen(prevOpen => {
            return !prevOpen;
        });
    };

    const handleClose = event => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleRoute = (route, action) => {
        if (action === "logout") {
            removeSession("user")
            history.push("/");
            window.location.reload();
        }
        else {
            history.push(route);
            setOpen(false);
        }
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    React.useEffect(() => {
        async function getUserData() {
            setUserData(getSession("user"))
        }
        getUserData()
    }, []);

    return (
        <div className={classes.root}>
            {/* <Paper className={classes.paper}>
        <MenuList>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem>Logout</MenuItem>
        </MenuList>
      </Paper> */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <CustomIcon icon={<Person style={{ color: '#000', fontSize: '22px' }} />} label="person" />
                </Button>
                <Popover
                    onClose={handleClose}
                    open={open}
                    anchorReference="anchorPosition"
                    anchorPosition={{ top: 50, left: window.innerWidth - 50 }}
                // anchorOrigin={{
                //     vertical: 'bottom',
                //     horizontal: 'right',
                // }}
                // transformOrigin={{
                //     vertical: 'top',
                //     horizontal: 'right',
                // }}
                >

                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>

                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                {
                                    userData.role === "admin" &&
                                    <MenuItem style={{ fontSize: '13px', marginBottom: '7px' }} onClick={(e) => {
                                        handleClose(e)
                                        handleRoute("/manage")
                                    }}>
                                        <Text value="Manage" style={{ fontWeight: 700 }} />
                                    </MenuItem>
                                }

                                {
                                    userData.role === "admin" &&

                                    menuItems.map((menuItem, key) => <MenuItem style={{ fontSize: '13px' }} onClick={(e) => {
                                        handleClose(e)
                                        if (menuItem.link === "custom") setOpenPopUp(true)
                                        else handleRoute(menuItem.link)
                                    }}>{menuItem.name}</MenuItem>)
                                }
                                <MenuItem style={{ fontSize: '13px', marginBottom: '7px', marginTop: '7px' }} onClick={() => handleRoute("")}>
                                    <Text value="Help & Support" style={{ fontWeight: 700 }} />
                                </MenuItem>
                                <Divider />
                                <MenuItem style={{ fontSize: '13px' }} onClick={() => handleRoute("", "logout")}>
                                    <Text value="Log out" />
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>

                    </Paper>

                </Popover>

                <Text value={userData.role === "admin" ? "Super admin" : userData.firstname} style={{ fontSize: '10px', marginTop: '-10px', textAlign: "center" }} />

            </div>
            <Score visibleProp={openPopUp} setOpenPopUp={setOpenPopUp} />
        </div>
    );
}

CustomMenu.defaultProps = {
    label: "",
    onClick: () => { }
}

CustomMenu.propType = {
    label: PropTypes.string,
    menuItems: PropTypes.node.isRequired,
    onClick: PropTypes.func,
}