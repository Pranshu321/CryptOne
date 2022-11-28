import './App.css';
import { Route, Routes, Link } from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import Home from './components/Home';
import News from './components/pages/News';
import CryptoWorld from './components/pages/CryptoWorld';
import CryptoDetails from './components/pages/CryptoDetails';

function App() {
  return (
    <div className='app'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cryptocurrencies' element={<CryptoWorld />} />
              <Route path='/news' element={<News />} />
              <Route path='/crypto/:coinId' element={<CryptoDetails />} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
            <Link to="/">
              {" "}CryptOne Inc.
            </Link> <br />
            All Rights Reserved. Made with ❤ by Pranshu
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Currencies</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
