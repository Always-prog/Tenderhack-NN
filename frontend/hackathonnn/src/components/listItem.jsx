import * as React from 'react';
import {List , ListItem ,  ListItemButton, ListItemText,  Checkbox, Box, Divider, Button} from '@mui/material';
import { useState } from 'react';
import Details from './details';
import { useEffect } from 'react';
import {baseUrl} from '../constants';

export default function ListItems({filters}) {
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplies, setSelectedSuppliers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)
    const { kpgzs = [], inn, sortby } = filters;
    const stringFilters = []
    if (kpgzs.length){
      stringFilters.push(`kpgzs=${kpgzs[0]}`)
    }
    if (inn){
      stringFilters.push(`inn=${inn}`)
    }
    if (sortby){
      stringFilters.push(`sortby=${sortby}`)
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
          <ListItem key={supplier_inn} disablePadding>
            <Checkbox
              onChange={(event) => {
                if (event.target.checked) {
                  setSelectedSuppliers((prevSelectedSuppliers) => [
                    ...prevSelectedSuppliers,
                    supplier_inn,
                  ]);
                } else {
                  setSelectedSuppliers((prevSelectedSuppliers) =>
                    prevSelectedSuppliers.filter((inn) => inn !== supplier_inn)
                  );
                }
              }}
            />
            <div>
              <a href={`/details/${supplier_inn}`} target={"_blank"}>
                <ListItemText id={labelId} primary={`ИНН ${supplier_inn}`} />
              </a>
              <ListItemText
                id={labelId}
                primary={`Рейтинг ${
                  speedily + experience + activity + reliability
                }`}
              />
              <ListItemText
                id={labelId}
                primary={
                  `Поставщик ${
                    experience == 0 ? "не" : ""
                  }опытный (${experience})` +
                  ` ${
                    speedily > 0 ? "Доставляет быстрее срока" : "Срывает сроки"
                  } (${speedily})` +
                  ` ${activity > 0 ? "Активный" : "Неактивный"} (${activity})` +
                  ` ${
                    reliability > 0 ? "Надёжный" : "Ненадёжный"
                  } поставщик (${reliability})`
                }
              />
              <ListItemText
                id={labelId}
                primary={`КПГЗ ${kpgzs.join(",")}`}
                style={{ overflowWrap: "anywhere" }}
              />
              <a
                href={`/compare/market/${supplier_inn}?kpgzs=${kpgzs.join(
                  ","
                )}`}
                target="_blank"
                style={{ position: "absolute", right: 0, top: 0 }}
              >
                Сравнить с рынком{" "}
              </a>
              <br></br>
            </div>
            <Divider />
          </ListItem>
        );
      }) : <div className='loading'>Загрузка данных...</div>} 
    </List>
    <a href={`/compare/group/${selectedSupplies.join(',')}?kpgzs=${(filters?.kpgzs || []).join(",")}`} target="_blank">
      <Button variant="contained">Сравнить выбранные</Button></a>
    </div>
    </>
  );
}