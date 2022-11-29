import React, { useState, useEffect } from 'react'
import { Chart as ChartJs, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Col, Row, Typography } from 'antd';

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement
);
const { Title } = Typography;
const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [];
    const coinTimestamp = [];
    const [times, settims] = useState([]);
    const [prices, setprices] = useState([]);
    useEffect(() => {

        for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
            coinPrice.push(coinHistory?.data?.history[i].price);
        }

        for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
            coinTimestamp.push(new Date(coinHistory?.data?.history[i].timestamp).toLocaleDateString());
        }

        setprices(coinPrice);
        settims(coinTimestamp);
    }, [currentPrice, coinHistory, coinName]);
    // console.log(coinPrice, coinTimestamp);

    // const [chart, setchart] = useState({});

    // const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=50&offset=0';

    // const optionsapi = {
    //     method: 'GET',
    //     headers: {
    //         'X-RapidAPI-Key': '1fc5a36da5mshebbf0833b1a3b21p12c8f6jsnbcbd443ff5e7',
    //         'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
    //     }
    // };

    // useEffect(() => {
    //     fetch(url, optionsapi).then((res) => res.json()).then((json) => { setchart(json.data); }).catch(err => console.error('error:' + err))
    // }, [url]);

    let data = {
        labels: times,
        datasets: [{
            label: `Price In USD`,
            data: prices,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }

    // let options = {
    //     maintainAspectRatio: true,
    //     scales: {
    //         y: {
    //             beginAtZero: true
    //         }
    //     },
    //     legend: {
    //         labels: {
    //             fontSize: 26
    //         }
    //     }
    // }

    const options = {
        maintainAspectRatio: true,
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <div>
            <Row className="chart-header">
                <Title level={2} className="chart-title">{coinName} Price Chart </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
                    <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
                </Col>
            </Row>
            <Line
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChart;
