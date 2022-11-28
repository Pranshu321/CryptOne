import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    // console.log("Chart data----> ", coinHistory, currentPrice, coinName);
    const coinPrice = [];
    const coinTimestamp = [];
    const [cointimes, setcointimes] = useState([]);
    const [coinprices, setcoinprices] = useState([]);
    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinPrice.push(coinHistory?.data?.history[i].price);
    }

    for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
        coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
    }

    const data = {
        labels: cointimes,
        datasets: [{
            label: '$',
            data: coinprices,
            backgroundColor: "white",
            borderColor: 'rgba(247,147,26,1)',
            borderJoinStyle: 'round',
            borderCapStyle: 'round',
            borderWidth: 3,
            pointRadius: 0,
            pointHitRadius: 10,
            lineTension: .2,
        }]
    };

    const options = {
        title: {
            display: false,
            text: 'Heckin Chart!',
            fontSize: 35
        },

        legend: {
            display: false
        },

        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
            }
        },

        scales: {
            xAxes: [{
                display: false,
                gridLines: {}
            }],
            yAxes: [{
                display: false,
                gridLines: {}
            }]
        },

        tooltips: {
            callbacks: {
                //This removes the tooltip title
                title: function () { }
            },
            //this removes legend color
            displayColors: false,
            yPadding: 10,
            xPadding: 10,
            position: 'nearest',
            caretSize: 10,
            backgroundColor: 'rgba(255,255,255,.9)',
            bodyFontSize: 15,
            bodyFontColor: '#303030'
        }
    };

    const btcData = async () => {
        const response = await fetch('https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&limit=119&api_key=0646cc7b8a4d4b54926c74e0b20253b57fd4ee406df79b3d57d5439874960146');
        const json = await response.json();
        const data = json.Data.Data
        const times = data.map(obj => obj.time)
        const prices = data.map(obj => obj.high)
        setcoinprices(prices);
        setcointimes(times);
    }

    useEffect(() => {
        btcData();
    }, []);

    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            {/* <Line data={data} options={options} /> */}
        </>
    );
};

export default LineChart;