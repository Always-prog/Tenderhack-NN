import React from 'react'
import { useParams } from 'react-router-dom';
import SupersetEmbedded from './superset';


export default function Details() {
  const {inn} = useParams();
  
  return (
    <div className='details'>
        <h4>Поставщик: ИНН {inn}</h4>

        <SupersetEmbedded supplier_inn={inn}/>

        <img src={"../Detailsimag.png"} />
    </div>
  )
}
