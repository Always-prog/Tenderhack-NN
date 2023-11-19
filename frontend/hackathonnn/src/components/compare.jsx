import React, { useState } from 'react';
import {Button , Typography, Paper, InputAdornment, InputBase, Divider, ButtonGroup , Box} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

export default function Compare() {
  const [hidden,setHedden] = useState(false)

  const onChangeComponent = () => {
    setHedden(true);
  }

  const onChangeComponent2 = () => {
    setHedden(false);
  }

return (
  <>

    <div className='search'>
     <Typography variant="h5" pb='24px'>Сраавнение поставщиков</Typography>
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 800 }}
    >
     <InputAdornment position="start">
      <SearchIcon />
    </InputAdornment>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Введите КПГЗ для сравнения (не обязательно)"
        inputProps={{ 'aria-label': 'search google maps' }}>
    </InputBase>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <Button variant="contained">Найти</Button>
    </Paper>
    </div>
    <Box display='flex' flexDirection='row'>
    <div className='filter'>
    <ButtonGroup sx={{ mb:'24px'}}>
    <Button onClick={onChangeComponent}>Сравнение с рынком</Button>
    <Button onClick={onChangeComponent2}>Сравнение между собой</Button>
    </ButtonGroup>
    </div>

    {hidden === false ? 
<div className='compare'>
  ИНН 1
</div> : 
<div  className='compare'>
  ИНН 2
</div>}

    </Box>
    </>
  );
}