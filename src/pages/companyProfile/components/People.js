import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, IconButton , Paper} from '@material-ui/core';
import { Warning } from '@material-ui/icons';

//components
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',
        padding: '20px 10px',
        backgroundColor: '#F2F2F2',
        height: '100%',
        width:'100%'
    },
    root2: {
        padding: '20px 10px',
        backgroundColor: '#F2F2F2',
        height: '100%',
        width:'100%'
    },
    button: {
        color: '#000'
    },
    wrapper: {
        "padding": 30
    },
    row: {
        "display": "flex",
        "flexDirection": "row",
        "flexWrap": "wrap",
        "width": "100%"
    },
    column: {
        "display": "flex",
        "flexDirection": "column",
        // "flexBasis": "100%",
        "flex": "1 1 50%"
    },
    innerColumn: {
        "display": "flex",
        "flexDirection": "column",
        "flex": "1",
        paddingLeft: 10
    },
    logoWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    },
    logo: {
        width: 50,
        height: 50,
        backgroundColor: '#757575',
        borderRadius: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // fontSize: 22,
        fontWeight: 600
    },
}));

const createLogo = (name) => {
    if (name) {
        let namesArray = name.trim().split(" ");

        let nameString;

        if (namesArray.length > 1) nameString = namesArray[0][0] + namesArray[1][0];

        else nameString = namesArray[0][0];

        return nameString.toUpperCase();
    }
}

const People = (props) => {
    const { personnels } = props.company;
    const classes = useStyles();
    return (
        <>
            {
                personnels.length > 0 ?
                <div className={classes.root2}>
                    <Paper className={classes.wrapper}>
                        <div className={classes.row}>
                            {
                                personnels.map(personnel => (
                                    <div className={classes.column}>
                                        <div className={classes.row}>
                                            <div className={classes.logo}>
                                                <Text value={createLogo(personnel.personnel_name)} style={{ fontSize: 22, color: '#FFF', fontWeight: 400 }} />
                                            </div>
                                            <div className={classes.innerColumn}>
                                                <Text value={personnel.personnel_name} style={{ fontSize: 15, fontWeight: '600', margin: '5px 0 2px 0', color: "#757575" }} />
                                                <Text value={personnel.role} style={{ fontSize: 12, color: "#757575", paddingTop: "-5px" }} />
                                                <Text value={personnel.email} style={{ fontSize: 12, marginBottom: '25px', color: "#757575", paddingTop: "-5px" }} />
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </Paper>
                    </div> :
                    <div className={classes.root}>
                        <IconButton className={classes.button}>
                            <Warning fontSize="large" />
                        </IconButton>
                        <Text value="No People Found !" style={{ fontSize: 18, fontWeight: '600' }} />
                    </div>
            }

        </>
    )
}


export default People;