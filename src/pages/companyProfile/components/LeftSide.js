import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { makeStyles, Divider, Tooltip, Typography } from '@material-ui/core';
import { Favorite, Add, LocationOn, Phone, Language, AcUnitOutlined, EmailOutlined, Facebook, Twitter, LinkedIn, Instagram, YouTube } from '@material-ui/icons';

//components
import Icon from 'components/core/CustomIcon';
import Text from 'components/core/Text';
import ProgressBar from 'components/core/ProgressBar';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        // padding: '0 15px',
        height: window.innerHeight,
        overflowY: 'scroll'
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    logo: {
        width: 70,
        height: 70,
        backgroundColor: '#3c8dbc',
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 25,
        fontWeight: 600
    },
    watchlist: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 140
    },
    watchlistIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    divider: {
        width: '100%',
        margin: '5px 0'
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: '9px 0'
    },
    wrapper: {
        padding: "3px 10px"
    },
    link: {
        textDecoration: 'none'
    },
    directory: {
        width: '20%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    directoryText: {
        wordBreak: 'break-word', fontSize: 10, letterSpacing: 0, height: 30
    },
    directoryCount: {
        fontSize: 14,
        fontWeight: "bold",
        margin: '10px 0'
    },
    freeSpace: {
        paddingTop: 70
    },
    found: {
        fontSize: 12
    },
    progress: {
        margin: '0 15px'
    },
    "parent": { "display": "flex", "flexWrap": "wrap" },
}));

