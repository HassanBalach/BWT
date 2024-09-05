import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,   // This registers the 'linear' scale
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
interface CoinHistory {
  status: string;
  data: CoinHistoryData;
}

interface CoinHistoryData {
  change: string;
  history: HistoryItem[];
}

interface HistoryItem {
  price: string;
  timestamp: number;
}

interface LineChartProps {
  coinHistory: CoinHistory | undefined;
  currentPrice: string;
  coinName: string;
}


const LineChart: React.FC<LineChartProps> = ({ coinHistory, currentPrice, coinName }) => {
 



  const coinPrice: number[] = [];
  const coinTimestamp: string[] = [];

  if (coinHistory) {
    for (let i = 0; i < coinHistory.data.history.length; i++) {
      coinPrice.push(parseFloat(coinHistory.data.history[i].price));
      coinTimestamp.push(new Date(coinHistory.data.history[i].timestamp * 1000).toLocaleString());
    }
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Typography.Title level={2} className="chart-title">
          {coinName} Price Chart
        </Typography.Title>
        <Col className="price-container">
          <Typography.Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Typography.Title>
          <Typography.Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}</Typography.Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
