
import { Avatar, Card, Col, Row, Select, Typography } from "antd";
import Loader from "../../components/Shared/Loader";
import { useGetNewsFromApiQuery } from "../../services/cryptoNewsApi";
import moment from "moment";
import { useState } from "react";
import { useGetCryptosQuery } from "../../services/cryptoApi";

interface Currency {
  name: string;
  // Add other properties if needed
}
interface News {
  url: string;
  title: string;
  thumbnail: string;
  source: {
    name: string;
    favicon: string;
  };
  date: string;
  // Add other properties if needed
}

const News = ({ simplified  }: { simplified: boolean }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");

  const count = simplified ? 6 : 20;

 



  const { data: cryptoNews, isLoading, error } = useGetNewsFromApiQuery({
    newsCategory,
    count,
    country: "us",
    language: "en",
  });

  const { Title, Text } = Typography;
  const { data } = useGetCryptosQuery(100);


  if (error) {
    console.error(error);
  }

  if (isLoading) return <Loader />;



  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  const { Option } = Select;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              typeof option?.children === "string" &&
              (option.children as string).toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurency">Cryptocurrency</Option>
            {data?.data?.coins?.map((currency: Currency) => (
              <Option value={currency.name} key={currency.name}>
                {currency.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews &&
        cryptoNews.data &&
        cryptoNews.data.map((news: News, i: number) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <img
                    src={news.thumbnail || demoImage}
                    alt="Images"
                    width={200}
                    height={200}
                  />
                  <Title className="news-title" level={4}>
                    {news.title}
                  </Title>
                </div>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.source.favicon} />
                    <Text className="provider-name">
                      {news.source.name}
                    </Text>
                  </div>
                  <Text>{moment(news.date).fromNow()}</Text>
                </div>
              </a>
            </Card>
          </Col>
        ))}
    </Row>
  );
};

export default News;