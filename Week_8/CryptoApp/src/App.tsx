import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Layout } from 'antd';
import { Cryptocurrencies, CryptoDetails,  Homepage, News } from './_Root/Pages';
import Header from './components/Shared/Header';
import Footer from './components/Shared/Footer';
const { Content } = Layout;
import './input.css';

const App = () => {
  return (
    <div className='app'>
      <div className="navbar" style={{flex: 0.3}}>
         <Header /> 
      </div>
      <div className="main" style={{ flex: 1 , padding: "20px" }}>
        <Layout>
          <Content>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies simplified={true}  />} />
              <Route path="/crypto/:coinId" element={<CryptoDetails  />} />
              <Route path="/news" element={<News simplified={true}  />} />
            </Routes>
          </Content>
        </Layout>
        <Footer />
       
      </div>
    </div>
  );
};

export default App;