import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js';
import { Typography } from '@material-ui/core';

// Chart.defaults.scale.gridLines.display = false;
//constants
import endpoints from 'constants/endpoints';


//hook
import { useOverviewHook } from 'pages/overview/useOverviewHook';

//context
import { useAppValue } from 'context/app';

//API
import api from 'api';



//Component
import Text from 'components/core/Text';
import Badge from 'components/core/Badge';

let myScatterChart;

const ScatterChart = (props) => {

    const [state, dispatch] = useAppValue();
    const { sortFilter, selectedDataset, selectedFilename, technologyFilter, company } = state;

    var [companyIds, setCompanyIds] = useState()

    let [datasetIndex, setDatasetIndex] = useState(null)
    let [itemIndex, setItemIndex] = useState(null)
    let [data, setData] = useState(null)
    const { DigitalEngagementBreakDown } = props;
    const scatterCRef = useRef();

    useEffect(() => {
        company.count === DigitalEngagementBreakDown.count && setData(DigitalEngagementBreakDown.results)
        // company.count === DigitalEngagementBreakDown.count && buildChart(DigitalEngagementBreakDown.results);
    }, [DigitalEngagementBreakDown, company]);

    useEffect(() => {
        buildChart(data);
    }, [data]);

    useOverviewHook(companyIds)

    useEffect(() => {
        async function fetchData() {
            const response = await api().post(
                endpoints.getAllCompanies + "?page=" + 1,
                {
                    dataset: selectedDataset,
                    file_name: selectedFilename,
                    companyIds,
                    sortFilter
                }
            );
            if (response.status === 200) {
                dispatch({
                    type: "resetSelectedCompanies",
                    companies: response.data.companies,
                    count: response.data.count,
                    loading: false
                });
            }
        }

        companyIds && fetchData();

    }, [companyIds, sortFilter]);



    const buildChart = (data) => {
        const myscatterCRef = scatterCRef.current.getContext("2d");

        if (myScatterChart) {
            myScatterChart.destroy();
        }

        let config = {
            type: 'scatter',
            data: { datasets: data },
            options: {
                event: ['click'],
                showAllTooltips: false,
                scales: {
                    xAxes: [{
                        gridLines: {
                            display: false,
                            color: 'gray'
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false,
                            color: 'transparent'
                        },
                        ticks: {
                            beginAtZero: true,
                            padding: 10
                        }
                    }],
                },
                tooltips: {
                    mode: 'nearest',
                    callbacks: {
                        footer: renderTooltipFooter,
                        label: function () { return }
                    },
                    backgroundColor: '#000'
                },
                onClick: chartClickEvent
            }
        };

        myScatterChart = new Chart(myscatterCRef, config);
    }

    const renderTooltipFooter = (datasets, data) => {

        let datasetIndex = datasets[0]["datasetIndex"];
        let x = datasets[0]["xLabel"];
        let y = datasets[0]["yLabel"]
        let value = [];
        let ids = [];

        data["datasets"].forEach(item => {
            if (datasetIndex === 0) {
                if (item["label"] === "Basic") {
                    item["data"].forEach(item => {
                        if (item.x === x && item.y === y) {
                            value.push(item.company_name);
                        }
                    });
                }
            } else if (datasetIndex === 1) {
                if (item["label"] === "Intermediate") {
                    item["data"].forEach(item => {
                        if (item.x === x && item.y === y) {
                            value.push(item.company_name);
                        }
                    });
                }
            } else if (datasetIndex === 2) {
                if (item["label"] === "High") {
                    item["data"].forEach(item => {
                        if (item.x === x && item.y === y) {
                            value.push(item.company_name);
                        }
                    });
                }
            } else {
                if (item["label"] === "Advanced") {
                    item["data"].forEach(item => {
                        if (item.x === x && item.y === y) {
                            value.push(item.company_name);
                        }
                    });
                }
            }
        });
        return value;
    }

    const chartClickEvent = async (event, array) => {

        if (myScatterChart === undefined || myScatterChart == null) {
            return;
        }
        if (event === undefined || event == null) {
            return;
        }
        if (array === undefined || array == null) {
            return;
        }
        if (array.length <= 0) {
            return;
        }
        var active = myScatterChart.getElementAtEvent(event);
        if (active === undefined || active == null) {
            return;
        }

        setDatasetIndex(active[0]._datasetIndex)
        setItemIndex(active[0]._index)
        let companyIds = [], x, y;

        x = data[active[0]._datasetIndex].data[active[0]._index].x
        y = data[active[0]._datasetIndex].data[active[0]._index].y

        data[active[0]._datasetIndex].data.map(item => {
            if (item.x === x && item.y === y) companyIds.push(item.company_id)
        })

        setCompanyIds(companyIds)

        const response = await api().post(
            endpoints.getAllCompanies + "?page=" + 1,
            {
                dataset: selectedDataset,
                file_name: selectedFilename,
                companyIds,
                sortFilter
            }
        );
        if (response.status === 200) {
            dispatch({
                type: "resetSelectedCompanies",
                companies: response.data.companies,
                count: response.data.count,
                loading: false
            });
        }

        // this.setState({ datasetIndex, itemIndex }, () => {
        //     $('#my-modal').trigger('click');
        // });
    }

    const renderData = () => {
        if (data && data.length > 0 && datasetIndex !== null) {
            return data.map((items, index) => {

                let x, y, adExp, dataArr;

                if (datasetIndex === 0) {
                    if (items["label"] === "Basic") {
                        x = items["data"][itemIndex]["x"];
                        y = items["data"][itemIndex]["y"];
                        adExp = "< $1k";
                        dataArr = items["data"];
                    }
                } else if (datasetIndex === 1) {
                    if (items["label"] === "Intermediate") {
                        x = items["data"][itemIndex]["x"];
                        y = items["data"][itemIndex]["y"];
                        adExp = "$1k - $5k";
                        dataArr = items["data"];
                    }
                } else if (datasetIndex === 2) {
                    if (items["label"] === "High") {
                        x = items["data"][itemIndex]["x"];
                        y = items["data"][itemIndex]["y"];
                        adExp = "$5k - $10k";
                        dataArr = items["data"];
                    }
                } else {
                    if (items["label"] === "Advanced") {
                        x = items["data"][itemIndex]["x"];
                        y = items["data"][itemIndex]["y"];
                        adExp = "$5k - $10k";
                        dataArr = items["data"];
                    }
                }
                return (
                    <React.Fragment>
                        {
                            dataArr && dataArr.length > 0 &&
                            <React.Fragment>
                                {
                                    dataArr.map((itm, ind) => {
                                        if (itm.x === x && itm.y === y) {
                                            return (
                                                <React.Fragment key={ind}>
                                                    <a href={`/company-profile?company_name=${itm["company_name"]}&dataset=${"Indonesia"}`}
                                                        target="_blank"
                                                        style={{ fontSize: '14px', color: '#3c8dbc' }}>
                                                        {itm["company_name"]}
                                                    </a>
                                                </React.Fragment>
                                            )
                                        }
                                    })
                                }
                                <div style={{ margin: '6px 0px' }}>
                                    <Text text="KS Score" size="14px" color="gray" />
                                    <Badge label={dataArr[itemIndex]["ks_score"]} style={{ float: 'right' }} />
                                </div>
                                <div style={{ margin: '6px 0px' }}>
                                    <Text text="Ad Exp" size="14px" color="gray" />
                                    <Badge label={adExp} style={{ float: 'right' }} />
                                </div>
                            </React.Fragment>
                        }
                    </React.Fragment>
                )
            });
        }
    }

    return (
        <div style={{ background: '#FFFFFF', padding: '15px 0px 30px 20px', position: 'relative' }}>
            <div style={{ marginBottom: 55 }}>
                {/* <input type="text" placeholder="Search company name" className="scatter-search" /> */}
            </div>
            <div className="container-fluid" style={{ width: '90%', marginLeft: 0 }}>
                <canvas
                    id="myChart"
                    ref={scatterCRef}
                    style={{ background: 'white' }}
                />
            </div>
            <Typography style={{ position: 'absolute', left: 20, top: 51, fontSize: 13 }}>Digital Presence</Typography>
            <div style={{ position: 'absolute', right: 4, bottom: 38, fontSize: 13, flexDirection: 'column', display: 'flex' }}>
                <Typography>Technology</Typography>
                <Typography>Assets</Typography>
            </div>

            {/* <div className="container">
                <button
                    id="my-modal"
                    type="button"
                    className="btn btn-primary"
                    data-toggle="modal"
                    data-target="#myModal"
                    style={{ visibility: 'hidden' }} />
                <div className="modal fade" data-backdrop="false" id="myModal">
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                        <div className="modal-content">
                            <i className="fa fa-times" data-dismiss="modal" style={{ textAlign: 'right', margin: '5px 10px 0 0' }} />
                            <div className="modal-body" style={{ padding: '0 10px' }}>
                                {renderData()}
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default ScatterChart;