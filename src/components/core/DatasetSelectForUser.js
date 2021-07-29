import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popper, Checkbox, Button, Divider } from '@material-ui/core';
import { Check } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// import clsx from 'clsx';
import OutsideClickHandler from 'react-outside-click-handler';
import Text from 'components/core/Text'

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';
import { color } from 'constants/color';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        marginLeft: 10,
        cursor: "pointer"
    },
    button: {
        zIndex: -1,
        // border: '1.2px solid lightgray',
        // borderRadius: 20,
        padding: '3px 10px 3px 0px',
        height: 30,
        // minWidth: 120,
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'flex-start'
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
        justifyContent: "flex-start",
        margin: "10px 0px"
    },
    textButton: {
        color: color.primary,
        cursor: "pointer", padding: "5px"
    }
}));

function checkCount(arr, length) {
    let count = 0
    arr.map((v) => v && count++)
    return count === length
}

function filtered(arr) {
    const func = (trueOrFalse) => trueOrFalse;
    return !arr.every(func)
}

export default function CustomSelect(props) {
    const classes = useStyles();

    const { options, icon } = props;

    const [state, dispatch] = useAppValue();
    const { totalCountries, selectedDataset } = state

    const [visible, setVisible] = useState(false);

    const [countryName, setCountryName] = useState([]);
    const [allCheckBoxes, setAllCheckBoxes] = useState([]);

    useEffect(() => {
        function setSelectedDataset() {
            let init
            if (Array.isArray(selectedDataset)) {
                init = totalCountries.countryName.map((country) => selectedDataset.includes(country))
                setCountryName(selectedDataset)
            }
            else {
                init = new Array(totalCountries.countryName.length).fill(true);
                setCountryName(totalCountries.countryName)
            }
            setAllCheckBoxes(init)

        }
        setSelectedDataset()
    }, [selectedDataset])

    const toggle = () => {
        setVisible(!visible);
    }

    const handleCancel = () => {
        setVisible(false);
    }

    const handleSave = () => {
        dispatch({ type: "setSelectedDataset", dataset: countryName });
        setVisible(false);
    }

    const clearFilter = () => { // pass true or false to check or uncheck all

        let a = [...allCheckBoxes].map(() => false)
        setAllCheckBoxes(a)
        setCountryName([])
        // onSelectChange([])
    }

    const checkAll = (event) => { // pass true or false to check or uncheck all
        let a = [...allCheckBoxes].map(() => event.target.checked)
        setAllCheckBoxes(a)
        event.target.checked ? setCountryName(totalCountries.countryName) : setCountryName([])
        // onSelectChange([])
    }

    const renderCountryName = () => {
        if (countryName.length === totalCountries.countryName.length) return "All Countries"
        else if (countryName.length === 1) return countryName[0]
        else if (countryName.length > 1) return countryName.length + " Countries"
        else return "Select Country"
    }

    const handleCountryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;

        let tempCheckBox = [...allCheckBoxes];
        let tempCountryName = [...countryName];

        tempCheckBox[index] = checked

        if (checked && !tempCountryName.includes(name)) tempCountryName.push(name);
        else tempCountryName.splice(tempCountryName.indexOf(name), 1);

        setCountryName(tempCountryName)
        setAllCheckBoxes(tempCheckBox)

    }

    return (
        <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
            <div className={classes.root} {...props}>
                <div onClick={toggle}>
                    <div className={classes.button} >
                        <Text value={renderCountryName()} />
                        {filtered(allCheckBoxes) ? <Text value={"!"} style={{ fontSize: "20px", color: color.primary, paddingLeft: "5px" }} /> : null}
                        <ArrowDropDownIcon />
                    </div>
                </div>

                {
                    visible &&
                    <Paper className={classes.option}>
                        <Text value={"Countries"} />
                        <Divider />
                        <Text value={"Clear Filter"} className={classes.textButton} onClick={clearFilter} />
                        <div className={classes.center}>
                            <input
                                type="checkbox"
                                onChange={checkAll}
                                checked={checkCount(allCheckBoxes, totalCountries.countryName.length)}
                            />

                            <Typography>
                                Select All   ({totalCountries.count})
                            </Typography>
                        </div>
                        {totalCountries.countries.map((country, index) => (
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
                        <Divider />
                        <div className={classes.center} style={{ justifyContent: "space-between" }}>
                            <Text value={"Cancel"} className={classes.textButton} onClick={handleCancel} />
                            <Text value={"Save"} className={classes.textButton} onClick={() => handleSave()} />
                        </div>
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