import * as React from 'react';
import {List , ListItem ,  ListItemButton, ListItemText,  Checkbox, Box, Divider, Button} from '@mui/material';
import { useState } from 'react';
import Details from './details';
import { useEffect } from 'react';
import {baseUrl} from '../constants';

export default function ListItems({filters}) {
  const [checked, setChecked] = useState([1]);
  const [suppliers, setSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  useEffect(() => {
    setIsLoading(true)
    const { kpgzs = [], inn } = filters;
    const stringFilters = []
    if (kpgzs.length){
      stringFilters.push(`kpgzs=${kpgzs[0]}`)
    }
    if (inn){
      stringFilters.push(`inn=${inn}`)
    }

    const url = `${baseUrl}/search${stringFilters.length ? '?' + stringFilters.join('&') : ''}`
    fetch(url).then(res => res.json()).then(json => {
      setSuppliers(json)
    }).finally(res => {
      setIsLoading(false)
    })
    
  }, [JSON.stringify(filters)])

  return (
    <>
    <div className='List'>
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {!isLoading ? suppliers.map((supplier) => {
        const { supplier_inn, speedily, kpgzs, experience, reliability, activity } = supplier;
        const labelId = `checkbox-list-secondary-label-${supplier_inn}`;
        return (
          <ListItem
            key={supplier_inn}
            disablePadding
          >
            <div>
              <a href={`/details/${supplier_inn}`} target={'_blank'}><ListItemText id={labelId} primary={`ИНН ${supplier_inn}`}/></a>
              <ListItemText id={labelId} primary={`Рейтинг ${speedily + experience + activity + reliability}`} />
              <ListItemText id={labelId} primary={`Поставщик ${(experience == 0) ? 'не' : ''}опытный (${experience})` +
                                                    ` ${(speedily > 0) ? 'Доставляет быстрее срока' : 'Срывает сроки'} (${speedily})` +
                                                    ` ${(activity > 0) ? 'Активный' : 'Неактивный'} (${activity})` +
                                                    ` ${(reliability > 0) ? 'Надёжный' : 'Ненадёжный'} поставщик (${reliability})`} />
              <ListItemText id={labelId} primary={`КПГЗ ${kpgzs.join(',')}`} />
              <br></br>
            </div>
            <Divider/>
          </ListItem>
       
        );
      }) : <div className='loading'>Загрузка данных...</div>} 
    </List>
    <Button variant="contained">Сравнить выбранные</Button>
    </div>
    </>
  );
}