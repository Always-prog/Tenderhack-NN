import React from 'react'
import { OutlinedInput, Slider, FormGroup, FormControlLabel,  Checkbox , ListItemText, MenuItem,Box, Typography,FormControl,InputLabel,Select, Button, IconButton } from '@mui/material'
import { GKPZ, alfafit } from './utils/alfavit'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';

export default function Filter() {
    const [hiddenRegion, SetHiddenRegion] = useState(false);
    const [hiddenKPGZ, SetHiddenKPGZ] = useState(false);
    const [kodGKPZ,SetKodGKPZ] = useState([]);
    const [value, setValue] = useState({a:100, b:100, c:100});

    const hidRegion = () =>{
        SetHiddenRegion(!hiddenRegion);
    }

    const hidKPGZ = () =>{
        SetHiddenKPGZ(!hiddenKPGZ);
    }

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    SetKodGKPZ(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const onChange = (event, newValue) => {
    setValue(newValue);
  };
    // очистить фильтры
  return (
<div className='filter'>
    <Box  display='flex' flexDirection='column' >
    <Typography  variant="h5" >Фильтр</Typography>
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
        <Select native defaultValue="" id="grouped-native-select"  sx={{mb:'12px'}}>
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
    <Typography alignItems='center'flexGrow={1} variant="h6">КПГЗ</Typography>
    <IconButton onClick={hidKPGZ}>
    {hiddenKPGZ !== false ? 
        <KeyboardArrowUpIcon /> :
        <KeyboardArrowDownIcon />
    }
        </IconButton>
    </Box>
{hiddenKPGZ !== false && 
      <FormControl sx={{mb:'12px'}}>
        <Select
          multiple
          value={kodGKPZ}
          onChange={handleChange}
          input={<OutlinedInput/>}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {GKPZ.map((number,index) => (
            <MenuItem key={number[index]} value={number}>
              <Checkbox checked={kodGKPZ.indexOf(number) > -1} />
              <ListItemText primary={number} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>}
      <Box display='flex' flexDirection='column' justifyContent='space-between' pt='16px'>
    <Typography alignItems='center'flexGrow={1} variant="h6"  pb='16px'>Оценки поставщика</Typography>
    <FormGroup>
      <FormControlLabel control={<Checkbox defaultChecked />} label="По умолчанию"/>
      <FormControlLabel control={<Checkbox />} label="Самый опытный" />
      <FormControlLabel control={<Checkbox />} label="Самый надежный" />
      <FormControlLabel control={<Checkbox />} label="Самый активный" />
      <FormControlLabel control={<Checkbox />} label="Самый быстрый" />
    </FormGroup>
    </Box>
    <Box display='flex' flexDirection='column' justifyContent='space-between' pt='16px'>
    <Typography alignItems='center'flexGrow={1} variant="h6"  pb='16px'>
        Расширенные настройки рейтинга</Typography>
        <Box display='flex' flexDirection='column'>
        <Typography>Опыт</Typography>
    <Box display='flex' flexDirection='row'  alignItems="center">
<Typography mr='10px'>0</Typography>
        <Slider aria-label="Volume" value={value.a} onChange={onChange} />
        <Typography ml='10px'>25%</Typography>
    </Box>
    </Box>
    <Box display='flex' flexDirection='column'>
        <Typography>Надежность</Typography>
    <Box display='flex' flexDirection='row'  alignItems="center">
<Typography mr='10px'>0</Typography>
        <Slider aria-label="Volume" value={value.b} onChange={onChange} />
        <Typography ml='10px'>25%</Typography>
    </Box>
    </Box>
    <Box display='flex' flexDirection='column'>
        <Typography>Срок поставки</Typography>
    <Box display='flex' flexDirection='row'  alignItems="center">
<Typography mr='10px'>0</Typography>
        <Slider aria-label="Volume" value={value.c} onChange={onChange} />
        <Typography ml='10px'>25%</Typography>
    </Box>
    </Box>
    </Box>
    <Button>Очистить</Button>
</div>
  )
}
