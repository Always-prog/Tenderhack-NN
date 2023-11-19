import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../constants';

export default function CompareGroup() {
  const {inns} = useParams();
  const search = useLocation().search;
  const kpgzs = new URLSearchParams(search).get('kpgzs');
  const [response, setResponse] = useState();

  useEffect(() => {
    fetch(`${baseUrl}/compare/bygroup?inns=${inns}${kpgzs ? '&'+'kpgzs='+kpgzs : ''}`).then(
      res => res.json()
    ).then(json => {
      setResponse(json)
    })
  }, [])

  return (
    <div>{response ? <div>
      КПГЗ: {kpgzs}<br/>
      {response.map(supplier => (<p>
      ИНН: {supplier.inn} <br/>
      Цена: {supplier.avg_price} <br/>
    </p>))}

    </div>: <div className="loading">Загрузка...</div>}</div>
  )
}
