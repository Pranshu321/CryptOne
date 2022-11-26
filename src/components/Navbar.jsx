import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined } from '@ant-design/icons';

const Navbar = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [screenSize, setScreenSize] = useState(undefined);

    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);

        window.addEventListener('resize', handleResize);

        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (screenSize <= 800) {
            setActiveMenu(false);
        } else {
            setActiveMenu(true);
        }
    }, [screenSize]);

    return (
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={"https://i.ibb.co/Z11pcGG/cryptocurrency.png"} size="large" />
                <Typography.Title level={2} className="logo"><Link to="/" style={{ color: "white", fontWeight: "600" }}>CryptOne</Link></Typography.Title>
                <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
            </div>
            {activeMenu && (
                <Menu theme="dark">
                    <Menu.Item icon={<HomeOutlined />}>
                        <Link style={{ color: "white", fontWeight: "500" }} to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item icon={<FundOutlined />}>
                        <Link style={{ color: "white", fontWeight: "500" }} to="/cryptocurrencies">Crypto Currencies</Link>
                    </Menu.Item>
                    <Menu.Item icon={<MoneyCollectOutlined />}>
                        <Link style={{ color: "white", fontWeight: "500" }} to="/exchanges">CO Exchanges</Link>
                    </Menu.Item>
                    <Menu.Item icon={<BulbOutlined />}>
                        <Link style={{ color: "white", fontWeight: "500" }} to="/news">Crypto World</Link>
                    </Menu.Item>
                </Menu>
            )}
        </div>
    );
};

export default Navbar;