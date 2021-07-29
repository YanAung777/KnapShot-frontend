import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button } from '@material-ui/core';
import { Check } from '@material-ui/icons';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        marginLeft: 10
    },
    button: {
        zIndex: -1,
        border: '1.2px solid lightgray',
        borderRadius: 20,
        padding: '3px 10px',
        height: 30,
        minWidth: 120,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    option: {
        position: 'absolute',
        top: 30,
        width: 200,
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
    },
    center: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start"
    }
}));

function checkCount(arr, length) {
    let count = 0
    arr.map((v) => v && count++)
    return count === length
}

export default function CustomSelect(props) {
    const classes = useStyles();

    const {  options, icon, onSelectChange } = props;

    const [visible, setVisible] = useState(false);

    const [countryName, setCountryName] = useState();
    const [allCheckBoxes, setAllCheckBoxes] = useState();

    useEffect(() => {
        function initialize() {
            let init = new Array(options.countryName.length).fill(true);
            setAllCheckBoxes(init)
            setCountryName(options.countryName)
            onSelectChange(options.countryName)
        }
        initialize()
    }, [options])

    const toggle = () => {
        setVisible(!visible);
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all

        let a = [...allCheckBoxes].map(() => event.target.checked)
        setAllCheckBoxes(a)
        event.target.checked ? setCountryName(countryName) : setCountryName([])
        onSelectChange([])
    }

    const handleCountryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;

        let tempCheckBox = [...allCheckBoxes];
        let tempCountryName = [...countryName];

        tempCheckBox[index] = checked

        if (checked) tempCountryName.push(name);
        else tempCountryName.splice(tempCountryName.indexOf(name), 1);

        setCountryName(tempCountryName)
        onSelectChange(tempCountryName)
        setAllCheckBoxes(tempCheckBox)

    }

    return (
        <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
            <div className={classes.root} {...props}>
                <div onClick={toggle}>
                    <ButtonBase className={classes.button} >
                        {icon ? icon : null}
                        <div style={{ margin: "0 auto" }}>{options.countryName[0]}</div>
                    </ButtonBase>
                </div>

                {
                    visible &&
                    <Paper className={classes.option}>
                        <div className={classes.center}>
                            <input
                                type="checkbox"
                                onChange={checkAll}
                                checked={checkCount(allCheckBoxes, options.countryName.length)}
                            />

                            <Typography>
                                Select All   ({options.count})
                            </Typography>
                        </div>
                        {options.countries.map((country, index) => (
                            <div className={classes.center}>
                                <input
                                    type="checkbox"
                                    id={index}
                                    name={country.dataset}
                                    checked={allCheckBoxes[index]}
                                    onChange={handleCountryCheckbox}
                                />
                                <Typography
                                    key={index}
                                // onClick={() => onClick(country.dataset)}
                                >
                                    {country.dataset}   ({country.count})
                                </Typography>
                            </div>
                        ))}
                    </Paper>
                }
            </div>
        </OutsideClickHandler>
    );
}

CustomSelect.defaultProps = {
    options: [],
    label: ""
}

CustomSelect.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string
}