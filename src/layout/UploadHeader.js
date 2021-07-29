import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Paper, InputBase, Divider, IconButton, Typography, Button, ButtonBase, ButtonGroup } from '@material-ui/core';
import { Visibility, FolderOpen, Public, Equalizer, BubbleChart, Print, Share, GetApp, ArrowRight, ArrowLeft } from '@material-ui/icons';

//components
import Menu from 'components/core/Menu';
import CustomIcon from 'components/core/CustomIcon';
import SearchBox from './components/SearchBox';
import CountrySelect from './components/CountrySelect';
import CustomSelectWithCheckBox from 'components/core/CustomSelectWithCheckBox';
import CustomSelect from 'components/core/CustomSelect';
import FrimographicSelect from './components/FrimographicSelect';
import TechnologySelect from './components/TechnologySelect';
import DigitalPresenceSelect from './components/DigitalPresenceSelect';
import GroupButton from './components/GroupButton';

//util
import { checkAuth } from 'util/check-auth';

//route
import { history } from 'router/history';
import { routes } from 'router/routes';

//context
import { useAppValue } from 'context/app';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        position: 'relative',
    },
    appBar: {
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderBottom: '2px solid lightgray',
        padding: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    appBarItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingLeft: "10%"
    },
    logo: {
        width: 50,
        height: 50,
        margin: '0 20px',
        cursor: "pointer"
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        position: 'relative'
    },
    divider: {
        height: 28,
        margin: 4,
    },
    btn: {
        padding: 5,
        marginRight: 5
    },
    searchIcon: {
        backgroundColor: "#555",
        width: "30px",
        height: "30px",
        borderRadius: 5,
        color: "white"
    },
    filterWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 5px',
    },
    filterWrapper2: {
        display: 'flex',
        alignItems: 'center',
        padding: '10px 5px',
    },
    filterItem: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    paper: {
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    btnGroup: {
        backgroundColor: 'transparent',
        border: 'none'
    }
}));

export default function AnalyzeHeader() {
    const classes = useStyles();

    const [state, dispatch] = useAppValue();

    const [filter, setFilter] = useState('');

    const { filenames,  totalCountries } = state;

    useEffect(() => {
        function changePage() {
            if (filter === "Overview") {
                history.push("/overview")
                dispatch({
                    type: "setOverviewTab",
                    index: 0
                })
            }
            filter === "Company List" && history.push("/")
            filter === "Technology" && history.push("/technology")
            filter === "Digital Engagement" && history.push("/digitalEngagement")
        }
        changePage()
    }, [filter])

    if (!checkAuth()) {
        history.push("/login");
    }

    const onFileChange = (filename) => {
        dispatch({ type: "setSelectedFile", filename });
    }

    const onDatasetChange = (dataset) => {
        dispatch({ type: "setSelectedDataset", dataset });
    }

    const lists = ["Company List", "Overview", "Digital Engagement", "Technology"]
    const fileupload =["Load new DB File", "Load Survey response File"]

    return (
        <div className={classes.root}>
            <div className={classes.root}>
                <div className={classes.filterWrapper}>
                    <div className={classes.filterItem}>
                        <CustomSelect
                            label={"Excel"}
                            icon={<CustomIcon style={{ padding: 0 }} icon={<FolderOpen />} />}
                            options={filenames}
                            option2={fileupload}
                            onSelectChange={onFileChange}
                        />
                        <CustomSelect
                            onSelectChange={setFilter}
                            options={lists}
                            icon={<CustomIcon style={{ padding: 0 }} icon={<Visibility />} />}
                        />
                    </div>

                    {/* {
                        filter === "Overview" &&
                        <GroupButton>
                            <CustomIcon icon={<Public />} />
                            <CustomIcon icon={<Equalizer />} />
                            <CustomIcon icon={<BubbleChart />} />
                        </GroupButton>
                    } */}

                    <ButtonGroup
                        variant="contained"
                        size="small"
                        aria-label="small contained button group"
                        style={{ boxShadow: 'none' }}>
                        <Button style={{ border: 'none', background: "transparent" }}> <CustomIcon icon={<Print />} /></Button>
                        <Button style={{ border: 'none', background: "transparent" }}><CustomIcon icon={<Share />} /></Button>
                        <Button style={{ border: 'none', background: "transparent" }}><CustomIcon icon={<GetApp />} /></Button>
                    </ButtonGroup>

                </div>
                <Divider />
                <div className={classes.filterWrapper2}>
                    <CustomSelectWithCheckBox
                        options={totalCountries}
                        onSelectChange={onDatasetChange}
                    />
                    <FrimographicSelect
                        options={["Firmographics"]}
                    />
                    <DigitalPresenceSelect
                        options={["Digital Presence"]}
                    />
                    <TechnologySelect
                        options={"Advertising"}
                        label={"Advertising"}
                    />
                    <TechnologySelect
                        options={"Analytics"}
                        label={"Analytics and Tracking"}
                    />
                    <TechnologySelect
                        options={"Hosting"}
                        label={"Hosting"}
                    />
                    <TechnologySelect
                        options={"Productivity"}
                        label={"Productivity"}
                    />
                    <TechnologySelect
                        options={"E-Commerce"}
                        label={"Ecommerce"}
                    />
                    <TechnologySelect
                        options={"Widgets"}
                        label={"Widgets"}
                    />
                    <CustomSelect
                        options={["More Filters"]}
                    />
                </div>
                <Divider />
            </div>
        </div>
    );
}