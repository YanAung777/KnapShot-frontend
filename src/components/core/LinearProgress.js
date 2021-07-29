import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

export default function LinearDeterminate(props) {
    const classes = useStyles();
    const [progress, setProgress] = React.useState(0);
    const [coolDown, setCoolDown] = React.useState(props.maxLimit);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    // React.useEffect(() => {
    //     const countDown = setInterval(() => {
    //         setCoolDown((oldCoolDown) => {
    //             if (oldCoolDown === 0) return 0
    //             return --oldCoolDown
    //         });
    //     }, 1000);

    //     return () => {
    //         clearInterval(countDown);
    //     };
    // }, []);

    // if (!coolDown) return (<div>No Data!</div>)

    // else 
    return (
        <div className={classes.root}>
            <LinearProgress variant="determinate" value={progress} />
        </div>
    );
}

LinearDeterminate.defaultProps = {
    maxLimit: 10
}

LinearDeterminate.propType = {
    options: PropTypes.number.isRequired
}