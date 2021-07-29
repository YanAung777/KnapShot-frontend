import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Paper, Popper, Grid, Divider, ButtonGroup, IconButton, Checkbox, Button, Tooltip } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';
import Text from 'components/core/Text';
import moment from 'moment'
import ProgressBar from './ProgressBar'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
const BorderLinearProgress = withStyles((theme) => ({
  root: {
    width: 100,
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    position: 'relative',
    marginLeft: 10,
    height: 70
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between"
  },
  simpleRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 70
  },
  column: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "column"
  },
});
function FirstProgress({ icon, firstUpperLeft, firstUpperDown, secondUpperLeft, secondUpperDown, downLeft, headerLabel, value, upperLeft, upperRight, variant, downRight }) {
  const classes = useStyles();
  return (
    <Grid container style={{ display: "flex", padding: "19px 0px 0px 35px" }}>
      <Grid item xs={2} style={{ marginRight: '-8px' }}>
        <Text value={firstUpperLeft} style={{ fontSize: '10px', fontWeight: 'bold' }} />
        <Text value={firstUpperDown} style={{ fontSize: '10px' }} />
      </Grid>
      <Grid item xs={8} style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: '15px' }} >
        <> {icon}</>
        <ProgressBar value={value} variant={variant} />
        <Text value={downRight} style={{ fontSize: 9, marginLeft: '50%' }} />
      </Grid>
      <Grid item xs={2}>
        <Text value={secondUpperLeft} style={{ fontSize: '10px', fontWeight: 'bold' }} />
        <Text value={secondUpperDown} style={{ fontSize: 9 }} />
      </Grid>
    </Grid>
  )

}
function RenderGridItem({ icon, firstUpperLeft, firstUpperDown, secondUpperLeft, secondUpperDown, downLeft, headerLabel, value, upperLeft, upperRight, variant, downRight }) {
  const classes = useStyles();
  return (
    <Grid item xs={8} style={{ marginLeft: '23px' }}>
      <Grid container alignItems='center' flexDirection='column' display="flex" padding='10px' >
        <Grid item xs={12} style={{ padding: '5px' }}>
          <Text value={headerLabel} style={{ fontSize: 9, fontWeight: 'bold', marginLeft: '28%' }} />
        </Grid>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <Text value={upperLeft} style={{ fontSize: 9 }} />
          <Text value={upperRight} style={{ fontSize: 9, marginLeft: '122px' }} />
        </div>
        <ProgressBar value={value} variant={variant} />
        <Grid container alignItems='center' flexDirection='row' >
          <Grid item xs={4}>
            <Text value={downLeft} style={{ fontSize: 9 }} />
          </Grid>
          <Grid item xs={2} />
          <Grid item xs={6}>
            <Text value={downRight} style={{ fontSize: 9, marginLeft: '44px' }} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )

}
export default function CustomizedProgressBars({ otherData, assigned, mainObj }) {
  let { start_date, end_date, totalMissing, totalVerified, totalFields, verifiedCompany, unVerifiedCompany } = otherData
  let { missing, available, verified, unVerified } = mainObj
  let diff = moment(end_date).diff(moment(start_date), 'days')
  // let { complete, assigned } = assignData
  // let { total, missing } = totalField

  // let diffDatePercent = moment(end_date).format('D') / diff
  // let CompletePercent = (complete / assigned * 100).toFixed(2)
  // let MissingPercent = (missing / total * 100).toFixed(2)
  // let VerifiedPercent = (verified / total * 100).toFixed(2)
  // let FoundPercent = ((oldMissing - missing) / oldMissing * 100).toFixed(2)

  let diffDatePercent = moment(end_date).format('D') / diff
  let CompletePercent = (verifiedCompany / assigned * 100).toFixed(2)
  let MissingPercent = (missing / totalFields * 100).toFixed(2)
  let VerifiedPercent = (verified / totalFields * 100).toFixed(2)
  let FoundPercent = ((totalMissing - missing) / totalMissing * 100).toFixed(2)


  const classes = useStyles();
  return (
    <Paper className={classes.simpleRow} style={{ borderBottom: "1px solid lightgrey" }}>
      <Grid container>
        <FirstProgress
          icon={<AccessAlarmIcon style={{ marginLeft: '50%' }} />}
          firstUpperDown={moment(start_date).format('D MMM')}
          firstUpperLeft='Start'
          secondUpperDown={moment(end_date).format('D MMM')}
          secondUpperLeft='Target'
          value={diffDatePercent}
          variant={"First"}
          downRight={`${diff} Days`}
        />
      </Grid>
      <Grid container>
        <RenderGridItem headerLabel='Companies' upperLeft={`${CompletePercent}%`} upperRight={assigned} value={CompletePercent} variant={"Second"} downLeft='Completed' downRight='Assigned' />
      </Grid>
      <Grid container>
        <RenderGridItem headerLabel='Fields Types' upperLeft={totalFields} upperRight={missing} value={MissingPercent} variant={"Third"} downLeft='Available' downRight='Missing' />
      </Grid>
      <Grid container>
        <RenderGridItem headerLabel='Available FieldType' upperLeft={`${VerifiedPercent}%`} upperRight={totalFields} value={VerifiedPercent} variant={"Fouth"} downLeft='Verified' downRight='Unverified' />
      </Grid>
      <Grid container>
        <RenderGridItem headerLabel='Missing Field Type' upperLeft={`${FoundPercent}%`} upperRight={totalMissing} value={FoundPercent} variant={"Fifth"} downLeft='Found' downRight='Cant Find' />
      </Grid>
    </Paper>
  );
}