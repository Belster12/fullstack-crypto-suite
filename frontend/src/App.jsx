import React, { useEffect, useState } from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import CryptocurrencyCard from './components/CryptocurrencyCard';
import {Spin} from "antd"

const App = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currencyId, setCurrencyId] = useState(1);  // Инициализация ID для конкретной валюты
  const [currencyData, setCurrencyData] = useState(null);

  const fetchCurrencies = () => {
    axios.get('http://127.0.0.1:8000/cryptocurrencies')
      .then(response => {
        const currenciesResponse = response.data; 
        const menuitem = [
          {
            key: 'g1',
            label: 'Список криптовалют',
            children: currenciesResponse.map(c => {
              return { label: c.name, key: c.id };
            }),
            type: 'group'
          }
        ];
        setCurrencies(menuitem);
      })
      .catch(error => {
        console.error('Error fetching currencies:', error);
      });
  };

  const fetchCurrency = () => {
    axios.get(`http://127.0.0.1:8000/cryptocurrencies/${currencyId}`)
      .then(response => {
        setCurrencyData(response.data);  // исправлено: r.data на response.data
      })
      .catch(error => {
        console.error('Error fetching currency data:', error);
      });
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  useEffect(() => {
    setCurrencyData(null)
    fetchCurrency();
  }, [currencyId]);

  const onClick = (e) => {
    console.log('Click event:', e);
    setCurrencyId(e.key);  // Меняем текущую валюту по ключу
  };

  return (
    <div className='flex'>
      <Menu
        onClick={onClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        mode="inline"
        items={currencies}
        className='h-screen overflow-scroll'
      />
      <div className='mx-auto my-auto'>
        {currencyData ? <CryptocurrencyCard currency={currencyData} /> : <Spin size="large"/>}
      </div>
      <span className='flex items-end mx-6 my-6'>By Wvhllamm</span>
    </div>
  );
};

export default App;
