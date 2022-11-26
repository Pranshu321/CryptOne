import './App.css';
import { Route, BrowserRouter, Routes, Link } from "react-router-dom";
import { Layout, Typography, Space } from 'antd';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Exchanges from './components/pages/Exchanges';
import News from './components/pages/News';
import CryptoWorld from './components/pages/CryptoWorld';
import CryptoDetails from './components/pages/CryptoDetails';
import { Footer } from 'antd/lib/layout/layout';

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
              <Route path='/' element={Home} />
              <Route path='/exchanges' element={Exchanges} />
              <Route path='/cryptocurrencies' element={CryptoWorld} />
              <Route path='/news' element={News} />
              <Route path='/crypto/:coinid' element={CryptoDetails} />
            </Routes>
          </div>
        </Layout>
        <div className='footer'>
          <Typography.Title level={5} style={{ color: "white", textAlign: "center" }}>
            CryptOne <br /> All right reserved
          </Typography.Title>
          <Space>
            <Link to={"/"}>Home</Link>
            <Link to={"/exchanges"}>Exchanges</Link>
            <Link to={"/news"}>News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;