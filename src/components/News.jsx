import React, { useState } from "react";

import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment/moment";
import { useGetCryptoNewsQuery } from "../services/CryptoNewsApi";
import { useGetCryptosQuery } from "../services/CryptoApi";
import {motion} from "framer-motion";

const { Text, Title } = Typography;

const { Option } = Select;
const demoImage = "https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency");
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  });
  const {data} =useGetCryptosQuery(100);

  if (!cryptoNews?.value) return "Loading...";
  return (
    <>
      <Row gutter={[24, 24]} className="crypto_news">
        {!simplified && (
          <Col span={24}>
            <Select
              showSearch
              className="select-news"
              placeholder="Select a Crypto"
              optionFilterProp="children"
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value="Cryptocurrency">Cryptocurrency</Option>
              {data?.data?.coins.map((coin)=>
                <Option value={coin.name}>{coin.name}</Option>
              )}
            </Select>
          </Col>
        )  
        }
        {cryptoNews?.value.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
             <motion.div
                initial={{opacity:0, y:100}}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, type: "spring", stiffness: 50, damping: 10 },
                }}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.01 }}
              >
            <Card hoverable className="news-card">
              <a href={news.url} target="_blank" rel="noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.name}
                  </Title>
                  <img
                    src={news?.image?.thumbnail?.contentUrl || demoImage}
                    alt="news"
                    style={{ maxWidth: "200px", maxHeight: "100px" }}
                  />
                </div>
                <p>
                  {news.description > 100
                    ? `${news.description.substring(0, 100)}...`
                    : news.description}
                </p>
                <div className="provider-container">
                  <div>
                    <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || demoImage} alt=""/>
                    <Text className="provider-name">
                      {news.provider[0]?.name}
                    </Text>
                  </div>
                  <Text>{moment(news.datePublished).startOf("ss").fromNow()}</Text>
                </div>
              </a>
            </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default News;
