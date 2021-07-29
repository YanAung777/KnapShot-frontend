import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popover, Divider, Button } from '@material-ui/core';

import SearchBar from 'material-ui-search-bar'

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
    main: {
        // position: 'absolute',
        // top: 30,
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
        // position: 'absolute',
        // top: 60,
        margin: 5,
        width: "31%",
        height: "86%",
        zIndex: 3,
        padding: 10,
        boxShadow: "5px 5px 5px 0px #ccc",
        border: "1px solid #aaa",
        // overflowY: 'scroll',
        // overflowX: 'scroll'
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
        // overflowY: 'scroll',
        // overflowX: 'scroll'
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
        // overflowY: 'scroll',
        // overflowX: 'scroll'
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
    }
}));

export default function CustomSelect(props) {
    const classes = useStyles();


    const [state, dispatch] = useAppValue();

    const { totalPersonnel, totalHQLocation, totalIndustries, totalCompanyStaff, selectedDataset, selectedFilename } = state

    const { page } = state.company

    const { options, icon} = props;
    const [visible, setVisible] = useState(false);

    const [role, setRole] = useState('');
    const [destination, setDestination] = useState('');
    const [oldCount, setOldCount] = useState();
    let [oldCompanyCount, setOldCompanyCount] = useState()


    const [industry, setIndustry] = useState([]);
    const [HQLocation, setHQLocation] = useState([]);
    const [empSize, setEmpSize] = useState([]);
    const [company, setCompany] = useState([]);

    const [industryCheckBox, setIndustryCheckBox] = useState([]);
    const [HQLocationCheckBox, setHQLocationCheckBox] = useState([]);
    const [empSizeCheckBox, setEmpSizeCheckBox] = useState([]);
    const [companyCheckBox, setCompanyCheckBox] = useState([]);

    const [counter, setCounter] = useState(0);


    const getCompany = async () => {
        setVisible(false)
        let checkIndustryCheckBox = checkCount(industryCheckBox, totalIndustries.count)
        let checkHQLocationCheckBox = checkCount(HQLocationCheckBox, totalHQLocation.count)
        let checkEmpSizeCheckBox = checkCount(empSizeCheckBox, totalPersonnel.count)
        let checkCompanyCheckBox = checkCount(companyCheckBox, 2)

        let filter_obj = {}
        if (!checkIndustryCheckBox) {
            let temp = [...industry]
            if (temp.indexOf('Not Available') > -1) {
                temp.splice(temp.indexOf('Not Available'), 1)
                temp.push('', null)
            }
            filter_obj.industry = temp
        }
        if (!checkHQLocationCheckBox) {
            let temp = [...HQLocation]
            if (temp.indexOf('Not Available') > -1) {
                temp.splice(temp.indexOf('Not Available'), 1)
                temp.push('', null)
            }
            filter_obj.main_hq_location = temp
        }
        if (!checkEmpSizeCheckBox) {
            let temp = [...empSize]
            if (temp.indexOf('Not Available') > -1) {
                temp.splice(temp.indexOf('Not Available'), 1)
                temp.push('', null)
            }
            filter_obj.emp_size = temp
        }
        if (!checkCompanyCheckBox) {
            let temp = [...company]
            if (temp.indexOf("Company with Staff") > -1) {
                temp.splice(temp.indexOf("Company with Staff"), 1)
                temp.push(totalCompanyStaff.personnel[0].company_name)
            }
            else if (temp.indexOf("Company without Staff") > -1) {
                temp.splice(temp.indexOf("Company without Staff"), 1)
                temp.push(totalCompanyStaff.personnel[1].company_name)
            }
            filter_obj.total_personnel = temp
        }

        dispatch({
            type: "setFrimographicFilter",
            filter: filter_obj
        })

        const response = await api().post(
            endpoints.getAllCompanies + "?page=" + page,
            {
                dataset: selectedDataset,
                file_name: selectedFilename,
                frimographicFilter: filter_obj
            }
        );

        if (response.status === 200) {
            setOldCompanyCount(response.data.count)
            dispatch({
                type: "resetCompanies",
                page: page,
                companies: response.data.companies,
                count: response.data.count,
                loading: false
            });
        }
    }

    useEffect(() => {
        getCompany()
    }, [oldCompanyCount])

    useEffect(() => {
        setCounter(0)
    }, [selectedFilename])
    
    useEffect(() => {
        if (counter < 4) {
            setHQLocation(totalHQLocation.HQLocationName)
            setHQLocationCheckBox(new Array(totalHQLocation.count).fill(true))
        }
        if (totalHQLocation.count > 0) setCounter(counter + 1)
    }, [totalHQLocation])

    useEffect(() => {
        if (counter < 4) {
            setIndustry(totalIndustries.industryName)
            setIndustryCheckBox(new Array(totalIndustries.count).fill(true))
        }
        if (totalIndustries.count > 0) setCounter(counter + 1)
    }, [totalIndustries])

    useEffect(() => {
        if (counter < 4) {
            setEmpSize(totalPersonnel.personnelName)
            setEmpSizeCheckBox(new Array(totalPersonnel.count).fill(true))
        }
        setOldCount(totalPersonnel.count)
        if (totalPersonnel.count > 0) setCounter(counter + 1)
    }, [totalPersonnel])

    useEffect(() => {
        if (counter < 4) {
            setCompany(totalCompanyStaff.personnelName)
            setCompanyCheckBox(new Array(totalCompanyStaff.personnelName.length).fill(true))
        }
        if (totalCompanyStaff.count > 0) setCounter(counter + 1)
    }, [totalCompanyStaff])

    // useEffect(() => {
    //     getCompany()
    // }, [page, selectedDataset, selectedFilename])


    useEffect(() => {
        if (!checkOldCount((oldCount, totalPersonnel.count))) setCounter(0)
    }, [totalPersonnel])

    const checkCount = (arr, length) => {
        let count = 0
        for (let i in arr) arr[i] && count++
        if (count === length) return true
        return false
    }

    const checkOldCount = (old, NEW) => old === NEW

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const doSth = () => {
        console.log("sth done")
    }

    const checkAllIndustry = (event) => {
        let a = industryCheckBox.map(() => event.target.checked)
        setIndustryCheckBox(a)
        event.target.checked ? setIndustry(totalIndustries.industryName) : setIndustry([])
    }

    const checkAllHQ = (event) => {
        let a = HQLocationCheckBox.map(() => event.target.checked)
        setHQLocationCheckBox(a)
        event.target.checked ? setHQLocation(totalHQLocation.HQLocationName) : setHQLocation([])
    }

    const checkAllCompany = (event) => {
        let a = HQLocationCheckBox.map(() => event.target.checked)
        setCompanyCheckBox(a)
        event.target.checked ? setCompany(totalCompanyStaff.personnelName) : setCompany([])
    }

    const checkAllEmpSize = (event) => { // pass true or false to check or uncheck all
        let a = HQLocationCheckBox.map(() => event.target.checked)
        setEmpSizeCheckBox(a)
        event.target.checked ? setEmpSize(totalPersonnel.personnelName) : setEmpSize([])
    }

    const handleHQCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = HQLocation;
        let tempCheckBox = HQLocationCheckBox

        if (checked) temp.push(name);
        else temp.splice(temp.indexOf(name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setHQLocation(temp)
        setHQLocationCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
    }

    const handleIndustryCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = industry;
        let tempCheckBox = industryCheckBox

        if (checked) temp.push(name);
        else temp.splice(temp.indexOf(name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setIndustryCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setIndustry(temp)
    }

    const handleCompanyCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = company;
        let tempCheckBox = companyCheckBox

        if (checked) temp.push(name);
        else temp.splice(temp.indexOf(name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setCompanyCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setCompany(temp)
    }

    const handleEmpSizeCheckbox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = empSize;
        let tempCheckBox = empSizeCheckBox

        if (checked) temp.push(name);
        else temp.splice(temp.indexOf(name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setEmpSizeCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setEmpSize(temp)
    }




    return (
        <div className={classes.root} {...props}>
            <div onClick={toggle}>
                <ButtonBase className={classes.button} >
                    {icon ? icon : null}
                    <div style={{ margin: "0 auto" }}>Frimographic</div>
                </ButtonBase>
            </div>

            <Popover
                onClose={handleClose}
                open={visible}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 160, left: 180 }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div style={{ position: "absolute", top: 5, right: 5, cursor: "pointer" }}>
                    <Button onClick={() => getCompany()} variant="outlined"><Typography>Save</Typography></Button>
                </div>
                <div className={classes.main}>
                    <Paper className={classes.industry}>
                        <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >
                            Industry
                        </Typography>
                        <Divider />
                        <Divider />
                        <div className={classes.scroll}>
                            <div className={classes.center}>
                                <input
                                    type="checkbox"
                                    onChange={checkAllIndustry}
                                    checked={checkCount(industryCheckBox, totalIndustries.count)}
                                />
                                <Typography>Select Multiple</Typography>
                                <Typography className={classes.right}>({totalIndustries.count})</Typography>
                            </div>
                            {totalIndustries.industries.map((industry, index) => (
                                <div className={classes.center}>
                                    <input
                                        type="checkbox"
                                        checked={industryCheckBox[index]}
                                        id={index}
                                        // defaultChecked={true}
                                        name={industry.industry}
                                        onChange={handleIndustryCheckbox}
                                    />
                                    <Typography key={index}
                                    // onClick={() => onClick(industry.industry)}
                                    >{industry.industry}</Typography>
                                    <Typography className={classes.right}>({industry.count})</Typography>
                                </div>
                            ))}
                        </div>
                    </Paper>
                    <div style={{
                        display: "flex", flexDirection: "column",
                        width: "31%", height: "95%",
                    }}>
                        <Paper className={classes.secondColumn}>
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >
                                Employee Size
                                </Typography>
                            <Divider />
                            <Divider />
                            <div className={classes.scroll}>
                                <div className={classes.center}>
                                    <input
                                        type="checkbox"
                                        onChange={checkAllEmpSize}
                                        checked={checkCount(empSizeCheckBox, totalPersonnel.count)}
                                    />
                                    <Typography>Select Multiple</Typography>
                                    <Typography className={classes.right}>({totalPersonnel.count})</Typography>
                                </div>
                                {totalPersonnel.personnel.map((person, index) => (
                                    <div className={classes.center}>
                                        <input
                                            type="checkbox"
                                            checked={empSizeCheckBox[index]}
                                            id={index}
                                            name={person.total_Personnel}
                                            onChange={handleEmpSizeCheckbox}
                                        />
                                        <Typography key={index}
                                        // onClick={() => onClick(location.dataset)}
                                        >{person.total_Personnel}</Typography>
                                        <Typography className={classes.right}>({person.count})</Typography>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                        <Paper className={classes.secondColumn}>
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >
                                HQ Location
                                </Typography>
                            <Divider />
                            <Divider />
                            <div className={classes.scroll}>
                                <div className={classes.center}>
                                    <input
                                        type="checkbox"
                                        onChange={checkAllHQ}
                                        checked={checkCount(HQLocationCheckBox, totalHQLocation.count)}
                                    />
                                    <Typography>Select Multiple</Typography>
                                    <Typography className={classes.right}>({totalHQLocation.count})</Typography>
                                </div>
                                {totalHQLocation.HQLocation.map((location, index) => (
                                    <div className={classes.center}>
                                        <input
                                            type="checkbox"
                                            checked={HQLocationCheckBox[index]}
                                            id={index}
                                            name={location.main_hq_location}
                                            onChange={handleHQCheckbox}
                                        />
                                        <Typography key={index}
                                        // onClick={() => onClick(location.dataset)}
                                        >{location.main_hq_location}</Typography>
                                        <Typography className={classes.right}>({location.count})</Typography>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                    </div>

                    <div style={{
                        display: "flex", flexDirection: "column",
                        width: "31%", height: "95%", marginLeft: 20
                    }}>
                        <Paper style={{
                            marginLeft: 10,
                            marginTop: 10,
                            marginBottom: 10,
                            padding: 10,
                            width: "100%",
                            height: "28%",
                            zIndex: 3,
                            boxShadow: "5px 5px 5px 0px #ccc",
                            border: "1px solid #aaa"
                        }}>
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >
                                Company
                                </Typography>
                            <Divider />
                            <Divider />
                            <div >
                                <div className={classes.center}>
                                    <input
                                        type="checkbox"
                                        onChange={checkAllCompany}
                                        checked={checkCount(companyCheckBox, 2)}
                                    />
                                    <Typography>Select Multiple</Typography>
                                    <Typography className={classes.right}>({totalCompanyStaff.count})</Typography>
                                </div>
                                {totalCompanyStaff.personnel.map((person, index) => (
                                    <div className={classes.center}>
                                        <input
                                            type="checkbox"
                                            checked={companyCheckBox[index]}
                                            id={index}
                                            name={person.label}
                                            onChange={handleCompanyCheckbox}
                                        />
                                        <Typography key={index}
                                        // onClick={() => onClick(location.dataset)}
                                        >{person.label}</Typography>
                                        <Typography className={classes.right}>({person.count})</Typography>
                                    </div>
                                ))}
                            </div>
                        </Paper>
                        <Paper className={classes.thirdColumn}>
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >
                                Role
                                </Typography>
                            <Divider />
                            <Divider />
                            <SearchBar
                                style={{ height: 30, margin: 5 }}
                                value={role}
                                onChange={(newValue) => setRole(newValue)}
                                onRequestSearch={() => doSth()}
                                onCancelSearch={() => setRole('')}
                            />
                            <div className={classes.center}>
                                <input
                                    type="checkbox"
                                    // onChange={checkAll}
                                    defaultChecked={true}
                                />
                                <Typography>Select Multiple</Typography>
                                <Typography className={classes.middle}>({options.count})</Typography>
                            </div>
                        </Paper>
                        <Paper className={classes.thirdColumn}>
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >
                                Destination
                                </Typography>
                            <Divider />
                            <Divider />
                            <div className={classes.center}>
                                <input
                                    type="checkbox"
                                    // onChange={checkAll}
                                    defaultChecked={true}
                                />
                                <Typography>Select Multiple</Typography>
                                <Typography className={classes.middle}>({options.count})</Typography>
                            </div>
                        </Paper>
                    </div>
                </div>
            </Popover>
        </div>
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