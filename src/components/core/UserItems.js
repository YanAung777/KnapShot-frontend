import React, { useReducer, useContext, useState, useEffect } from 'react';
import { makeStyles, Checkbox,Tooltip } from '@material-ui/core';
import { Phone, EmailOutlined} from '@material-ui/icons';
import OutlineBtn from 'components/core/OutlineBtn';
import moment from 'moment'

//util
import { checkAuth } from 'util/check-auth';

//context
import { useAppValue } from 'context/app';

//API
import api from 'api';

//constants
import endpoints from 'constants/endpoints';

//components
import CustomIcon from 'components/core/CustomIcon';

// import CustomPopOver from 'components/core/CustomPopOver';
import Text from 'components/core/Text';

//route
import { history } from 'router/history';

//constants
import { digitals } from 'constants/digitals';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottom: `1px solid #ccc`,
        cursor: 'pointer'
    },
    main: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    check: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    date: {
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    item: {
        marginRight: '8px',
        lineHeight:'1',
        maxWidth: '40px',
    },
    user: {
        display:'flex', 
        flexDirection:'column', 
        marginTop : '3px',
        marginRight: '10px',
    }
}));

export default function UserItems(props) {

    if (!checkAuth()) {
        history.push("/login");
    }

    const classes = useStyles();
    const [state, dispatch] = useAppValue();

    const onSelectUser = (link) => {
        history.push(link)
    }
    
    let {id,idArr, setIdArr,accCreated,lstLgIn,countryBased,name,title,company,overall_knapshot_score,phone,email,plan,coverage}=props

    const [checked, setChecked] = React.useState(false);
    
    const temp = [...idArr]

    const handleChange = e => {
        setChecked(e.target.checked);
        const checkBoxId = parseInt(e.target.id)
        const checked = e.target.checked;

        if (checked) {
            temp.push(checkBoxId)
            setIdArr(temp)
        }
        else {
            temp.splice(temp.indexOf(checkBoxId), 1)
            setIdArr(temp)
        }
    };
    
    // This is just a testing
    lstLgIn = ""
    let score = {};
    // This is just a testing

    if (overall_knapshot_score < 2) score = { type: "Basic", color: digitals["Basic"] };
    else if (overall_knapshot_score >= 2 && overall_knapshot_score < 5) score = { type: "Intermediate", color: digitals["Intermediate"] };
    else if (overall_knapshot_score >= 5 && overall_knapshot_score < 8) score = { type: "High", color: digitals["High"] };
    else score = { type: "Advanced", color: digitals["Advanced"] };

    return (
        <div className={classes.root}>
            <div style={{ borderRight: `1px solid #ccc`, marginTop:'5px', marginBottom:'5px',minWidth: '130px'}}>
                <div className={classes.main}
                    onClick={() => onSelectUser()}
                    {...props}
                >
                    <div className={classes.check}>
                        <Checkbox
                            id={id}
                            checked={checked}
                            onChange={handleChange}
                            color="default"
                            value="default"
                            inputProps={{ 'aria-label': 'checkbox with default color' }}
                        />
                    </div>
                    <div className={classes.date} style={{ borderRight: `1px solid #ccc` }}>
                        <Text value="Account Created" className={classes.item} style={{ fontSize: '10px', color: '#d1d1cf'}} />
                        <Text value={moment(accCreated).format('D MMM YYYY')} className={classes.item} style={{ fontSize: '10px',marginTop: '10px' }} />
                    </div>
                    <div className={classes.date} style={{marginLeft: '5px'}}>
                        <Text value="Last Log In" className={classes.item} style={{ fontSize: '10px',color: '#d1d1cf' }} />
                        <Text value={lstLgIn} className={classes.item} style={{ fontSize: '10px',marginTop: '10px' }} />
                    </div>
                </div>
                <div style={{textAlign:'center', marginTop: '12px'}}>
                    <Text value="Based In" style={{ fontSize:'9px',textAlign:'center', marginTop: '10px' }} />
                    <OutlineBtn value={countryBased} style={{ fontSize: 10, margin: "0 auto",minWidth:'90px', minHeight: '20px',borderRadius: "20px" }} />
                </div>
            </div>
            <div style={{display:'flex', flexDirection:'row',marginLeft: '10px'}}>
                <div className={classes.user} style={{justifyContent:'flex-start'}}>
                    <Text value={name} style={{ fontSize:'11px'}} />
                    <Text value={title} style={{  marginTop: '3px',fontSize:'11px' }} />
                    {/* <Text value={company} style={{ color:'#155dc2', fontSize:'11px',marginTop: '3px' }} /> */}
                    <Text value={company} style={{fontSize:'11px',marginTop: '3px', color: overall_knapshot_score ? '#3c8dbc' : 'black' }} />
                    {
                        overall_knapshot_score ? 
                        <div style={{marginTop: '5px'}}>
                            <Text value="Digital Engagement" style={{ fontSize:'9px',textAlign:'center', marginTop: '5px' }} />
                            <OutlineBtn
                                value={`/10 | ${score["type"]}`}
                                score={<span style={{ fontSize: 12 }}>{overall_knapshot_score}</span>}
                                style={{ backgroundColor: score["color"], color: '#FFF', fontSize: 10, fontWeight: '600', margin: "0 auto", minHeight: '20px',borderRadius: "20px" }} />
                        </div> : <div style={{width: '120px'}}>&nbsp;</div>
                    }
                </div>
                <div className={classes.user} style={{justifyContent: 'flex-end'}}>
                    {
                        (phone || email ) ?<div>
                        <Text value="Contact" style={{ fontSize:'9px',textAlign:'center' }} />
                        <div style={{border:'1px solid #ccc', minWidth:'70px', maxHeight: '18px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius: "20px", textAlign:"center"}}>
                            {   phone &&
                                <a href={`tel:${phone}`}>
                                    <CustomIcon icon={<Tooltip title={phone}><Phone /></Tooltip>} />
                                </a>
                            }
                            {
                                email &&
                                <a href={`mailto:${email}`} target="_top">
                                    <CustomIcon icon={<Tooltip title={email}><EmailOutlined /></Tooltip>} />
                                </a>
                            }
                        </div></div> : <div style={{ minWidth:'70px', maxHeight: '18px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius: "20px", textAlign:"center"}}></div>
                    }
                </div>
                <div className={classes.user} style={{justifyContent:'space-between'}}>
                    <div >
                        <Text value="Plan Type" style={{ fontSize:'9px',textAlign:'center', marginTop: '5px' }} />
                        <OutlineBtn value={plan.charAt(0).toUpperCase() + plan.substring(1)} style={{ fontSize: 10, margin: "0 auto",minWidth:'90px', minHeight: '20px',borderRadius: "20px" }} />
                    </div>
                    <div style={{marginTop: '5px'}}>
                        <Text value="Coverage" style={{ fontSize:'9px',textAlign:'center', marginTop: '5px' }} />
                        <OutlineBtn value={coverage} style={{ fontSize: 10, margin: "0 auto",minWidth:'90px', minHeight: '20px',borderRadius: "20px" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}

UserItems.defaultProps = {
    
}

UserItems.propType = {
    
}