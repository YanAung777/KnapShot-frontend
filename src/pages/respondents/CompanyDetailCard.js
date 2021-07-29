import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Typography, Grid, IconButton, Box, Divider, ButtonBase, Fab, Tooltip } from '@material-ui/core';
import { Favorite, Add, LocationOn, Phone, Language, AcUnitOutlined, EmailOutlined, Facebook, Twitter, LinkedIn, Instagram } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';

//components
import CustomIcon from 'components/core/CustomIcon';
import CustomPopOver from 'components/core/CustomPopOver';
import Text from 'components/core/Text';
import OutlineBtn from 'components/core/OutlineBtn';

//constants
import { digitals } from 'constants/digitals';

//context
import { useAppValue } from 'context/app';


const useStyles = makeStyles(theme => ({
    main: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10,
        padding: 10,
        borderBottom: `1px solid ${grey[300]}`,
        minHeight: 90,
        minWidth: 390,
        cursor: 'pointer'
    },
    divider: {
        borderRight: `2px solid ${grey[300]}`
    },
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minHeight: 110
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
        height: 80,
        backgroundColor: grey[400],
        borderRadius: 10,
        position: 'relative'
    },
    profileIcon: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    popover: {
        padding: 5,
        maxWidth: 300
    },
    link: {
        textDecoration: 'none'
    }
}));

export default function CompanyDetailCard(props) {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const {
        id,
        company_name,
        industry,
        total_personnel,
        overall_knapshot_score,
        address,
        main_line_number,
        website,
        company_email_address,
        facebook,
        linkedIn,
        instagram,
        twitter
    } = props.company;

    let score = {};
    if (overall_knapshot_score < 2) score = { type: "Basic", color: digitals["Basic"] };
    else if (overall_knapshot_score >= 2 && overall_knapshot_score < 5) score = { type: "Intermediate", color: digitals["Intermediate"] };
    else if (overall_knapshot_score >= 5 && overall_knapshot_score < 8) score = { type: "High", color: digitals["High"] };
    else score = { type: "Advanced", color: digitals["Advanced"] };

    let space = " "

    const profile = (name) => {
        let namesArray = name.trim().split(" ");

        let nameString;

        if (namesArray.length > 1) nameString = namesArray[0][0] + namesArray[1][0];

        else nameString = namesArray[0][0];

        return nameString.toUpperCase();
    }

    const onCompanySelect = () => {
        dispatch({ type: "setActive", index: id });
    }

    return (
        <div className={classes.main}
            onClick={onCompanySelect}
            {...props}
        >
            <div className={classes.item}
                style={{ borderRight: `2px solid ${grey[300]}`, marginRight: 5, minWidth: '25%' }}>
                <div className={classes.profile}>
                    <div className={classes.profileIcon}>
                        <CustomIcon icon={<Favorite />} />
                    </div>
                    <Text value={profile(company_name)} style={{ fontSize: 18, fontWeight: '800' }} />
                </div>
                <div className={classes.row}>
                    <CustomIcon icon={<Add />} />
                    <Text value="Watch List" />
                </div>
            </div>
            <div className={classes.item} style={{ minWidth: '45%' }}>
                <a href={`/company/${company_name}`} target="_blank" className={classes.link}><Text value={company_name} /></a>
                {
                    industry &&
                    <Text value={industry} />
                }
                {
                    (total_personnel && total_personnel !== "-1") &&
                    <Text value={total_personnel} />
                }
                <div className={classes.row}>
                    {
                        address &&
                        <CustomIcon icon={<Tooltip title={address}><LocationOn /></Tooltip>} />
                    }
                    {
                        main_line_number &&
                        <a href={`tel:${main_line_number}`}>
                            <CustomIcon icon={<Tooltip title={main_line_number}><Phone /></Tooltip>} />
                        </a>
                    }
                    {
                        website &&
                        <a href={website} target="_blank">
                            <CustomIcon icon={<Tooltip title={website}><Language /></Tooltip>} />
                        </a>
                    }
                    {
                        company_email_address &&
                        <a href={`mailto:${company_email_address}`} target="_top">
                            <CustomIcon icon={<Tooltip title={company_email_address}><EmailOutlined /></Tooltip>} />
                        </a>
                    }
                    {
                        (facebook || twitter || linkedIn || instagram) &&
                        <CustomPopOver
                            label={<CustomIcon icon={<AcUnitOutlined />} />}
                            content={
                                <Paper className={classes.popover}>
                                    {
                                        facebook &&
                                        <a href={facebook} target="_blank">
                                            <CustomIcon icon={<Tooltip title={facebook}><Facebook /></Tooltip>} />
                                        </a>
                                    }
                                    {
                                        twitter &&
                                        <a href={twitter} target="_blank">
                                            <CustomIcon icon={<Tooltip title={twitter}><Twitter /></Tooltip>} />
                                        </a>
                                    }
                                    {
                                        linkedIn &&
                                        <a href={linkedIn} target="_blank">
                                            <CustomIcon icon={<Tooltip title={linkedIn}><LinkedIn /></Tooltip>} />
                                        </a>
                                    }
                                    {
                                        instagram &&
                                        <a href={instagram} target="_blank">
                                            <CustomIcon icon={<Tooltip title={instagram}><Instagram /></Tooltip>} />
                                        </a>
                                    }
                                </Paper>
                            }
                        />
                    }
                </div>
            </div>
            <div className={classes.item} style={{ justifyContent: 'flex-end', alignItems: 'flex-end', minWidth: '30%' }}>
                <Text value="Ads Expenditure" style={{ fontSize: 10, margin: "0 auto" }} />
                <OutlineBtn value="US 1 - 2k" style={{ margin: "0 auto" }} />
                <Text value="Digital Engagement" style={{ fontSize: 10, paddingTop: 10, margin: "0 auto" }} />
                <OutlineBtn
                    value={`/10 | ${score["type"]}`}
                    score={<span style={{ fontSize: 13 }}>{overall_knapshot_score}</span>}
                    style={{  backgroundColor: score["color"], color: '#FFF', fontSize: 10, fontWeight: '600', margin: "0 auto", border: "none" }} />
            </div>
        </div>
    );
}

CompanyDetailCard.defaultProps = {
    company: {},
    index: 0
}

CompanyDetailCard.propType = {
    company: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}