import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Paper, Grid } from '@material-ui/core';

//components
import Icon from 'components/core/CustomIcon';
import Text from 'components/core/Text';

const useStyles = makeStyles(theme => ({
    root: {
        padding: 10,
        backgroundColor: '#F2F2F2',
        height: '100%'
    },
    item: {
        margin: '10px 0',
        padding: 10,
        border: 'none',
        boxShadow: 'none'
    }
}));


const Company = (props) => {

    const classes = useStyles();
    
    const {
        description,
        company_status,
        main_hq_location,
        year_of_operation,
        industry,
        business_type,
        product_service,
        total_personnel,
    } = props.company;

    return (
        <div className={classes.root}>
            <Paper className={classes.item}>
                <Text value="Business Description"
                    style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} /><br />
                {
                    description ?
                        <Text value={description} />
                        :
                        <Text value="-" />
                }
            </Paper>
            <Paper className={classes.item}>
                <Text value="About Business & Company"
                    style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} /><br />
                <Grid container>
                    <Grid item xs={4} md={4} lg={4}>
                        <Text value="Operating Status"
                            style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} />
                        {
                            company_status ?
                                <Text value={company_status} />
                                :
                                <Text value="-" />
                        }
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Text value="HQ Location"
                            style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} />
                        {
                            main_hq_location ?
                                <Text value={main_hq_location} />
                                :
                                <Text value="-" />
                        }
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Text value="Year Founded"
                            style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} />
                        {
                            year_of_operation ?
                                <Text value={year_of_operation} />
                                :
                                <Text value="-" />
                        }
                    </Grid>
                </Grid><br />
                <Grid container>
                    <Grid item xs={4} md={4} lg={4}>
                        <Text value="Industry / Category"
                            style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} />
                        <Text value="-" />
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Text value="Company Type"
                            style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} />
                        {
                            business_type ?
                                <Text value={business_type} />
                                :
                                <Text value="-" />
                        }
                    </Grid>
                    <Grid item xs={4} md={4} lg={4}>
                        <Text value="Employee Size"
                            style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} />
                        {
                            total_personnel ?
                                <Text value={total_personnel} />
                                :
                                <Text value="-" />
                        }
                    </Grid>
                </Grid>
            </Paper>
            <Paper className={classes.item}>
                <Text value="Offering / Expertise Keyword"
                    style={{ fontSize: 15, fontWeight: '500', color: 'gray' }} /><br />
                {
                    product_service ?
                        <Text value={product_service} />
                        :
                        <Text value="-" />
                }
            </Paper>
        </div>
    )
}

Company.defaultProps = {
    company: {}
}

Company.propTypes = {
    company: PropTypes.object
}

export default Company;