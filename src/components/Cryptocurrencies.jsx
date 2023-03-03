import React, {useState} from 'react'

import millify from 'millify'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input } from 'antd'

import { useGetCryptosQuery } from '../services/CryptoApi'

const Cryptocurrencies = () => {
    const {data: cryptosList, isFetching} = useGetCryptosQuery();
    // const {data: cryptosList, isFetching} = useGetCryptosQuery(10);
    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins);
    // const [searchTerm, setSearchTerm] = useState('');
    
    console.log(cryptos);
  return (
    <>
    </>
  )
}

export default Cryptocurrencies