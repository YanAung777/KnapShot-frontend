import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, ButtonBase, Popover, Grid, Typography, withStyles } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { Check } from '@material-ui/icons';
import OutsideClickHandler from 'react-outside-click-handler';
import Radio from '@material-ui/core/Radio';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import StorageRoundedIcon from '@material-ui/icons/StorageRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import BugReportRoundedIcon from '@material-ui/icons/BugReportRounded';

//constants
import endpoints from 'constants/endpoints';

//route
import { history } from 'router/history';

// api
import api from 'api'

//context
import { useAppValue } from 'context/app';

//components
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'relative',
        cursor: "pointer"
        // marginLeft: 10
    },
    button: {
        zIndex: -1,
        border: '1.2px solid lightgray',
        // borderRadius: 20,
        padding: '3px 10px',
        height: 30,
        // minWidth: 320, //120
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    option: {
        position: 'absolute',
        top: 30,
        width: '110%',
        zIndex: 2,
        padding: 10,
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
    paper: {
        position: 'absolute',
        width: '570px',
        padding: '0px 35px 0px',
        backgroundColor: theme.palette.background.paper,
        // border: '2px solid #000',
        // boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 0),
    },
    buttonBase: {
        height: 20,
        minWidth: 100,
        display: 'flex',
        fontSize: '13px',
        cursor: 'pointer',
        borderRadius: 20,
        backgroundColor: '#c7cfdc'
    },
    gridItem: {
        height: '50px',
        display: 'flex',
        alignItems: 'flex-start',
        paddingLeft: '15px',
        flexDirection: 'column'
    },
    labelGridItem: {
        height: '50px',
        textAlign: 'right',
        paddingRight: '15px',
    },
    textbox: {
        '& .MuiOutlinedInput-input': {
            padding: '2px 10px',
            fontSize: '12px',
            height: '20px'
        },
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 250,
        },
    },
    formControl: {
        '& .MuiInputBase-formControl': {
            width: '250px',
            height: '25px',
            fontSize: '12px'
        },
        margin: theme.spacing(1),
        minWidth: 120,
        fontSize: '12px'
    },
}));