const LeftSide = (props) => {

    const classes = useStyles();

    const {
        company_name,
        address,
        main_line_number,
        website,
        company_email_address,
        facebook,
        linkedIn,
        instagram,
        twitter,
        youtube,
        no_of_directory_presence,
        directories
    } = props.company;

    let bCount = 0; let mCount = 0; let jCount = 0; let lCount = 0; let bgCount = 0;

    if (directories && directories.length > 0) directories.forEach(item => {
        if (item.directory === "businessDirectory") bCount += 1;
        if (item.directory === "marketplace") mCount += 1;
        if (item.directory === "jobDirectory") jCount += 1;
        if (item.directory === "locationDirectory") lCount += 1;
        if (item.directory === "bloggers") bgCount += 1;
    });

    const directoryLists = [
        { label: "Business Directory", count: bCount, icon: <i style={{ color: 'gray' }} className="fas fa-list-alt" /> },
        { label: "Marketplace Directory", count: mCount, icon: <i style={{ color: 'gray' }} className="fas fa-bed" /> },
        { label: "Jobs Directory", count: jCount, icon: <i style={{ color: 'gray' }} className="fas fa-briefcase" /> },
        { label: "Location Directory", count: lCount, icon: <i style={{ color: 'gray' }} className="fas fa-map" /> },
        { label: "Blogger", count: bgCount, icon: <i style={{ color: 'gray' }} className="fas fa-flag" /> }
    ];

    let totalDigitalPresence = 0;

    if (website && website !== "cannot verify") {
        totalDigitalPresence += 1.2;
    }
    if (linkedIn && linkedIn !== "cannot verify") {
        totalDigitalPresence += 0.2;
    }
    if (facebook && facebook !== "cannot verify") {
        totalDigitalPresence += 0.2;
    }
    if (twitter && twitter !== "cannot verify") {
        totalDigitalPresence += 0.1;
    }
    if (instagram && instagram !== "cannot verify") {
        totalDigitalPresence += 0.1;
    }
    // if (youtube && youtube !== "cannot verify"){
    //     totalDigitalPresence += 0.1;
    // }
    if (company_email_address && company_email_address !== "cannot verify") {
        let mail = company_email_address.split('@')[1];
        if (mail === 'gmail.com' || mail === 'yahoo.com') {
            totalDigitalPresence += 0.2;
        } else {
            totalDigitalPresence += 0.4;
        }
    }
    if (no_of_directory_presence) {
        if (no_of_directory_presence <= 2) totalDigitalPresence += 0.2;
        if (no_of_directory_presence >= 3) totalDigitalPresence += 0.4;
    }
    if (address && address !== "cannot verify") {
        totalDigitalPresence += 0.2;
    }
    if (main_line_number && main_line_number !== "cannot verify" && main_line_number !== "+normal") {
        totalDigitalPresence += 0.2;
    }

    const createLogo = (name) => {
        if (name) {
            let namesArray = name.trim().split(" ");

            let nameString;

            if (namesArray.length > 1) nameString = namesArray[0][0] + namesArray[1][0];

            else nameString = namesArray[0][0];

            return nameString.toUpperCase();
        }
    }

    return (
        <div className={classes.root}>
            <div className={classes.logoWrapper}>
                <div className={classes.logo}>
                    <Text value={createLogo(company_name)} style={{ fontSize: 25, fontWeight: '600', color: '#FFF' }} />
                </div>
                <Text value={company_name} style={{ fontSize: 15, fontWeight: '600', margin: '5px 0' }} />
                <div className={classes.watchlist}>
                    <div className={classes.watchlistIcon}>
                        <Icon icon={<Add />} />
                        <Text value="Watch List" />
                    </div>
                    <Icon icon={<Favorite />} />
                </div>
            </div>
            <Divider className={classes.divider} />
            <div className={classes.wrapper}>
                {
                    website &&
                    <div className={classes.row}>
                        <Icon icon={<Language />} />
                        <a href={website} target="_blank" className={classes.link}>
                            <Text value={website} style={{ wordBreak: 'break-all', marginLeft: 5 }} />
                        </a>
                    </div>
                }
                {
                    main_line_number &&
                    <div className={classes.row}>
                        <Icon icon={<Phone />} />
                        <a href={`tel:${main_line_number}`} target="_blank" className={classes.link}>
                            <Text value={main_line_number} style={{ wordBreak: 'break-all', marginLeft: 5 }} />
                        </a>
                    </div>
                }
                {
                    company_email_address &&
                    <div className={classes.row}>
                        <Icon icon={<EmailOutlined />} />
                        <a href={`mailto:${company_email_address}`} target="_top" className={classes.link}>
                            <Text value={company_email_address} style={{ wordBreak: 'break-all', marginLeft: 5 }} />
                        </a>
                    </div>
                }
                {
                    address &&
                    <div className={classes.row}>
                        <Icon icon={<LocationOn />} />
                        <Text value={address} style={{ wordBreak: 'break-all', marginLeft: 5 }} />
                    </div>
                }
            </div>
            <div className={classes.parent}>
                {
                    facebook && facebook !== '-' &&
                    <div style={{ width: "18%" }}>
                        <a href={facebook} target="_blank">
                            <Icon icon={<Tooltip title={facebook}><Facebook style={{ fontSize: 25, margin: "5px 10px" }} /></Tooltip>} />
                        </a>
                    </div>
                }
                {
                    instagram && instagram !== '-' &&
                    <div style={{ width: "18%" }}>
                        <a href={instagram} target="_blank">
                            <Icon icon={<Tooltip title={instagram}><Instagram style={{ fontSize: 25, margin: "5px 10px" }} /></Tooltip>} />
                        </a>
                    </div>
                }
                {
                    linkedIn && linkedIn !== '-' &&
                    <div style={{ width: "18%" }}>
                        <a href={linkedIn} target="_blank">
                            <Icon icon={<Tooltip title={linkedIn}><LinkedIn style={{ fontSize: 25, margin: "5px 10px" }} /></Tooltip>} />
                        </a>
                    </div>
                }
                {
                    twitter && twitter !== '-' &&
                    <div style={{ width: "18%" }}>
                        <a href={twitter} target="_blank">
                            <Icon icon={<Tooltip title={twitter}><Twitter style={{ fontSize: 25, margin: "5px 10px" }} /></Tooltip>} />
                        </a>
                    </div>
                }
                {
                    youtube && youtube !== '-' &&
                    <div style={{ width: "18%" }}>
                        <a href={youtube} target="_blank">
                            <Icon icon={<Tooltip title={youtube}><YouTube style={{ fontSize: 25, margin: "5px 10px" }} /></Tooltip>} />
                        </a>
                    </div>
                }
            </div>

            <div style={{ width: '100%', position: 'relative', display: 'flex' }}>
                {
                    directoryLists.map((directory, index) => (
                        <div key={index} className={classes.directory}>
                            <Typography className={classes.directoryText}>{directory.label}</Typography>
                            {directory.icon}
                            {
                                directory.count > 0 ?
                                    <Fragment>
                                        <Typography className={classes.directoryCount}>{directory.count}</Typography>
                                        <Typography className={classes.found}>found</Typography>
                                    </Fragment>
                                    :
                                    <div className={classes.freeSpace} />
                            }
                        </div>
                    ))
                }
            </div>

            <div className={classes.progress}>
                <Text value="Digital Presence" />
                <ProgressBar
                    value={(totalDigitalPresence / 3) * 100}
                    tooltip={parseFloat(totalDigitalPresence.toFixed(1))} />
            </div>
        </div>
    )
}

LeftSide.defaultProps = {
    company: {}
}

LeftSide.propTypes = {
    company: PropTypes.object
}

export default LeftSide;
