import { Card, Col, Input, Row } from "antd";
import Loader from "../../components/Shared/Loader";
import { useGetCryptosQuery } from "../../services/cryptoApi"
import { useEffect, useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";

interface Crypto {
  uuid: string;
  rank: number;
  name: string;
  iconUrl: string;
  price: number;
  marketCap: number;
  change: number;
}

const Cryptocurrencies = ({ simplified }: { simplified: Boolean }) => {

  const count = simplified ? 10 : 100;
  const [serchTerm, setSearchTerm] = useState('')
  const { data: cryptoList, isLoading } = useGetCryptosQuery(count);
  const [crypto, setCrypto] = useState<Crypto[]>([])

  useEffect(() => {
    setCrypto(cryptoList?.data?.coins)

    const filterData = cryptoList?.data?.coins.filter((item: Crypto) => item.name.toLowerCase().includes(serchTerm))

    setCrypto(filterData)
  }, [cryptoList, serchTerm])

  if (isLoading) return <Loader />

  return (
    <>
      {!simplified && (
        <div className="Search Cryptocurrency">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value.toLocaleLowerCase())}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container" >
        {crypto?.map((currency: Crypto) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
            <Link to={`/crypto/${currency.uuid}`}>
              <Card
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p>Price: {millify(currency.price)}</p>
                <p>Market Cap: {millify(currency.marketCap)}</p>
                <p>Daily change: {currency.change}%</p>

              </Card>
            </Link>

          </Col>
        ))}

      </Row>

    </>
  )
}

export default Cryptocurrencies