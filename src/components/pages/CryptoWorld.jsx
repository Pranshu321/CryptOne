import React, { useEffect, useState } from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../../services/cryptoApi';
import Loader from './Loader';

const CryptoWorld = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = useState();
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        setCryptos(cryptosList?.data?.coins);

        const filteredData = cryptosList?.data?.coins.filter((item) => item.name.toLowerCase().includes(searchTerm));

        setCryptos(filteredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return <Loader />;

    return (
        <>
            {!simplified && (
                <div className="search-crypto" style={{ width: "70%", display: 'flex', justifyContent: "center", textTransform: "uppercase" }}>
                    <Input
                        style={{ width: "70%", borderRadius: "8px", color: "black", fontWeight: "600", padding: "10px" }}
                        placeholder="Search Cryptocurrency"
                        onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
                    />
                </div>
            )}
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency) => (
                    <Col
                        xs={24}
                        sm={12}
                        lg={6}
                        className="crypto-card"
                        key={currency.uuid}
                    >

                        {/* Note: Change currency.id to currency.uuid  */}
                        <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                            <Card
                                style={{ borderRadius: "13px" }}
                                title={`${currency.rank}. ${currency.name}`}
                                extra={<img className="crypto-image" src={currency.iconUrl} />}
                                hoverable
                            >
                                <p style={{ fontWeight: "600" }}>Price: {millify(currency.price)}</p>
                                <p style={{ fontWeight: "600" }}>Market Cap: {millify(currency.marketCap)}</p>
                                <p style={{ fontWeight: "600" }}>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default CryptoWorld;