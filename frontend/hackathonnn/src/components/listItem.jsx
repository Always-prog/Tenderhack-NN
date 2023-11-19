import * as React from 'react';
import {List , ListItem ,  ListItemButton, ListItemText,  Checkbox, Box, Divider, Button} from '@mui/material';
import { useState } from 'react';
import Details from './details';


export default function ListItems({props}) {
  const [checked, setChecked] = useState([1]);
  const [Lists, setLists] = useState([1,2,3,4])
   const {hiddenDetails, setHiddenDetails} = props;


  const onNavigate =() => {
    setHiddenDetails(!hiddenDetails);
  }

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

  return (
    <>
    <div className='List'>
    <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      {Lists.map((value) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
            <li className='item' key={value}>
              <Button onClick={onNavigate}>
            {`ИНН ${value + 1}`}
            </Button>
            <div>
            Сравнить
            <Checkbox
                edge="end"
                onChange={handleToggle(value)}
                checked={checked.indexOf(value) !== -1}
                inputProps={{ 'aria-labelledby': labelId }}
              />
              </div>
            </li>
        );
      })}
    </List>
    <Button variant="contained">Сравнить выбранные</Button>
    </div>
    </>
  );
}