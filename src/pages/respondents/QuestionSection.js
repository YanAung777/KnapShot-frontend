import React, { useRef, useEffect, useState } from 'react';
import { makeStyles, Paper, ButtonBase, Divider, Popover, Tooltip, Grid, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Radio from '@material-ui/core/Radio';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import CloseIcon from '@material-ui/icons/Close';
import RepeatIcon from '@material-ui/icons/Repeat';

//css
import 'react-circular-progressbar/dist/styles.css';

//components
import Text from 'components/core/Text';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5px 30px'
    },
    btnIcon:{
        border: '1px solid grey',
        boxSizing: 'border-box', 
        width: '30px', 
        height: '24px', 
        fontSize: '8px',
         borderRadius: '4px'
    },
    checkbox: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    button: {
        border: '1.2px solid lightgray',
        borderRadius: 20,
        height: 25,
        minWidth: 150,
        float: 'right'
    },
    icon: {
        float: 'right',
        fontSize: 18,
        padding: 0
    },
    text: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'lightgray'
        },
        marginBottom: 5
    },
    option: {
        display: 'flex',
        boxShadow: 'none',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '5px'
    },
    dropdown: {
        border: 'none',
        borderRadius: 5,
        height: 25,
        minWidth: 85,
    },
    pover: {
        '& .MuiPopover-paper': {
            width: '60%'
        },
    }
}));


const QuestionSection = ({ totalCountArr1, questions, setId, id }) => {

    const classes = useStyles();
    const [visible, setVisible] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
    const [value, setValue] = useState();
    const [question, setQuestion] = useState('');

    useEffect(() => {
        if(questions) questions.filter(y => y.key === id).map(x => {
            setId(x.key)
            setQuestion(x.label)
        })
    }, [questions])

    // if(questions) questions.filter(y => y.key === 'Q-0').map(x => {
    //     setId(x.key)
    //     setQuestion(x.label)
    // })
    const toggle = () => {
        setVisible(!visible);
    }

    const handleClose = () => {
        setVisible(false);
    }

    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
    }

    return (
        <Grid container style={{ display: 'flex', flexDirection: 'row' }}>
            <Grid item md={3} style={{ display: 'flex' }}>
                <Grid container>
                    <Grid item md={9}>
                        <Text value="Main Survey Question (5)" style={{ marginTop: '2px', marginBottom: '3px' }} />
                    </Grid>
                    <Grid item md={2}>
                        <Text value={<ExpandMoreIcon style={{ float: 'right' }} />} style={{ marginTop: '2px', marginBottom: '3px' }} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={7} style={{ display: 'flex', cursor: 'pointer' }} onClick={toggle}>
                <Grid container onClick={recordButtonPosition}>
                    <Grid item md={2}>
                        <Text value={`${id}:`} style={{ marginTop: '2px', marginBottom: '3px' }} />
                    </Grid>
                    <Grid item md={9}>
                        <Text value={`${question}`} style={{ marginTop: '2px', marginBottom: '3px' }} />
                    </Grid>
                    <Grid item md={1}>
                        <Text value={<ExpandMoreIcon />} style={{ marginTop: '2px', marginBottom: '3px' }} />
                    </Grid>
                </Grid>
                <Popover
                    onClose={handleClose}
                    open={visible}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    className={classes.pover}
                >
                    <Paper className={classes.option}>
                        <Grid container spacing={2} border={1}>
                            <Grid item md={3}>
                                <Text value="Response Options" style={{ marginTop: '2px', marginBottom: '3px', textAlign: 'center' }} />
                                <Divider />
                            </Grid>
                            <Grid item md={6}>
                                <Text value="Questions" style={{ marginTop: '2px', marginBottom: '3px', textAlign: 'center' }} />
                                <Divider />
                            </Grid>
                            <Grid item md={3}>
                                <Text value="Treatment" style={{ marginTop: '2px', marginBottom: '3px', textAlign: 'center' }} />
                                <Divider />
                            </Grid>
                            <Itemsare id={id} questions={questions} setQuestion={setQuestion} setId={setId} />
                        </Grid>

                    </Paper>
                </Popover>
            </Grid>
            <Grid item md={2} style={{ display: 'flex' }}>
                <Text value={`Total Responses : ${Math.max(...totalCountArr1)}`} style={{ marginTop: '2px', marginBottom: '3px' }} />
            </Grid>
        </Grid >
    )
}

const Itemsare = ({ id, questions, setQuestion, setId }) => {

    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState(id);

    const handleChange = event => {
        questions.filter((y) => y.key === event.target.value).map((x) => {
            setQuestion(x.label)
            setId(x.key);
            setSelectedValue(x.key)
        })
    };

    return (
        questions.map((x) => (
            <>
                <Grid item md={3} style={{ display: 'flex', flexDirection: 'row' }}>
                    <Grid container >
                        <Grid item md={10}>
                            {
                                x.type === 'Choose one' ?
                                    <Text value={`[ Choose 1
                                ${x.length} multiple choices ]`} style={{ marginTop: '2px', marginBottom: '3px', whiteSpace: 'pre-line', textAlign: 'right' }} />
                                    :
                                    <Text value={x.type} style={{ marginTop: '2px', marginBottom: '3px', textAlign: 'right' }} />
                            }
                        </Grid>
                        <Grid item md={2}>
                            <Radio
                                className={classes.checkbox}
                                checked={selectedValue === x.key}
                                onChange={handleChange}
                                value={x.key}
                                color="default"
                                name="radio-button-demo"
                                style={{ marginTop: '-5px' }}
                                icon={<CheckBoxOutlineBlankIcon />}
                                checkedIcon={<CheckBoxIcon />}
                                disableRipple={true}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={6}>
                    <Grid container >
                        <Grid item md={2}>
                            <Text value={`${x.key}:`} style={{ marginTop: '2px', marginBottom: '3px', fontWeight: 700 }} />
                        </Grid>
                        <Grid item md={10}>
                            <Text value={`${x.label}`} style={{ marginTop: '2px', marginBottom: '3px' }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={3}>
                    <Grid container style={{padding: '5px'}}>
                        <Grid item md={3} style={{padding: '0 5px'}}>
                            <SettingsIcon className={classes.btnIcon} />
                        </Grid>
                        <Grid item md={3} style={{padding: '0 5px'}}>
                            <RepeatIcon  className={classes.btnIcon}/>
                            </Grid>
                        <Grid item md={3} style={{padding: '0 5px'}}>
                            <BarChartIcon className={classes.btnIcon}/>
                            </Grid>
                        <Grid item md={3} style={{padding: '0 5px'}}>
                            <CloseIcon />
                            </Grid>
                    </Grid>
                </Grid>
            </>
        ))

    )
}


QuestionSection.defaultProps = {

}

QuestionSection.propTypes = {

}


export default QuestionSection;
