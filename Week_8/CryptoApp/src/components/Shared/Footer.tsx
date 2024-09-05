import {  Space, Typography } from 'antd';
import { Link } from 'react-router-dom';

const {Title} = Typography;


const Footer = () => {
  return (
    <div className="footer " >
    <Title level={5} style={{ color: 'white', textAlign: 'center' }} >
      Copyright © 2024 
      <Link to="/">
        Cryptoverse Inc.
      </Link>
      All Rights Reserved.
    </Title>
    <Space direction="horizontal" style={{ justifyContent: 'center', width: '100%' }}>
      <Link to="/">Home</Link>
      <Link to="/exchanges" >Exchanges</Link>
      <Link to="/news" >News</Link>
    </Space>
  </div>
  )
}

export default Footer