export default function CustomSelect(props) {
    const classes = useStyles();

    const { db, survey, qc, bradius, dropdown, options, option2, icon, onSelectChange, label } = props;

    const [visible, setVisible] = useState(false);

    const [value, setValue] = useState([options[0] || label]);

    const [loading, setLoading] = useState(false)

    const [uploadedFile, setUploadedFile] = useState()

    const [state, dispatch] = useAppValue()

    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    const toggle = () => {
        setVisible(!visible);
    }


    const onClick = (value) => {
        if (onSelectChange) onSelectChange(value)
        setValue(value);
        setVisible(false);
        history.push("/")
    }

    const excelOnClick = (value) => {
        dispatch({ type: "setExcelName", excelname: value });
        history.push("/respondents")
        setValue(value);
        setVisible(false);
    }


    const inputref = useRef(null)

    const onupload = (value) => {
        if (value === 'survey') inputref.current.click()
    }

    // useEffect(() => {
    //     if (history.location.pathname === "/") setValue(options[0])
    // }, [])


    const onFileUpload = async (event) => {
        let fileName = event.target.files[0].name
        setLoading(true)
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', event.target.files[0].name)
        setUploadedFile(event.target.files[0].name)
        const response = await api().post(endpoints.fileupload, data);
        if (response.status === 200) {
            let testing = response.data.results
            let websiteArr = []
            for (let j = 3; j < testing.length; j++) {

                let a = '', b = ''
                for (let [key, value] of Object.entries(testing[j])) {
                    if (a === '' && key === 'S1') a = value
                    if (b === '' && key === 'Questions Numbering') b = value
                }
                websiteArr.push({ [b]: a })
            }

            const res = await api().post(endpoints.getCompanySurveyId, { websiteArr, fileName })
            if (res.status === 200) {

                dispatch({
                    type: "setExcelName",
                    excelname: fileName.replace('.csv', '')
                })
                if (value === fileName.replace('.csv', '')) {
                    setValue(value[1])
                    excelOnClick(value[1])
                    setValue(value)
                    excelOnClick(value)
                } else
                    setValue(fileName.replace('.csv', ''))

                setLoading(false)
                history.push("/respondents")
            }

        }
        setVisible(false)
    }

    // console.log("props.minWidth",props.minWidth)

    return (
        <>
            <OutsideClickHandler onOutsideClick={() => { setVisible(false) }}>
                <div className={classes.root} {...props}>
                    <div onClick={toggle}>
                        <ButtonBase className={classes.button} style={{
                            border: 'none', minWidth: 230,
                            // display: "flex", justifyContent: "space-around"
                        }}>
                            <b>{icon ? icon : null}</b>&nbsp;
                        {/* <div style={{ margin: "0 auto" }}>{value}</div> */}
                            {/* <div>{history.location.pathname === "/" ? options[0] : value}</div> */}
                            <div>{value}</div>
                            <div style={{ margin: "0 auto" }}>{dropdown ? dropdown : null}</div>
                        </ButtonBase>
                    </div>
                    {
                        visible &&
                        <Paper className={classes.option} elevation={3}>
                            {
                                db &&
                                <div>
                                    <div style={{ display: 'flex' }}>
                                        <StorageRoundedIcon />
                                        <Typography style={{ marginLeft: '10px' }} >
                                            {db}
                                        </Typography>

                                    </div>
                                    <hr />
                                </div>
                            }
                            {
                                options.map((option, index) => (
                                    <Typography
                                        key={index}
                                        style={{ marginLeft: db ? '25px' : '5px' }}
                                        className={classes.text}
                                        onClick={() => onClick(option)}>
                                        {option}
                                        {option === value && <Check className={classes.icon} />}
                                    </Typography>
                                ))
                            }
                            {
                                option2 &&
                                <>
                                    {/* {option2.length > 0 && <hr />} */}
                                    {
                                        option2.map((option, index) => (
                                            <div key={index}>
                                                <div style={{ display: 'flex' }}>
                                                    <DescriptionRoundedIcon />
                                                    <Typography style={{ marginLeft: '10px' }}>
                                                        {survey}
                                                    </Typography>
                                                </div>
                                                <hr />
                                                <Typography
                                                    key={index}
                                                    className={classes.text}
                                                    style={{ marginLeft: '25px' }}
                                                    onClick={() => excelOnClick(option)}>
                                                    {option}
                                                    {option === value && <Check className={classes.icon} />}
                                                </Typography>
                                            </div>
                                        ))
                                    }
                                    {/* <hr />
                                <input id="myInput" type="file" ref={inputref} style={{ display: 'none' }} onChange={onFileUpload} />
                                <Typography
                                    onClick={handleOpen}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Load new DB File
                                </Typography>
                                <LoadNewDB open={open} setOpen={setOpen} setVisible={setVisible} loading={loading} setLoading={setLoading} />
                                <Typography
                                    onClick={() => onupload('survey')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    Load Survey response File (.csv) {loading && <i style={{ float: 'right' }} className="fas fa-spinner fa-spin"></i>}
                                </Typography> */}
                                </>
                            }
                            {
                                qc &&
                                <>
                                    <div style={{ display: 'flex' }}>
                                        <BugReportRoundedIcon />
                                        <Typography style={{ marginLeft: '10px' }}>
                                            {qc}
                                        </Typography>
                                    </div>
                                    <hr />
                                </>
                            }
                        </Paper>
                    }
                </div>
            </OutsideClickHandler>
        </>
    );
}

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const LoadNewDB = ({ open, setOpen, setVisible, loading, setLoading }) => {

    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const [type, setType] = useState('existing')
    const [selectedValue, setSelectedValue] = useState('')
    const [selectOpen, setSelectOpen] = React.useState(false);
    const [fileNamesArr, setFileNamesArr] = useState([])
    const [fileNameToUpdate, setFileNameToUpdate] = useState('')
    const [companyData, setCompanyData] = useState()
    const [technoData, setTechnoData] = useState()
    const [companyExcelName, setCompanyExcelName] = useState('')
    const [technoExcelName, setTechnoExcelName] = useState('')

    const companyRef = useRef(null)
    const technoRef = useRef(null)

    let radioData = [
        { name: "Choose Existing", value: "existing" },
        { name: "Create New", value: "new" },
    ]

    const onBrowseClick = (value) => {
        if (value === 'company') companyRef.current.click()
        if (value === 'techno') technoRef.current.click()
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleRadioClick = (event) => {
        setType(event.target.value)
    }

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value)
        setFileNameToUpdate(event.target.value)
    }

    const handleSelectClose = () => {
        setSelectOpen(false);
    };

    const handleSelectOpen = () => {
        setSelectOpen(true);
    };

    const onCompanyUpload = async (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', event.target.files[0].name)
        setCompanyExcelName(event.target.files[0].name)
        setCompanyData(data)

    }

    const onTechnoUpload = async (event) => {

        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', event.target.files[0].name)
        setTechnoExcelName(event.target.files[0].name)
        setTechnoData(data)

    }

    const onUpdate = async () => {
        let companyList = []
        setLoading(true)
        const response = await api().post(endpoints.uploadCompanies, companyData);
        if (response.status === 200) {
            companyList.push(response.data.updatedCompanies)
            const res = await api().post(endpoints.updateFileNamesFromDB, {
                companyList: companyList,
                fileNameToUpdate: fileNameToUpdate
            })
            const resp = await api().post(endpoints.uploadTechno, technoData);
            if (resp.status === 200) {
                const updateScore = await api().get(endpoints.updateScore)
                if (updateScore.status === 200) {
                    setOpen(false)
                    setVisible(false)
                    setLoading(false)
                    window.location.reload();
                }
            }
        }
    }

    useEffect(() => {
        const fetchDbFileNames = async () => {
            // setBreakdown('Choose one')
            // setValue()
            // if (overlay && breakdown !== 'Choose one') {
            const response = await api().get(
                endpoints.getFileNamesFromDB
            );
            if (response.status === 200) {
                // setOverlay(response.data.data)
                setFileNamesArr(response.data.data)
            }
            // }
        }
        fetchDbFileNames()
    }, [])


    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={open}
            onClose={handleClose}
        >
            <Grid container style={modalStyle} className={classes.paper}>

                {/* 1st row */}
                <Grid item md={12} id="simple-modal-title" className={classes.gridItem} style={{ justifyContent: 'center', alignItems: 'center', marginBottom: '5px' }} >
                    <Text value="Update Database" style={{ fontSize: '22px', fontWeight: 600, textAlign: 'center' }} />
                </Grid>

                {/* 2nd row */}
                <Grid item md={5} id="simple-modal-description" className={classes.labelGridItem}>
                    <Text value="Upload Companies" style={{ fontSize: '13px' }} />
                </Grid>
                <input id="myInput" type="file" ref={companyRef} style={{ display: 'none' }} onChange={onCompanyUpload} />
                <Grid item md={7} style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                    <div className={classes.gridItem} >
                        <ButtonBase className={classes.buttonBase} onClick={() => onBrowseClick('company')} >
                            <Text value='Browse' style={{ fontSize: '12px', lineHeight: '0px' }} />
                        </ButtonBase>
                        <Text value=".csv files can upload here." style={{ fontSize: '10px' }} />
                    </div>
                    <Text value={companyExcelName} style={{ marginLeft: '0px', marginTop: '1px', fontSize: '11px', color: '#3c8dbc' }} />
                </Grid>

                {/* 3rd row */}
                <Grid item md={5} id="simple-modal-description" className={classes.labelGridItem}>
                    <Text value="Upload Technology" style={{ fontSize: '13px' }} />
                </Grid>
                <input id="myInput" type="file" ref={technoRef} style={{ display: 'none' }} onChange={onTechnoUpload} />
                <Grid item md={7} style={{ display: 'flex', flexDirection: 'row', alignItems: 'left' }}>
                    <div className={classes.gridItem} >
                        <ButtonBase className={classes.buttonBase} onClick={() => onBrowseClick('techno')} >
                            <Text value='Browse' style={{ fontSize: '12px', lineHeight: '0px' }} />
                        </ButtonBase>
                        <Text value=".csv files can upload here." style={{ fontSize: '10px' }} />
                    </div>
                    <Text value={technoExcelName} style={{ marginLeft: '0px', marginTop: '1px', fontSize: '11px', color: '#3c8dbc' }} />
                </Grid>

                {/* 4th row */}
                <Grid item md={5} id="simple-modal-description" className={classes.labelGridItem}>
                    <Text value="File Name" style={{ fontSize: '13px' }} />
                </Grid>
                <Grid item md={7}>
                    <Grid container>

                        {
                            radioData.map((y, key) => (
                                <Grid key={key} item md={6} className={classes.gridItem} style={{ flexDirection: 'inherit' }}>
                                    <Radio
                                        checked={type === y.value}
                                        onChange={handleRadioClick}
                                        value={y.value}
                                        name="plan"
                                        style={{ color: '#3c8dbc', marginTop: '-9px' }}
                                    />
                                    <Text value={y.name} style={{ fontSize: '12px' }} />
                                </Grid>
                            ))
                        }
                        <Grid item md={12} className={classes.gridItem} style={{ marginTop: '-30px', height: '5px' }}>
                            {
                                type === 'new' ?
                                    <form className={classes.textbox} noValidate autoComplete="off" >
                                        <TextField
                                            id="outlined-size-small"
                                            variant="outlined"
                                            size="small"
                                            onChange={handleSelectChange}
                                        />
                                    </form>
                                    :
                                    <FormControl className={classes.formControl}>
                                        <Select
                                            labelId="demo-controlled-open-select-label"
                                            id="demo-controlled-open-select"
                                            open={selectOpen}
                                            onClose={handleSelectClose}
                                            onOpen={handleSelectOpen}
                                            value={selectedValue}
                                            onChange={handleSelectChange}
                                            variant="outlined"
                                            displayEmpty
                                        >
                                            <MenuItem value="" style={{ fontSize: 12 }} disabled>Select One</MenuItem>
                                            {
                                                fileNamesArr.map((x, key) =>
                                                    <MenuItem key={key} value={x} style={{ fontSize: 12 }}>{x}</MenuItem>
                                                )
                                            }
                                        </Select>
                                    </FormControl>
                            }
                        </Grid>
                    </Grid>
                </Grid>

                {/* 5th row */}
                <Grid item md={12} id="simple-modal-title" className={classes.gridItem} style={{ justifyContent: 'center', height: '80px', alignItems: 'center' }}>
                    <ButtonBase style={{ borderRadius: 4, width: '100px', height: '25px', backgroundColor: '#3c8dbc' }} onClick={onUpdate}>
                        <Text value={`Update`} style={{ color: '#fff' }} />{loading && <i style={{ color: '#fff', marginLeft: '5px' }} className="fas fa-spinner fa-spin"></i>}
                    </ButtonBase>
                </Grid>

            </Grid>
        </Modal>
    )
}

CustomSelect.defaultProps = {
    options: [],
    label: "",
    // minWidth : 120
}

CustomSelect.propType = {
    options: PropTypes.array.isRequired,
    icon: PropTypes.node,
    label: PropTypes.string,
    // minWidth : PropTypes.number
}