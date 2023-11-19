import React from 'react'
import { TextField, OutlinedInput, Slider, FormGroup, FormControlLabel, Checkbox, ListItemText, MenuItem, Box, Typography, FormControl, InputLabel, Select, Button, IconButton, RadioGroup, Radio } from '@mui/material'
import { GKPZ, alfafit } from './utils/alfavit'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import { useCallback } from 'react';

export default function Filter({onChangeKpgz, onChangeSortBy}) {
  const [hiddenRegion, SetHiddenRegion] = useState(false);
  const [hiddenKPGZ, SetHiddenKPGZ] = useState(false);
  const [value, setValue] = useState({ a: 100, b: 100, c: 100 });

  const hidRegion = () => {
    SetHiddenRegion(!hiddenRegion);
  }

  const hidKPGZ = () => {
    SetHiddenKPGZ(!hiddenKPGZ);
  }
  const handleChangeSortBy = (event) => {
    onChangeSortBy(event.target.value)
  }

  const onChangeWeights = (event, newValue) => {
    setValue(newValue);
  };

  // очистить фильтры
  return (
    <div className='filter'>
      <Box display='flex' flexDirection='column' >
        <Typography variant="h5" >Фильтр</Typography>
        <Box display='flex' flexDirection='row' justifyContent='space-between' pt='16px'>
          <Typography alignItems='center' variant="h6" flexGrow={1}>Регион</Typography>
          <IconButton onClick={hidRegion}>
            {hiddenRegion !== false ?
              <KeyboardArrowUpIcon /> :
              <KeyboardArrowDownIcon />
            }
          </IconButton>
        </Box>
        {hiddenRegion !== false &&
          <FormControl>
            <Select native defaultValue="" id="grouped-native-select" sx={{ mb: '12px' }}>
              <option value="" />
              {alfafit.map((i) => {
                return (
                  <optgroup label={i}>
                    <option value={1}>Option 1</option>
                    <option value={2}>Option 2</option>
                  </optgroup>)
              })}
            </Select>
          </FormControl>}
      </Box>
      <Box display='flex' flexDirection='row' justifyContent='space-between' pt='16px'>
        <Typography alignItems='center' flexGrow={1} variant="h6">КПГЗ</Typography>
        <IconButton onClick={hidKPGZ}>
          {hiddenKPGZ !== false ?
            <KeyboardArrowUpIcon /> :
            <KeyboardArrowDownIcon />
          }
        </IconButton>
      </Box>
      {hiddenKPGZ !== false &&
        <FormControl sx={{ mb: '12px' }}>
          <div>
            <TextField
              id="kpgz-search"
              label="Поиск по КПГЗ"
              type="search"
              onChange={(event) => {
                onChangeKpgz([event.target.value])
              }}
            />
          </div>
        </FormControl>}
      <Box display='flex' flexDirection='column' justifyContent='space-between' pt='16px'>
        <Typography alignItems='center' flexGrow={1} variant="h6" pb='16px'>Сортировать по показателю</Typography>
        <RadioGroup>
          <FormControlLabel value="experienced" control={<Radio />} onChange={handleChangeSortBy} label="Самый опытный" />
          <FormControlLabel value="reliable" control={<Radio />} onChange={handleChangeSortBy} label="Самый надежный" />
          <FormControlLabel value="active" control={<Radio />} onChange={handleChangeSortBy} label="Самый активный" />
          <FormControlLabel value="speedily" control={<Radio />} onChange={handleChangeSortBy} label="Самый быстрый" />
        </RadioGroup>
      </Box>
      <Box display='flex' flexDirection='column' justifyContent='space-between' pt='16px'>
        <Typography alignItems='center' flexGrow={1} variant="h6" pb='16px'>
          Расширенные настройки рейтинга</Typography>
        <Box display='flex' flexDirection='column'>
          <Typography>Опыт</Typography>
          <Box display='flex' flexDirection='row' alignItems="center">
            <Typography mr='10px'>0</Typography>
            <Slider aria-label="Volume" value={value.a} onChange={onChangeWeights} />
            <Typography ml='10px'>25%</Typography>
          </Box>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography>Надежность</Typography>
          <Box display='flex' flexDirection='row' alignItems="center">
            <Typography mr='10px'>0</Typography>
            <Slider aria-label="Volume" value={value.b} onChange={onChangeWeights} />
            <Typography ml='10px'>25%</Typography>
          </Box>
        </Box>
        <Box display='flex' flexDirection='column'>
          <Typography>Срок поставки</Typography>
          <Box display='flex' flexDirection='row' alignItems="center">
            <Typography mr='10px'>0</Typography>
            <Slider aria-label="Volume" value={value.c} onChange={onChangeWeights} />
            <Typography ml='10px'>25%</Typography>
          </Box>
        </Box>
      </Box>
      <Button>Очистить</Button>

    </div>
  )
}
