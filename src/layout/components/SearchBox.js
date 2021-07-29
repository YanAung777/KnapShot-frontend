import React, { Fragment, useState, useEffect } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';

import { makeStyles, Paper, Popper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors/';
import { Delete } from '@material-ui/icons';

//components
import Text from 'components/core/Text';
import Icon from 'components/core/CustomIcon';
import Alert from 'components/core/Alert';
import Popup from 'components/core/Popup';

//context
import { useAppValue } from 'context/app';

//hook
import { Hook } from '../hook';

//router
import { history } from 'router';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        minWidth: 220,
        marginLeft: 5
    },
    input: {
        border: 'none',
        height: 30,
        width: '100%',
        outline: 'none'
    },
    itemsWrapper: {
        width: '100%',
        padding: 10,
        maxHeight: 300,
        overflowY: 'scroll',
        marginTop: 10
    },
    item: {
        marginBottom: 8,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    popover: {
        marginTop: 10,
        width: '100%'
    }
}));

export default function SearchBox(props) {
    const classes = useStyles();

    const [toggle, setToggle] = useState(false);

    const [state, dispatch] = useAppValue();

    const { setSearchValue, dataset, KSTdataSet } = props;

    const [search, setSearch, , setDataset, , , toggleSearch, setToggleSearch, deleteCompany, deleteAll] = Hook();


    const onChange = (e) => {
        setSearch(e.target.value);
        setToggleSearch(true)
        setSearchValue(e.target.value);
        setDataset(KSTdataSet)
    }

    const onSelect = (value) => {
        setSearch(value);
        setToggleSearch(false);
        setSearchValue(value)
        setDataset(KSTdataSet)

        history.push(`/company/${value}`);
        setAnchorEl(null);
    }

    const onDelete = name => {
        deleteCompany(name);
    }

    const deleteAllCompany = () => {
        setToggle(true);
    }

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setDataset(KSTdataSet)
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    return (
        <div className={classes.root}>
            <input
                placeholder="Try Company Name or Keywords"
                onChange={onChange}
                onClick={handleClick}
                value={search}
                className={classes.input} />

            <Popper id={id} open={open} anchorEl={anchorEl} style={{ zIndex: 12 }}>
                <Paper className={classes.itemsWrapper}>
                    {
                        state.search.length > 0 &&
                        <div onClick={deleteAllCompany}>
                            <Text value="Delete All" style={{ marginBottom: 15 }} />
                        </div>
                    }
                    {
                        state.search.map((company, index) => {
                            return (
                                <div className={classes.item} key={index}>
                                    <div onClick={() => onSelect(company.company_name)}>
                                        <Text value={company.company_name} />
                                        <Text value={company.website} style={{ color: 'gray', fontSize: 14 }} />
                                    </div>
                                    <div onClick={() => onDelete(company.company_name)}>
                                        <Icon icon={<Delete />} style={{ color: 'red' }} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </Paper>
            </Popper>

            <Alert
                visible={toggle}
                title={"Are you sure"}
                content={"Are you sure, you want to delete all companies"}
                onSubmit={deleteAll}
                onCancel={() => setToggle(false)} />
        </div>
    );
}

