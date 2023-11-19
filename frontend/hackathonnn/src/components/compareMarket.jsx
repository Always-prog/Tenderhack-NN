import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../constants';

export default function CompareMarket() {
  const {inn} = useParams();
  const search = useLocation().search;
  const kpgzs = new URLSearchParams(search).get('kpgzs');
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(`${baseUrl}/compare/bymarket?inn=${inn}${kpgzs ? '&'+'kpgzs='+kpgzs : ''}`).then(
      res => res.json()
    ).then(json => {
      setResponse(json)
    })
  }, [])


  return (
    <div>{response ? (<div>
      <div>ИНН: {inn}</div><br/>
      <div>Цена у поставщика: {response.target_avg_price}</div><br/>
      <div>Цена по рынку: {response.market_avg_price}</div><br/>


    </div>) : <div className="loading">Загрузка...</div>}</div>
  )
}
