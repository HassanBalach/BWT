import { Col, Row, Statistic, Typography } from "antd";
const { Title } = Typography;
import { useGetCryptosQuery } from "../../services/cryptoApi";
import millify from "millify";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";
import Loader from "../../components/Shared/Loader";

const Homepage = () => {
 



  const { data, isLoading: isLoadingCryptos, error: errorCryptos } = useGetCryptosQuery(10);
  

  if (isLoadingCryptos) {
    return <Loader />
  }
  if (errorCryptos) {
    console.log('An error occurred:', errorCryptos );
    return <p>Error fetching data</p>;
  }

  const globalStats = data?.data?.stats;



  return (
    <>
      <Title level={2} className="heading">Global Crypto Stats</Title>
      <Row gutter={[32, 32]}>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total || 0} /></Col>
        <Col span={12}><Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges || 0)} /></Col>
        <Col span={12}><Statistic title="Total Market Cap:" value={`$${millify(globalStats.totalMarketCap || 0)}`} /></Col>
        <Col span={12}><Statistic title="Total 24h Volume" value={`$${millify(globalStats.total24hVolume || 0)}`} /></Col>
        <Col span={12}><Statistic title="Total Cryptocurrencies" value={globalStats.total || 0} /></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalStats.totalMarkets || 0)} /></Col>
      </Row>
      <div className="home-heading-container">
        <Title level={2} className="home-title">  Top 10 Cryptos In The World </Title>
        <Title level={3} className="show-more"><Link to="/cryptocurrencies">Show More</Link></Title>
      </div>
      <Cryptocurrencies simplified={true}/>
      <div className="home-heading-container">
        <Title level={2} className="home-title">  Latest Crypto News</Title>
        <Title level={3} className="show-more"><Link to="/news">Show More</Link></Title>
      </div>
      <News simplified/>


    </>
  );
}

export default Homepage;
