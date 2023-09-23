import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Typography, Select } from "antd";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/CryptoApi";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("7d");

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

  const coinData = data?.data?.coin;

  console.log(coinData);


  const stats = [
    {
      title: "Price to USD",
      value: `$ ${coinData?.price && millify(coinData?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "Rank",
      value: coinData?.rank,
      icon: <NumberOutlined />,
    },
    {
      title: "24h Volume",
      value: `$ ${coinData?.["24hVolume"] && millify(coinData?.["24hVolume"])}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${coinData?.marketCap && millify(coinData?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(coinData?.allTimeHigh.price)}`,
      icon: <TrophyOutlined />,
    },
  ];
  
  const genericStats = [
    {
      title: "Number Of Markets",
      value: coinData?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coinData?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Approved Supply",
      value: coinData?.supply.confirmed ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(coinData?.supply.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(coinData?.supply.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {coinData?.name} ({coinData?.symbol}) Price
        </Title>
        <p>
          {coinData?.name} live price in US dollars.
          View value statistics, market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="7d"
        className="select-timeperiod"
        placeholder="Select Time Period"
        onChange={(value) => setTimePeriod(value)}
      >
        {time.map((date)=>
          <Option key={date} >{date}</Option>
        )}
      </Select>
          <Col className="stats-container">
              <Col className="coin-value-statistics">
                  <Col className="coin-value-statistics-heading">
                      <Title level={3} className="coin-details-heading">
                          {coinData?.name} Value Statistics
                      </Title>
                      <p>
                          An overview showing the statistics of {coinData?.name}, such as the base and quote currency, the rank, and trading volume.
                      </p>
                  </Col>
                  {stats.map(({icon, title, value})=>(
                      <Col className="coin-stats">
                          <Col className="coin-stats-name">
                              <Text>{icon}</Text>
                              <Text>{title}</Text>
                          </Col>
                          <Text className="stats">{value}</Text>
                      </Col>
                  ))}
                  </Col>

                  <Col className="other-stats-info">
                  <Col className="coin-value-statistics-heading">
                      <Title level={3} className="coin-details-heading">
                          Other Statistics
                      </Title>
                      <p>
                          An overview showing the statistics of all Cryptocurrencies
                      </p>
                  </Col>
                  {genericStats.map(({icon, title, value})=>(
                      <Col className="coin-stats">
                          <Col className="coin-stats-name">
                              <Text>{icon}</Text>
                              <Text>{title}</Text>
                          </Col>
                          <Text className="stats">{value}</Text>
                      </Col>
                  ))}
                  </Col>
            </Col>
    </Col>
  );
};


export default CryptoDetails;
