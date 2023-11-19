import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../constants';
import{Box,Card, CardActions, CardContent, Button, Typography}from '@mui/material';

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
      {/* <div>ИНН: {inn}</div><br/>
      <div>Цена у поставщика: {response.target_avg_price}</div><br/>
      <div>Цена по рынку: {response.market_avg_price}</div><br/> */}
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
        ИНН: {inn}
        </Typography>
        <Typography variant="body2">
        Цена у поставщика: {response.target_avg_price}
        </Typography>
        <Typography variant="body2">
        Цена по рынку: {response.market_avg_price}
        </Typography>
      </CardContent>
    </Card>
    </div>) : <div className="loading">Загрузка...</div>}</div>




  )
}
