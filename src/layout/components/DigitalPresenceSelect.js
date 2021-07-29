import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Typography, Popover, Divider, Button } from '@material-ui/core';
import { Person, AcUnit, ViewArray, Timeline, Facebook, Twitter, LinkedIn, Instagram, LocationOn, Phone, Language, EmailOutlined } from '@material-ui/icons';


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
        width: window.innerWidth - (window.innerWidth) * 0.65,
        height: window.innerHeight - 200,
        zIndex: 2,
        padding: "0px 10px 10px 10px",
        display: "flex",
        flexDirection: "row",
        // alignItems: "center"
    },
    inner: {
        margin: "0px 5px 35px 5px",
        height: "95%",
        width: "100%",
        // zIndex: 3,
        padding: "0px 10px 0px 10px"
    },
    row: {
        display: "flex",
        flexDirection: 'row'
    },
    rowSpace: {
        display: "flex",
        flexDirection: 'row',
        margin: "15px 0px 0px 0px"
    },
    column: {
        display: "flex",
        flexDirection: 'column',
        flex: "1 1"
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
        alignItems: "center",
    },
    right: {
        marginLeft: "auto"
    },
    middle: {
        marginLeft: 3,
        marginRight: 3,
    },
    divider: {
        margin: "5px 0px 5px 0px"
    }
}));

