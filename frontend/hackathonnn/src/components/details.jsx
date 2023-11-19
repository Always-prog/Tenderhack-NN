import React from 'react'
import placeholder from '../Detailsimag.png';
import { useParams } from 'react-router-dom';
import SupersetEmbedded from './superset';


export default function Details() {
  const {inn} = useParams();
  
  return (
    <div>
        <h4>Поставщик: ИНН {inn}</h4>

        <div class='details'>
          <img src={placeholder}/>

          <SupersetEmbedded supplier_inn={inn}/>
        </div>
    </div>
  )
}
