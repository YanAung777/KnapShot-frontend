import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

//route
import { history } from 'router/history';

//components
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({ 
    root: {
        marginLeft: '3%',
        marginTop: '1%'
    },
    text: {
        color: '#000',
        cursor: 'pointer',
        textTransform: 'capitalize'
    }
}))

export default function CrumbList() {

    const classes = useStyles();

    let paths = window.location.pathname.split(/[/]/)

    function handleClick(x) {
        let link = ''
        for (let i = 0; i <= paths.indexOf(x); i++) {
            if (paths[i] === null || paths[i] === '' || paths[i] === undefined) continue
            link = link + `/${paths[i]}`
        }
        history.push(link)
    }

    const keyValues = {
        "manage": "Manage",
        "user": "User",
        "dashboard": "User Dash Board",
        "create": "Create New User"
    }
    let value =''

    return (
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" className={classes.root}>
                {
                    paths.map((x, i) => {
                        if (x !== null && x !== '' && x !== undefined) {
                            value = x
                            return <Link className={classes.text} color="inherit" onClick={() => handleClick(x)}>
                                {keyValues[value] !== undefined ? <span style={{color:'#000'}}>{keyValues[value]}</span> : null}
                            </Link>
                        }
                    })
                }
                {/* {
                    keyValues[value] !== undefined ? <span style={{color:'#000'}}>{keyValues[value]}</span> : null
                } */}
        </Breadcrumbs>
    )
}