export default function CustomSelect(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const { digitalPresence, selectedDataset, selectedFilename, frimographicFilter } = state

    const {results} = digitalPresence

    const { page } = state.company

    const { options, icon, onSelectChange, label } = props;
    const [visible, setVisible] = useState(false);

    const [websites, setWebsites] = useState(["Has", "Doesnt"]);
    const [email, setEmail] = useState(["Has", "Doesnt"]);
    const [phone, setPhone] = useState(["Has", "Doesnt"]);
    const [address, setAddress] = useState(["Has", "Doesnt"]);
    const [twitter, setTwitter] = useState(["Has", "Doesnt"]);
    const [facebook, setFacebook] = useState(["Has", "Doesnt"]);
    const [linkedIn, setLinkedIn] = useState(["Has", "Doesnt"]);
    const [instagram, setInstagram] = useState(["Has", "Doesnt"]);
    const [directory, setDirectory] = useState(["0 Presence", "1 - 2", "3 - 5", ">6"]);
    const [digital, setDigital] = useState(["Basic", "Intermediate", "High", "Advance"]);

    const [websitesCheckBox, setWebsitesCheckBox] = useState([true, true]);
    const [emailCheckBox, setEmailCheckBox] = useState([true, true]);
    const [phoneCheckBox, setPhoneCheckBox] = useState([true, true]);
    const [addressCheckBox, setAddressCheckBox] = useState([true, true]);
    const [twitterCheckBox, setTwitterCheckBox] = useState([true, true]);
    const [facebookCheckBox, setFacebookCheckBox] = useState([true, true]);
    const [linkedInCheckBox, setLinkedInCheckBox] = useState([true, true]);
    const [instagramCheckBox, setInstagramCheckBox] = useState([true, true]);
    const [directoryCheckBox, setDirectoryCheckBox] = useState([true, true, true, true]);
    const [digitalCheckBox, setDigitalCheckBox] = useState([true, true, true, true]);

    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const checkCount = (arr, length) => {
        let count = 0
        arr.map((v) => v && count++)
        return count === length
    }

    useEffect(() => {
        setWebsitesCheckBox([true, true])
        setEmailCheckBox([true, true])
        setPhoneCheckBox([true, true])
        setAddressCheckBox([true, true])
        setTwitterCheckBox([true, true])
        setFacebookCheckBox([true, true])
        setLinkedInCheckBox([true, true])
        setInstagramCheckBox([true, true])
        setDirectoryCheckBox([true, true, true, true])
        setDigitalCheckBox([true, true, true, true])
    }, [results])

    const getCompany = async () => {
        setVisible(false)
        // let checkIndustryCheckBox = checkCount(industryCheckBox, totalIndustries.count)
        // let checkHQLocationCheckBox = checkCount(HQLocationCheckBox, totalHQLocation.count)
        // let checkEmpSizeCheckBox = checkCount(empSizeCheckBox, totalPersonnel.count)
        // let checkCompanyCheckBox = checkCount(companyCheckBox, totalCompanyStaff.count)

        let filter_obj = {}
        if (!checkCount(websitesCheckBox, 2)) {
            let temp = [...websites]
            if (temp.indexOf('Doesnt') > -1) {
                temp.splice(temp.indexOf('Doesnt'), 1)
                temp.push(null)
            }
            filter_obj.websites = temp
        }
        if (!checkCount(emailCheckBox, 2)) {
            let temp = [...email]
            if (temp.indexOf('Doesnt') > -1) temp.push(null)
            filter_obj.email = temp
        }
        if (!checkCount(phoneCheckBox, 2)) {
            let temp = [...phone]
            if (temp.indexOf('Doesnt') > -1) temp.push(null)
            filter_obj.phone = temp
        }
        if (!checkCount(addressCheckBox, 2)) {
            let temp = [...address]
            if (temp.indexOf('Doesnt') > -1) temp.push(null)
            filter_obj.address = temp
        }
        if (!checkCount(twitterCheckBox, 2)) {
            let temp = [...twitter]
            if (temp.indexOf('Doesnt') > -1) temp.push(null)
            filter_obj.twitter = temp
        }
        if (!checkCount(facebookCheckBox, 2)) {
            let temp = [...facebook]
            if (temp.indexOf('Doesnt') > -1) temp.push(null)
            filter_obj.facebook = temp
        }
        if (!checkCount(instagramCheckBox, 2)) {
            let temp = [...instagram]
            if (temp.indexOf('Doesnt') > -1) temp.push(null)
            filter_obj.instagram = temp
        }
        if (!checkCount(linkedInCheckBox, 2)) {
            let temp = [...linkedIn]
            if (temp.indexOf('Doesnt') > -1) temp.push(null)
            filter_obj.linkedIn = temp
        }
        if (!checkCount(directoryCheckBox, 4)) {
            let temp = [...directory]
            // if (temp.indexOf('0 Presence') > -1) temp.push("-1")
            // if (temp.indexOf('1 - 2') > -1) temp.push(null)
            // if (temp.indexOf('3 - 5') > -1) temp.push(null)
            // if (temp.indexOf('>6') > -1) temp.push(null)
            filter_obj.directory = temp
        }
        if (!checkCount(digitalCheckBox, 4)) {
            let temp = [...digital]
            filter_obj.digital = temp
        }
        dispatch({
            type: "setDigitalPresenceFilter",
            filter: filter_obj
        })

        let response
        // if (frimographicFilter !== {}) response = await api().post(
        //     endpoints.getAllCompanies + "?page=" + page,
        //     {
        //         dataset: selectedDataset,
        //         file_name: selectedFilename,
        //         digitalPresenceFilter: filter_obj,
        //         frimographicFilter
        //     }
        // );

        // else response = await api().post(
        //     endpoints.getAllCompanies + "?page=" + page,
        //     {
        //         dataset: selectedDataset,
        //         file_name: selectedFilename,
        //         digitalPresenceFilter: filter_obj
        //     }
        // );
        response = await api().post(
            endpoints.getAllCompanies + "?page=" + page,
            {
                dataset: selectedDataset,
                file_name: selectedFilename,
                digitalPresenceFilter: filter_obj,
                frimographicFilter
            }
        );

        if (response.status === 200) {
            dispatch({
                type: "resetCompanies",
                page: page,
                companies: response.data.companies,
                count: response.data.count,
                loading: false
            });
        }
    }

    const clearFilter = () => {
        setWebsitesCheckBox([true, true])
        setEmailCheckBox([true, true])
        setPhoneCheckBox([true, true])
        setAddressCheckBox([true, true])
        setTwitterCheckBox([true, true])
        setFacebookCheckBox([true, true])
        setLinkedInCheckBox([true, true])
        setInstagramCheckBox([true, true])
        setDirectoryCheckBox([true, true, true, true])
        setDigitalCheckBox([true, true, true, true])
    }

    // useEffect(() => {
    //     getCompany()
    // }, [page, selectedDataset, selectedFilename])

    function getIndex(arr, name) {
        if (arr[0] === name) return 0
        else return 1
    }

    const handleWebsitesCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = websites;
        let tempCheckBox = websitesCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setWebsitesCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setWebsites(temp)
    }

    const handleEmailCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = email;
        let tempCheckBox = emailCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setEmailCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setEmail(temp)
    }

    const handlePhoneCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = phone;
        let tempCheckBox = phoneCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setPhoneCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setPhone(temp)
    }

    const handleAddressCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = address;
        let tempCheckBox = addressCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setAddressCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setAddress(temp)
    }
    const handleTwitterCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = twitter;
        let tempCheckBox = twitterCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]

        setTwitterCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setTwitter(temp)
    }
    const handleFacebookCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = facebook;
        let tempCheckBox = facebookCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setFacebookCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setFacebook(temp)
    }
    const handleLinkedInCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = linkedIn;
        let tempCheckBox = linkedInCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setLinkedInCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setLinkedIn(temp)
    }
    const handleInstagramCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = instagram;
        let tempCheckBox = instagramCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]

        setInstagramCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setInstagram(temp)
    }
    const handleDirectoryPresenceCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = directory;
        let tempCheckBox = directoryCheckBox
      


        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]
        setDirectoryCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setDirectory(temp)
    }

    const handleDigitalEngagementCheckBox = (e) => {
        const name = e.target.name;
        const checked = e.target.checked;
        const index = e.target.id;
        let temp = digital;
        let tempCheckBox = digitalCheckBox

        if (checked) temp.push(name);
        else temp.splice(getIndex(temp, name), 1);

        tempCheckBox[index] = !tempCheckBox[index]

        setDigitalCheckBox(JSON.parse(JSON.stringify(tempCheckBox)))
        setDigital(temp)
    }

    const functionArr = [handleWebsitesCheckBox,
        handleEmailCheckBox, handlePhoneCheckBox,
        handleAddressCheckBox, handleTwitterCheckBox,
        handleFacebookCheckBox, handleLinkedInCheckBox, handleInstagramCheckBox]

    let checkBoxArr = [websitesCheckBox, emailCheckBox, phoneCheckBox, addressCheckBox, twitterCheckBox, facebookCheckBox, linkedInCheckBox, instagramCheckBox]


    const renderIcon = (key) => {
        if (key === "facebook") return <Facebook style={{ fontSize: 20, color: "gray" }} />
        else if (key === "linkedIn") return <LinkedIn style={{ fontSize: 20, color: "gray" }} />
        else if (key === "instagram") return <Instagram style={{ fontSize: 20, color: "gray" }} />
        else return <Twitter style={{ fontSize: 20, color: "gray" }} />
    }

    const renderContactIcon = (key) => {
        if (key === "websites") return <Language style={{ fontSize: 20, color: "gray" }} />
        else if (key === "email") return <EmailOutlined style={{ fontSize: 20, color: "gray" }} />
        else if (key === "phone") return <Phone style={{ fontSize: 20, color: "gray" }} />
        else return <LocationOn style={{ fontSize: 20, color: "gray" }} />
    }

    const renderDigitalEngagementLabel = (key) => {
        if (key === "KS Score 1-3") return "Basic"
        else if (key === "KS Score 3-5") return "Intermediate"
        else if (key === "KS Score 5-7") return "High"
        else return "Advance"
    }

    const renderDirectoryPresence = () => {
        let temp = digitalPresence.results.directoryPresence
        return temp && Object.keys(temp[0]).map((key, i) =>
            <div className={classes.row} style={{ flex: "1 1 60px" }}>
                <input
                    type="checkbox"
                    checked={directoryCheckBox[i]}
                    id={i}
                    name={key}
                    onChange={handleDirectoryPresenceCheckBox}
                />
                <div className={classes.column}>
                    <Typography key={i}>{key}</Typography>
                    {/* {console.log("Object", Object.values(temp[0]))} */}
                    <Typography>({Object.values(temp[0])[i]})</Typography>
                </div>
            </div>
        )
    }

    const renderDigitalEngagement = () => {
        let temp = digitalPresence.results.digitalEngagement

        return temp && Object.keys(temp[0]).map((key, i) =>
            <div className={classes.column}>
                <div className={classes.column}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Typography key={i}>{renderDigitalEngagementLabel(key)}</Typography>
                    </div>
                    <div className={classes.row}>
                        <input
                            type="checkbox"
                            checked={digitalCheckBox[i]}
                            id={i}
                            name={renderDigitalEngagementLabel(key)}
                            onChange={handleDigitalEngagementCheckBox}
                        />
                        <div className={classes.column}>
                            <Typography key={i}>{key}</Typography>
                            <Typography>({Object.values(temp[0])[i]})</Typography>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.root} {...props}>
            <div onClick={toggle}>
                <ButtonBase className={classes.button} >
                    {icon ? icon : null}
                    <div style={{ margin: "0 auto" }}>Digital Presence</div>
                </ButtonBase>
            </div>

            {/* <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}> */}
            <Popover
                onClose={handleClose}
                open={visible}
                anchorReference="anchorPosition"
                anchorPosition={{ top: 240, left: 320 }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >

                <div className={classes.main}>
                    <Paper className={classes.inner} style={{ boxShadow: "none" }}>
                        <div className={classes.rowSpace}>
                            <Person style={{ fontSize: 20, color: "gray" }} />
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >Contactable Asset</Typography>
                        </div>
                        <div className={classes.divider}>
                            <Divider />
                            <Divider />
                        </div>
                        <div className={classes.row}>
                            {Object.keys(digitalPresence.results).map((key, index) => {
                                let temp = Object.values(digitalPresence.results)[index]

                                if (index < 4) return <div className={classes.column}>
                                    <div className={classes.row}>
                                        {renderContactIcon(key)}
                                        <Typography key={index}>{key}</Typography>
                                    </div>
                                    {
                                        temp.map((val, i) =>
                                            <div className={classes.column}>
                                                <div className={classes.row}>
                                                    <input
                                                        type="checkbox"
                                                        checked={(checkBoxArr[index])[i]}
                                                        id={i}
                                                        name={val.label}
                                                        onChange={functionArr[index]}
                                                    />
                                                    <div className={classes.column}>
                                                        <Typography key={i}>{val.label}</Typography>
                                                        <Typography>({val.count})</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            )}
                        </div>
                        <div className={classes.rowSpace}>
                            <AcUnit style={{ fontSize: 20, color: "gray" }} />
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >Social Accounts</Typography>
                        </div>
                        <div className={classes.divider}><Divider /></div>
                        <div className={classes.row}>
                            {Object.keys(digitalPresence.results).map((key, index) => {
                                let temp = Object.values(digitalPresence.results)[index]

                                if (index >= 4 && index < 8) return <div className={classes.column}>
                                    <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>{renderIcon(key)}</div>
                                    {
                                        temp.map((val, i) =>
                                            <div className={classes.column}>
                                                <div className={classes.row}>
                                                    <input
                                                        type="checkbox"
                                                        checked={(checkBoxArr[index])[i]}
                                                        id={i}
                                                        name={val.label}
                                                        onChange={functionArr[index]}
                                                    />
                                                    <div className={classes.column}>
                                                        <Typography key={i}>{val.label}</Typography>
                                                        <Typography>({val.count})</Typography>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            }
                            )}
                        </div>
                        <div className={classes.rowSpace}>
                            <ViewArray style={{ fontSize: 20, color: "gray" }} />
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >Directory Presence</Typography>
                        </div>
                        <div className={classes.divider}>
                            <Divider />
                        </div>
                        <div className={classes.row}>
                            {renderDirectoryPresence()}
                        </div>
                        <div className={classes.rowSpace}>
                            <Timeline style={{ fontSize: 20, color: "gray" }} />
                            <Typography style={{ paddingLeft: "5px" }} variant="subtitle2" >Digital Engagement</Typography>
                        </div>
                        <div className={classes.divider}>
                            <Divider />
                            <Divider />
                        </div>
                        <div className={classes.row}>
                            {renderDigitalEngagement()}
                        </div>
                        {/* <div className={classes.divider}><Divider /></div> */}
                        <div style={{ position: "absolute", bottom: 5, right: 15, cursor: "pointer" }}>
                            <Button onClick={() => getCompany()} variant="contained" style={{ backgroundColor: "black" }}>
                                <Typography style={{ color: "#fff" }}>Save</Typography>
                            </Button>
                        </div>
                        <div style={{ position: "absolute", bottom: 5, left: 15, cursor: "pointer" }}>
                            <Button onClick={() => clearFilter()} variant="contained">
                                <Typography>Clear</Typography>
                            </Button>
                        </div>
                    </Paper>
                </div>
            </Popover>
            {/* </OutsideClickHandler> */}
        </div >
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