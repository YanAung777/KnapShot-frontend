import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Draggable from 'react-draggable';
import Tooltip from '@material-ui/core/Tooltip';
import "./ruler.css"

//constants
import prototypes from 'constants/prototypes';

const useStyles = makeStyles(theme => ({
    root: {
        margin: '5px 0',
        width: '100%'
    },
    ruler: {
        position: 'relative',
        width: '70%',
        margin: '20px auto',
        height: '14px',
    },
    rulercm: {
        position: 'absolute',
        bottom: '-15px',
        font: '11px/1 sans-serif',
    },
}));



const capitalize = str => str.charAt(0).toUpperCase() + str.substring(1)

export default function CustomProgressBar({ mainColor, getValues, percent, blueC, greenC, redC }) {

    const classes = useStyles();

    const [changes, setChanges] = useState(10)
    const [red, setRed] = useState()
    const [green, setGreen] = useState()
    const [blue, setBlue] = useState()
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(100)


    // Object.keys(colorObjProps)

    useEffect(() => {
        getValues(red, green, blue)
    }, [red, green, blue])

    let funcObj = { setBlue, setRed, setGreen }
    let colorObj = { red, green, blue }
    let colorMapping = {
        blue: "Company Contact",
        green: "Firmographic",
        red: "Technographic"
    }

    // console.log("percent", percent)

    useEffect(() => {
        if (Object.keys(percent).length) {
            setBlue(percent["Company Contact"])
            setGreen(percent["Firmographic"])
            setRed(percent["Technographic"])
            // if (!blueC) setBlue(0)
            // if (!greenC) setGreen(0)
            // if (!redC) setRed(0)
        }
    }, [mainColor, percent])

    // useEffect(() => {
    //     setBlue(blueC)
    // }, [blueC])

    // useEffect(() => {
    //     setBlue(redC)
    // }, [redC])

    // useEffect(() => {
    //     setBlue(greenC)
    // }, [greenC])


    // useEffect(() => {
    //     // if (!Object.keys(colorObjProps))
    //     if (Object.keys(percent).length) {
    //         // setBlue(0)
    //         // setGreen(0)
    //         // setRed(0)
    //         // if (mainColor.length == 1) {
    //         //     if (Object.keys(percent).includes("Company Contact")) {
    //         //         setBlue(100)
    //         //         setGreen(0)
    //         //         setRed(0)
    //         //     }
    //         //     if (Object.keys(percent).includes("Firmographic")) {
    //         //         setGreen(100)
    //         //         setBlue(0)
    //         //         setRed(0)
    //         //     }
    //         //     if (Object.keys(percent).includes("Technographic")) {
    //         //         setRed(100)
    //         //         setBlue(0)
    //         //         setGreen(0)
    //         //     }
    //         // }

    //         // if (mainColor.length == 2) {
    //         //     funcObj["set" + capitalize(mainColor[0])](percent[colorMapping[mainColor[0]]])
    //         //     funcObj["set" + capitalize(mainColor[1])](percent[colorMapping[mainColor[1]]])
    //         //     funcObj["set" + capitalize(prototypes.arr_diff(mainColor, ['red', 'green', 'blue'])[0])](0)
    //         // }

    //         // if (mainColor.length == 3) {
    //         // console.log("percent set", percent)
    //         if (percent["Company Contact"]) setBlue(percent["Company Contact"])
    //         if (percent["Firmographic"]) setGreen(percent["Firmographic"])
    //         if (percent["Technographic"]) setRed(percent["Technographic"])
    //         // }
    //     }

    //     else for (let index in mainColor) {
    //         // if (index == 0) funcObj["set" + capitalize(mainColor[index])](mainColor.length == 1 ? 100 : 70)
    //         // if (index == 1) funcObj["set" + capitalize(mainColor[index])](mainColor.length == 2 ? 30 : 20)
    //         // if (index == 2) funcObj["set" + capitalize(mainColor[index])](10)
    //     }
    // }, [mainColor, percent])

    // console.log('percent', percent)
    // console.log("blue", blue)
    // console.log("green", green)
    // console.log("red", red)

    // useEffect(() => {
    //     for (let color of Object.keys(colorObjProps)) {
    //         console.log("loop", color)
    //         funcObj["set" + capitalize(color)](colorObjProps[color])
    //     }
    // }, [])

    let colors = { "red": "#F2346A", "green": "#A9D18F", "blue": "#5A9BD5" }

    const getOtherColor = color => mainColor.filter(x => x != color)

    const getMaxValue = (color) => {
        if (mainColor.length === 3) return 100 - colorObj[getOtherColor(color)[0]] - colorObj[getOtherColor(color)[1]] + changes
        if (mainColor.length === 2) return 100 - colorObj[getOtherColor(color)[0]] + changes
        else return 100
    }

    const getMaxValue2 = (color) => {
        if (mainColor.length === 3) return 100 - colorObj[getOtherColor(color)[0]] - colorObj[getOtherColor(color)[1]]
        if (mainColor.length === 2) return 100 - colorObj[getOtherColor(color)[0]]
        else return 100
    }

    const getColorPercent = color => `${colorObj[color]}%`

    const calculatePercentFunc = (number, old, color) => {

        if (old == changes) {
            // console.log(" I am here 1", color)
            if (number > 0) return old + changes
            else return old
        }

        // if (old == getMaxValue(color) || old == 100 - changes * mainColor.length) {
        //     // console.log(" I am here 2", color)
        //     if (number > 0) return old
        //     else return old - changes
        //     // return old
        // }
        // if(old == 100 - changes * mainColor.length) console.log("old error here")

        if (old == getMaxValue(color)) {
            // console.log(" I am here 2", color)
            if (number > 0) return old
            // else return old - changes
            return old - changes
        }

        if (old > changes) {
            // console.log(" I am here 3", color)
            if (number > 0) return old + changes
            else return old - changes
        }
    }

    // console.log("update1", ((window.innerWidth * old / 100) + ui.deltaX))
    // console.log("update2", ((window.innerWidth * old / 100) + ui.deltaX) / 100)

    const handleDrag = (e, ui, color) => {
        let index = mainColor.indexOf(color)
        let other = mainColor.length === 2 ? getOtherColor(color)[0] : getOtherColor(color)[1]
        if (mainColor.length === 2) other = getOtherColor(color)[0]
        else {
            if (index == 0) other = getOtherColor(color)[0]
            else other = getOtherColor(color)[1]
        }
        if (mainColor.length == 1) funcObj["set" + capitalize(color)](old => calculatePercentFunc(ui.deltaX, old, color))

        else if (ui.deltaX > 0) {
            let limit = false
            funcObj["set" + capitalize(other)](old => {
                let a = calculatePercentFunc(-ui.deltaX, old, other)
                if (a == old) limit = true
                return a
            })
            if (!limit) funcObj["set" + capitalize(color)](old => calculatePercentFunc(ui.deltaX, old, color))
        }

        else if (ui.deltaX < 0) {
            let limit = false
            funcObj["set" + capitalize(color)](old => {
                let a = calculatePercentFunc(ui.deltaX, old, color)
                if (a == old) limit = true
                return a
            })
            if (!limit) funcObj["set" + capitalize(other)](old => calculatePercentFunc(-ui.deltaX, old, other))
        }
    };


    return (
        <>
            {/* <div> red: {red}% green: {green}% blue: {blue}%</div> */}
            <div style={{ display: "flex", flexDirection: "row", height: 30, border: "1px solid lightgrey" }}>
                {
                    mainColor.map((key, index) =>
                        <Draggable
                            axis="x"
                            handle={`.handle${index}`}
                            position={{ x: 0, y: 0 }}
                            grid={[25, 25]}
                            scale={1}
                            onDrag={(e, ui) => handleDrag(e, ui, key)}
                        >
                            <Tooltip title={getColorPercent(key)}>
                                <div className={`handle${index}`} style={{ cursor: "pointer", backgroundColor: colors[key], width: getColorPercent(key) }}></div>
                            </Tooltip>
                        </Draggable>
                    )
                }
            </div>
            <div class='ruler' style={{ position: "relative" }}>
                {/* <hr style={{ position: "absolute" }} /> */}
                {
                    prototypes.range(start, end, (end - start) / 10).map(
                        (content, index) => {
                            if (index == prototypes.range(start, end, (end - start) / 10).length - 1) return <div class='cm' data-content={content} />
                            else return (
                                <div class='cm' data-content={content}>
                                    {
                                        Array(9).fill(1).map(x => <div class='mm'></div>)
                                    }
                                </div>
                            )
                        }
                    )
                }
            </div>

        </>
    );
}

CustomProgressBar.defaultProps = {
    mainColor: ["red", "green", "blue"],
    colorObjProps: {}
}

CustomProgressBar.propType = {
    mainColor: PropTypes.array.isRequired,
    colorObjProps: PropTypes.object,
}